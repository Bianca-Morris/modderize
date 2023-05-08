import React, { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";

import useUserDocs from "../../hooks/useUserDocs";
import Toggle from "../basic/Toggle";
import EditProfileForm from "../forms/EditProfileForm";
import EditProfileModal from "../modals/EditProfileModal";
import GenericProfile from "./GenericProfile";
import { auth } from "../../firebase/clientApp";
import ProfileOpenModsByRequesterID from "../general/ProfileOpenModsByRequesterID";
import ProfileModsByStatus from "../general/ProfileModsByStatus";
import useUserDoc from "../../hooks/useUserDoc";
import { modalControllerAtom } from "../../atoms/modalControllerAtom";
import H2 from "../basic/typography/H2";
import A from "../basic/A";

type MyProfileProps = {
	userData: User;
};

const MyProfile: React.FC<MyProfileProps> = () => {
	const [user] = useAuthState(auth);

	const { updateUserDocField, loading: updatingUserDoc } = useUserDocs();
	const { userDoc, loading: loadingUserDoc } = useUserDoc();

	const {
		isActiveModder = false,
		about = "",
		donationLink = ""
	} = userDoc || {};

	const setModalControllerState = useSetRecoilState(modalControllerAtom);

	const handleOpenModal = () => {
		setModalControllerState((prev) => ({
			...prev,
			profileEditModalOpen: true
		}));
	};

	if (!user) {
		return null;
	}

	const { uid, displayName = "", photoURL, email } = user;

	return (
		<div>
			{!loadingUserDoc && !!userDoc && (
				<EditProfileModal>
					<EditProfileForm {...{ userDoc }} />
				</EditProfileModal>
			)}
			<GenericProfile
				id={user.uid}
				displayName={displayName || "...loading"}
				profileURL={photoURL || undefined}
				email={email || undefined}
				description={about}
				showTopDonationLink
				{...{ donationLink }}
				showEdit
				showRequestMod={false}
				onEditProfile={handleOpenModal}
			>
				<div className="flex justify-between">
					<Toggle
						loading={loadingUserDoc || updatingUserDoc}
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
						}}
					/>
					<A
						variant="indigo"
						href={`/requests?modderID=${user.uid}&modderStatus=requested&hideFilters=true&title=My%20Project%20Queue`}
					>
						View My Project Queue
					</A>
				</div>
				<hr className="my-3" />
				<div className="mb-10">
					<H2 cls="mb-4">My Current Projects</H2>
					<ProfileModsByStatus status="in progress" modderID={uid} />
				</div>

				<div className="">
					<H2 cls="mb-4">My Requests</H2>
					<ProfileOpenModsByRequesterID requesterID={uid} />
				</div>
			</GenericProfile>
		</div>
	);
};
export default MyProfile;
