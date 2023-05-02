import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import useUserDocs from "../../hooks/useUserDocs";
import ProfileModsByStatus from "../general/ProfileModsByStatus";
import ProfileOpenModsByRequesterID from "../general/ProfileOpenModsByRequesterID";
import GenericProfile from "./GenericProfile";

type UserProfileProps = {
	userData: User; // The user that is in the process of being viewed
};

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
	const { uid, displayName, photoURL } = userData;
	const [viewingUserDoc, setViewingUserDoc] = useState<DocumentData | null>();
	const { getUserDoc } = useUserDocs();
	const [activeUser] = useAuthState(auth);

	const {
		isActiveModder = false,
		about,
		donationLink
	} = viewingUserDoc || {};

	useEffect(() => {
		onLoad();
	}, []);

	const onLoad = async () => {
		return getUserDoc(uid).then((doc) => setViewingUserDoc(doc));
	};

	return (
		<div>
			<GenericProfile
				displayName={displayName || "...loading"}
				profileURL={photoURL || undefined}
				description={about}
				showTopDonationLink={isActiveModder && donationLink}
				{...{ donationLink }}
				showEdit={false}
				showRequestMod={!!activeUser && isActiveModder}
			>
				<div className="mb-10">
					<h2 className="text-2xl font-bold mb-4">
						My Completed Mod Requests
					</h2>
					<ProfileModsByStatus status="complete" modderID={uid} />
				</div>

				<div className="">
					<h2 className="text-2xl font-bold mb-4">
						My Open Mod Requests
					</h2>
					<ProfileOpenModsByRequesterID requesterID={uid} />
				</div>
			</GenericProfile>
		</div>
	);
};
export default UserProfile;
