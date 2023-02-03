import React from "react";
import Button from "../../basic/Button";

const OAuthGoogleButton: React.FC = () => {
	return (
		<Button variant="grayOutline" onClick={() => null}>
			<img src="/images/Google_Logo.svg"></img>Continue with Google
		</Button>
	);
};
export default OAuthGoogleButton;
