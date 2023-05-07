import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import useUserDocs from "../../hooks/useUserDocs";
import H2 from "../basic/typography/H2";
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
	const router = useRouter();

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

	const onRequestMod = () => {
		router.push(`/users/${uid}/userModRequest`);
	};

	return (
		<div>
			<GenericProfile
				displayName={displayName || "...loading"}
				profileURL={photoURL || undefined}
				description={about}
				{...{ donationLink, onRequestMod }}
				showBottomDonationLink={isActiveModder && !!donationLink}
				showEdit={false}
				showRequestMod={!!activeUser && isActiveModder}
			>
				<div className="mb-10">
					<H2 cls="mb-4">My Mods</H2>
					<ProfileModsByStatus status="complete" modderID={uid} />
				</div>

				<div className="">
					<H2 cls="mb-4">Mods I've Requested</H2>
					<ProfileOpenModsByRequesterID requesterID={uid} />
				</div>
			</GenericProfile>
		</div>
	);
};
export default UserProfile;
