import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { auth } from "../../../firebase/clientApp";
import Button from "../../basic/Button";

// Note: Handles both the log-in case and sign-in case
const OAuthGoogleButton: React.FC = () => {
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

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
