import { User } from "firebase/auth";
import React from "react";
import GenericProfile from "./GenericProfile";

type MyProfileProps = {
	userData: User;
};

const MyProfile: React.FC<MyProfileProps> = ({ userData }) => {
	const { displayName = "", photoURL, email } = userData;
	return (
		<div>
			<GenericProfile
				displayName={displayName || "...loading"}
				profileURL={photoURL || undefined}
				email={email || undefined}
				showEdit
				showRequestMod={false}
			>
				<h1>Shenanigans!</h1>
				<p>100% shenanigans</p>
			</GenericProfile>
		</div>
	);
};
export default MyProfile;
