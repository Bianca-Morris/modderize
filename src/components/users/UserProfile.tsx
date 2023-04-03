import { User } from "firebase/auth";
import React from "react";

type UserProfileProps = {
	userData: User;
};

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
	return <div>Have a good coding</div>;
};
export default UserProfile;
