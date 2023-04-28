import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useUserDocs from "../../hooks/useUserDocs";
import { UserDoc } from "../../types/docTypes";
import Toggle from "../basic/Toggle";
import GenericProfile from "./GenericProfile";

type MyProfileProps = {
	userData: User;
};

const MyProfile: React.FC<MyProfileProps> = ({ userData }) => {
	const [userDoc, setUserDoc] = useState<DocumentData | null>();
	const { isActiveModder = false } = userDoc || {};
	const { uid, displayName = "", photoURL, email } = userData;
	const { retrieveUserDoc, updateUserDocField, loading } = useUserDocs();

	useEffect(() => {
		onLoad().then((doc) => setUserDoc(doc));
	}, []);

	useEffect(() => {
		console.log("new user Doc", userDoc);
	}, [isActiveModder]);

	const onLoad = async () => {
		return await retrieveUserDoc(uid);
	};

	return (
		<div>
			<GenericProfile
				displayName={displayName || "...loading"}
				profileURL={photoURL || undefined}
				email={email || undefined}
				showEdit
				showRequestMod={false}
			>
				<Toggle
					{...{ loading }}
					label={
						isActiveModder
							? "I'm open to accepting mod requests"
							: "I'm not accepting mod requests"
					}
					value={isActiveModder}
					onToggle={async (newState: boolean) => {
						// Update the user doc
						await updateUserDocField(
							uid,
							"isActiveModder",
							newState
						);
						// Update state here
						onLoad().then((doc) => setUserDoc(doc));
					}}
				/>
				<hr className="my-3" />
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
