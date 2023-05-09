import React from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase/clientApp";
import { UserDoc } from "../../types/docTypes";
import H2 from "../basic/typography/H2";
import ProfileModsByStatus from "../general/ProfileModsByStatus";
import ProfileOpenModsByRequesterID from "../general/ProfileOpenModsByRequesterID";
import GenericProfile from "./GenericProfile";

type UserProfileProps = {
	userID: string; // The userID that is in the process of being viewed
	userDoc?: UserDoc;
};

const UserProfile: React.FC<UserProfileProps> = ({ userID, userDoc }) => {
	const [activeUser] = useAuthState(auth);
	const router = useRouter();

	const {
		uid = "",
		displayName,
		photoURL,
		isActiveModder = false,
		about,
		donationLink
	} = userDoc || {};

	const onRequestMod = () => {
		router.push(`/users/${uid}/userModRequest`);
	};

	return (
		<div>
			<GenericProfile
				id={uid}
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
					<H2 cls="mb-4">Mods I&apos;ve Requested</H2>
					<ProfileOpenModsByRequesterID requesterID={uid} />
				</div>
			</GenericProfile>
		</div>
	);
};
export default UserProfile;
