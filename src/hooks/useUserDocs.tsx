import React from "react";
import { User } from "firebase/auth";
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where
} from "firebase/firestore";
import { firestore } from "../firebase/clientApp";

/**
 * Returns an object containing a set of methods for interacting with User documents
 */
const useUserDocs = () => {
	/**
	 * Async function to query user docs and determine if user with passed in username exists
	 * @param username String
	 * @returns Boolean
	 */
	const isUsernameTaken = async (username: String) => {
		const usersRef = collection(firestore, "users");

		// Check the users table for users with the same displayName
		const userQuery = query(usersRef, where("displayName", "==", username));
		const userDocs = await getDocs(userQuery);

		// If there are docs, return true, else return false (0 = falsy)
		const docLength = userDocs.docs.length;
		return !!docLength;
	};

	// NOTE: This is a non-standard approach to adding properties to user doc; better solution
	// is to use Firebase Cloud Functions -- did not want to add CC info to FB.
	// Similar code in OAuthGoogleButton
	const createUserDocument = async (user: User) => {
		// Prevent bug with second+ submissions by parse/stringifying
		const cleanUser = JSON.parse(JSON.stringify(user));

		// Add user object to the db and ensure ID is pulled from auth provider's uid
		return await setDoc(doc(firestore, "users", user.uid), cleanUser);
	};

	return {
		isUsernameTaken,
		createUserDocument
	};
};

export default useUserDocs;
