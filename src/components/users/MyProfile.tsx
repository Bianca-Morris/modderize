import React, { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { profileEditModalState } from "../../atoms/profileEditModalAtom";
import useUserDocs from "../../hooks/useUserDocs";
import Toggle from "../basic/Toggle";
import EditProfileForm from "../forms/EditProfileForm";
import EditProfileModal from "../modals/EditProfileModal";
import GenericProfile from "./GenericProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import ProfileOpenModsByRequesterID from "../general/ProfileOpenModsByRequesterID";
import ProfileModsByStatus from "../general/ProfileModsByStatus";
import { userDocAtom } from "../../atoms/userDocAtom";
import useUserDoc from "../../hooks/useUserDoc";

type MyProfileProps = {
	userData: User;
};

const MyProfile: React.FC<MyProfileProps> = () => {
	const [modalKey, setModalKey] = useState<number>(0);
	const [user] = useAuthState(auth);

	const { updateUserDocField, loading: updatingUserDoc } = useUserDocs();
	const { userDoc, loading: loadingUserDoc } = useUserDoc();

	const {
		isActiveModder = false,
		about = "",
		donationLink = ""
	} = userDoc || {};

	const setOpenProfileEditModalStateValue = useSetRecoilState(
		profileEditModalState
	);

	const handleOpenModal = () => {
		setOpenProfileEditModalStateValue((prev) => ({
			...prev,
			open: true
		}));
	};

	// When user or user doc is updated, refresh the form and reset to new values
	useEffect(() => {
		setModalKey(modalKey + 1);
	}, [userDoc, user]);

	if (!user) {
		return null;
	}

	const { uid, displayName = "", photoURL, email } = user;

	return (
		<div>
			{!loadingUserDoc && !!userDoc && (
				<EditProfileModal key={modalKey}>
					<EditProfileForm />
				</EditProfileModal>
			)}
			<GenericProfile
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
				<hr className="my-3" />
				<div className="mb-10">
					<h2 className="text-2xl font-bold mb-4">
						My Mods In-Progress
					</h2>
					<ProfileModsByStatus status="in progress" modderID={uid} />
				</div>

				<div className="">
					<h2 className="text-2xl font-bold mb-4">My Mod Requests</h2>
					<ProfileOpenModsByRequesterID requesterID={uid} />
				</div>
			</GenericProfile>
		</div>
	);
};
export default MyProfile;
