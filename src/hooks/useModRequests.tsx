import {
	collection,
	getDocs,
	limit,
	orderBy,
	Query,
	query,
	where
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { modRequestState } from "../atoms/modRequestAtom";
import { auth, db } from "../firebase/clientApp";
import { modRequestConverter } from "../helpers/converters";
import { ModRequest as ModRequestType } from "../types/docTypes";

const useModRequests = () => {
	const [loading, setLoading] = useState(false);
	const [modRequestStateValue, setModRequestStateValue] =
		useRecoilState(modRequestState);
	const [user] = useAuthState(auth);

	const testQuery = async () => {
		const coll = collection(db, "modRequests").withConverter(
			modRequestConverter
		);

		const modRequestQuery = query(
			coll,
			where("requesterID", "==", user?.uid),
			orderBy("creationDate", "asc"),
			limit(5)
		);

		const docs = await getDocs(modRequestQuery);
		return docs;
	};

	const onVote = async () => {
		// TODO
	};

	const onSelectModRequest = () => {
		// TODO
	};

	const onDeleteModRequest = async () => {
		// TODO
	};

	return {
		modRequestStateValue,
		setModRequestStateValue,
		onVote,
		onSelectModRequest,
		onDeleteModRequest,
		testQuery
	};
};

export default useModRequests;
