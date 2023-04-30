import React, { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { useSetRecoilState } from "recoil";

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

type MyProfileProps = {
	userData: User;
};

const MyProfile: React.FC<MyProfileProps> = () => {
	const [userDoc, setUserDoc] = useState<DocumentData | null>();
	const [modalKey, setModalKey] = useState<number>(0);
	const { isActiveModder = false, about, donationLink } = userDoc || {};
	const [user] = useAuthState(auth);

	const { retrieveUserDoc, updateUserDocField, loading } = useUserDocs();
	const setOpenProfileEditModalStateValue = useSetRecoilState(
		profileEditModalState
	);

	useEffect(() => {
		onLoad();
	}, []);

	useEffect(() => {
		console.log("new user Doc", userDoc);
	}, [isActiveModder]);

	const onLoad = async () => {
		if (!user) {
			return;
		}
		return retrieveUserDoc(uid).then((doc) => setUserDoc(doc));
	};

	const handleOpenModal = () => {
		setOpenProfileEditModalStateValue((prev) => ({
			...prev,
			open: true
		}));
	};

	const userDocLoaded = !!userDoc;

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
			{userDocLoaded && (
				<EditProfileModal key={modalKey}>
					<EditProfileForm
						initialAbout={about}
						initialDonationLink={donationLink}
						postSubmitReload={onLoad}
					/>
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
						onLoad();
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
