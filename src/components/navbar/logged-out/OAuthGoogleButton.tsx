import { doc, setDoc } from "@firebase/firestore";
import { User } from "firebase/auth";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { auth, db } from "../../../firebase/clientApp";
import useUserDocs from "../../../hooks/useUserDocs";
import Button from "../../basic/Button";

// Note: Handles both the log-in case and sign-in case
const OAuthGoogleButton: React.FC = () => {
	const [signInWithGoogle, userCred, loading, error] =
		useSignInWithGoogle(auth);

	// Note: can't use the userDoc from useUserDocs; it auto-refreshes when user changes,
	// but there might be a race condition between this and the check that needs to occur in the
	// useEffect triggered when user logs in; so doing a manual check
	const { createUserDocument, retrieveUserDoc } = useUserDocs();

	useEffect(() => {
		if (userCred) {
			(async () => {
				const userDocument = await retrieveUserDoc(userCred.user.uid);

				if (!userDocument) {
					// Looks like this is an initial sign-in, create user Doc.
					await createUserDocument(userCred.user);
				}
			})();
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
