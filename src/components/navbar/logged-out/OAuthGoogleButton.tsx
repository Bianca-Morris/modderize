import { doc, setDoc } from "@firebase/firestore";
import { User } from "firebase/auth";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import Image from "next/image";

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
	const { createUserDocument, getUserDoc } = useUserDocs();

	useEffect(() => {
		if (userCred) {
			(async () => {
				const userDocument = await getUserDoc(userCred.user.uid);

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
				<Image
					className="mr-2"
					width={25}
					height={25}
					alt="Google Logo"
					src="/images/Google_Logo.svg"
				></Image>
				Continue with Google
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
