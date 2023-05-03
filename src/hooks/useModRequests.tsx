import {
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc,
	writeBatch
} from "firebase/firestore";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import { auth, db } from "../firebase/clientApp";
import {
	eq as findIndexOf,
	add as addInPlace,
	remove as removeInPlace
} from "sorted-array-functions";
import { User } from "firebase/auth";
import { ModRequest, UserDoc } from "../types/docTypes";
import { useAuthState } from "react-firebase-hooks/auth";

const useModRequests = () => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const setAuthModalState = useSetRecoilState(authModalState);
	const [user] = useAuthState(auth);

	const hasUserLikedRequest = (
		user: User,
		userDoc: UserDoc,
		requestID: string
	) => {
		if (!user || !userDoc) {
			return false;
		}

		const { likedPostIDs = [], uid } = userDoc;

		// Using the sorted-array-functions package to implement binary search tree and make sorting/retrieval more efficient
		// Could be somewhat large list of user likes
		const index = findIndexOf(likedPostIDs, `${requestID}_${uid}`);
		const liked = index !== -1;

		return liked;
	};

	const onVote = async (
		modRequest: ModRequest,
		user?: User | null,
		userDoc?: UserDoc
	) => {
		console.info("user inside onVote", user, userDoc);
		// Prompt the user to log in if they aren't...
		if (!user || !userDoc) {
			setAuthModalState({ open: true, view: "login" });
			return;
		}

		if (!modRequest) {
			throw new Error("Voting failed; contact an admin for assistance");
		}

		const { likedPostIDs = [], uid } = userDoc || {};
		const { id: requestID, voteStatus: requestLikes } = modRequest;

		try {
			const likeExists = hasUserLikedRequest(user, userDoc, requestID);

			// Prepare a new likes array (using sorted-array functions package to make adding more efficient)
			const newLikes = [...likedPostIDs];

			// Create a batch request
			const batch = writeBatch(db);

			// Create refs to documents of interest
			const userDocRef = doc(db, "users", uid);
			const requestDocRef = doc(db, "modRequests", requestID);

			if (likeExists) {
				// Delete the like from userDoc (& keep sorted) without mutating
				removeInPlace(newLikes, `${requestID}_${uid}`);

				// Update request (remove from number of likes)
				batch.update(requestDocRef, {
					voteStatus: requestLikes - 1
				});
			} else {
				// Add the like to the array (& keep sorted) without mutating
				addInPlace(newLikes, `${requestID}_${uid}`);

				// Update request (add to number of likes)
				batch.update(requestDocRef, {
					voteStatus: requestLikes + 1
				});
			}

			// Update user Doc (update array)
			batch.update(userDocRef, { likedPostIDs: newLikes });

			// Do the request
			await batch.commit();
		} catch (err: any) {
			setError(err.message);
			console.error(
				"Error while submitting new vote for mod request",
				err.message
			);
		}
	};

	const updateModRequest = async (id: string, updateObject: {}) => {
		setLoading(true);
		setError("");
		console.log("update mod request");

		try {
			const updated = await updateDoc(
				doc(db, "modRequests", id),
				updateObject
			);
			console.log("updated", updated);
		} catch (err: any) {
			console.error("updateModRequest error", err);
			setError(
				err.message ||
					"Something went wrong while updating a mod request doc."
			);
		}

		setLoading(false);
	};

	const assignModRequestToSelf = async (modRequest: ModRequest) => {
		if (!user) {
			setAuthModalState({ open: true, view: "login" });
			return;
		}
		const updateObject = {
			modderID: user.uid,
			modderStatus: "accepted",
			modderDisplayName: user.displayName,
			modderProfileImageURL: user.photoURL,
			lastModified: serverTimestamp() as Timestamp,
			completionStatus: "in progress"
		};
		await updateModRequest(modRequest.id, updateObject);
	};

	const assignModRequestToOther = async () => {};

	return {
		onVote,
		hasUserLikedRequest,
		assignModRequestToSelf,
		assignModRequestToOther
	};
};

export default useModRequests;
