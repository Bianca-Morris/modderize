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
				<div className="mb-10">
					<h2 className="text-2xl font-bold mb-4">
						My Mods In-Progress
					</h2>
					// TODO
				</div>

				<div className="">
					<h2 className="text-2xl font-bold mb-4">My Mod Requests</h2>
					// TODO
				</div>
			</GenericProfile>
		</div>
	);
};
export default MyProfile;
