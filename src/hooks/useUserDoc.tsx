import React from "react";
import { doc, DocumentReference } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { auth } from "../firebase/clientApp";
import { usersCol } from "../firebase/collections";
import { UserDoc } from "../types/docTypes";

const useUserDoc = () => {
	const [user] = useAuthState(auth);

	const userCollection = usersCol;
	const docRef = doc(userCollection, user?.uid || "placeholder");

	const [userDoc, loading, error, snapshot] = useDocumentData(
		docRef as DocumentReference<UserDoc>
	);

	return {
		userDoc,
		loading,
		error
	};
};

export default useUserDoc;
