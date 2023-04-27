import { doc, setDoc } from "@firebase/firestore";
import { User } from "firebase/auth";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { auth, db } from "../../../firebase/clientApp";
import Button from "../../basic/Button";

// Note: Handles both the log-in case and sign-in case
const OAuthGoogleButton: React.FC = () => {
	const [signInWithGoogle, userCred, loading, error] =
		useSignInWithGoogle(auth);

	// NOTE: This is a non-standard approach to adding properties to user doc; better solution
	// is to use Firebase Cloud Functions -- did not want to add CC info to FB.
	// Similar code in AuthPanelRegister
	const createUserDocument = async (user: User) => {
		// Note: User could be a pre-existing or brand new user
		const { uid } = user;
		const userDocRef = doc(db, "users", uid);

		// Prevent bug with second+ submissions by parse/stringifying
		const cleanUser = JSON.parse(JSON.stringify(user));

		// Go ahead and create or add user to this document
		await setDoc(userDocRef, cleanUser);
	};

	useEffect(() => {
		if (userCred) {
			createUserDocument(userCred.user);
		}
	}, [userCred]);

	return (
		<>
			<Button
				variant="grayOutline"
				onClick={() => signInWithGoogle()}
				{...{ loading }}
			>
				<img src="/images/Google_Logo.svg"></img>Continue with Google
			</Button>
			{error && (
				<div className="text-sm text-center text-red-600 mt-2">
					{error.message}
				</div>
			)}
		</>
	);
};
export default OAuthGoogleButton;
