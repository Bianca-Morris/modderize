import { User } from "firebase/auth";
import React from "react";

type MyProfileProps = {
	userData: User;
};

const MyProfile: React.FC<MyProfileProps> = () => {
	return <div>MY Profile</div>;
};
export default MyProfile;
