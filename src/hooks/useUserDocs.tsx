import React, { useState } from "react";
import { User } from "firebase/auth";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where
} from "firebase/firestore";
import { db } from "../firebase/clientApp";

/**
 * Returns an object containing a set of methods for interacting with User documents
 */
const useUserDocs = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	/**
	 * Async function to query user docs and determine if user with passed in username exists
	 * @param username String
	 * @returns Boolean
	 */
	const isUsernameTaken = async (username: string) => {
		const usersRef = collection(db, "users");

		// Check the users table for users with the same displayName
		const userQuery = query(usersRef, where("displayName", "==", username));
		const userDocs = await getDocs(userQuery);

		// If there are docs, return true, else return false (0 = falsy)
		const docLength = userDocs.docs.length;
		return !!docLength;
	};

	/**
	 * @deprecated (Looks like firebase returns a nice error for this, so handled in /firebase/errors)
	 * Async function to query user docs and determine if user with passed in username exists
	 * @param username String
	 * @returns Boolean
	 */
	const isEmailTaken = async (email: string) => {
		const usersRef = collection(db, "users");

		// Check the users table for users with the same email address
		const userQuery = query(usersRef, where("email", "==", email));
		const userDocs = await getDocs(userQuery);

		// If there are docs, return true, else return false (0 = falsy)
		const docLength = userDocs.docs.length;
		return !!docLength;
	};

	// NOTE: This is a non-standard approach to adding properties to user doc; better solution
	// is to use Firebase Cloud Functions -- did not want to add CC info to FB.
	const createUserDocument = async (user: User) => {
		// Note: User could be a pre-existing or brand new user
		const { uid } = user;
		const userDocRef = doc(db, "users", uid);

		// Prevent bug with second+ submissions by parse/stringifying
		const cleanUser = JSON.parse(JSON.stringify(user));

		// Go ahead and create or add user to this document
		await setDoc(userDocRef, cleanUser);
	};

	const getUserDoc = async (uid: string) => {
		setLoading(true);

		const userDocRef = doc(db, "users", uid);
		const userDocSnap = await getDoc(userDocRef);

		setLoading(false);

		if (userDocSnap.exists()) {
			return userDocSnap.data();
		}
		return null;
	};

	const updateUserDoc = async (uid: string, updateObject: {}) => {
		setLoading(true);
		setError("");

		try {
			const updated = await updateDoc(
				doc(db, "users", uid),
				updateObject
			);
			console.log("updated", updated);
		} catch (err: any) {
			setError(
				err.message || "Something went wrong while updating a user doc."
			);
		}

		setLoading(false);
	};

	const updateUserDocField = async (
		uid: string,
		field: string,
		newValue: string | number | boolean
	) => {
		const updateObj = {};
		updateObj[field] = newValue;

		await updateUserDoc(uid, updateObj);
	};

	return {
		isUsernameTaken,
		isEmailTaken,
		createUserDocument,
		getUserDoc,
		updateUserDoc,
		updateUserDocField,
		loading,
		error
	};
};

export default useUserDocs;
