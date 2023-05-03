import { collection, doc, DocumentReference } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase/clientApp";
import { UserDoc } from "../types/docTypes";

const useUserDoc = () => {
	const [user] = useAuthState(auth);

	const userCollection = collection(db, "users");
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
