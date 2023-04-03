import { User } from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import GenericProfile from "./GenericProfile";

type UserProfileProps = {
	userData: User;
};

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
	const { displayName = "", photoURL } = userData;

	const [user] = useAuthState(auth);

	// On page load, grab the lists of mod requests to display for this user
	useEffect(() => {}, []);

	return (
		<div>
			<GenericProfile
				displayName={displayName || "...loading"}
				profileURL={photoURL || undefined}
				showEdit={false}
				showRequestMod={!!user}
			>
				<div className="mb-10">
					<h2 className="text-2xl font-bold mb-4">
						My Completed Mod Requests
					</h2>
					// TODO
				</div>

				<div className="">
					<h2 className="text-2xl font-bold mb-4">
						My Open Mod Requests
					</h2>
					// TODO
				</div>
			</GenericProfile>
		</div>
	);
};
export default UserProfile;
