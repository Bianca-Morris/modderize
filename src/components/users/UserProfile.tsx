import { User } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import GenericProfile from "./GenericProfile";

type UserProfileProps = {
	userData: User;
};

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
	const { displayName = "", photoURL, email } = userData;

	const [user] = useAuthState(auth);

	return (
		<div>
			<GenericProfile
				displayName={displayName || "...loading"}
				profileURL={photoURL || undefined}
				showEdit={false}
				showRequestMod={!!user}
			>
				<h1>Shenanigans!</h1>
				<p>100% shenanigans</p>
			</GenericProfile>
		</div>
	);
};
export default UserProfile;
