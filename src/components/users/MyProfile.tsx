import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileEditModalState } from "../../atoms/profileEditModalAtom";
import useUserDocs from "../../hooks/useUserDocs";
import { UserDoc } from "../../types/docTypes";
import Button from "../basic/Button";
import FileUploadInput from "../basic/FileUploadInput";
import Input from "../basic/Input";
import Textarea from "../basic/Textarea";
import Toggle from "../basic/Toggle";
import EditProfileModal from "../modals/EditProfileModal";
import GenericProfile from "./GenericProfile";

type MyProfileProps = {
	userData: User;
};

const MyProfile: React.FC<MyProfileProps> = ({ userData }) => {
	const [error, setError] = useState("");
	const [userDoc, setUserDoc] = useState<DocumentData | null>();
	const [editProfileForm, setEditProfileForm] = useState({
		about: "",
		socialUrls: [],
		donationUrls: []
	});
	const { isActiveModder = false } = userDoc || {};
	const { uid, displayName = "", photoURL, email } = userData;
	const { retrieveUserDoc, updateUserDocField, loading } = useUserDocs();
	const [profileEditModalStateValue, setOpenProfileEditModalStateValue] =
		useRecoilState(profileEditModalState);

	useEffect(() => {
		onLoad().then((doc) => setUserDoc(doc));
	}, []);

	useEffect(() => {
		console.log("new user Doc", userDoc);
	}, [isActiveModder]);

	const onLoad = async () => {
		return await retrieveUserDoc(uid);
	};

	const onSubmit = async () => {};

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { target: { name = "", value = "" } = {} } = e;

		// update form state
		setEditProfileForm((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleOpenModal = () => {
		setOpenProfileEditModalStateValue((prev) => ({
			...prev,
			open: true
		}));
	};

	const [image, setImage] = useState<File>();

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { files = [] } = {} } = e;

		if (files && files.length > 0) {
			const thisFile = files[0];

			if (thisFile.size < 40000) {
				console.log("image", files[0]);
				setError("");
				setImage(files[0]);
			} else {
				setError("File too large.");
			}
		}
	};

	const handleSubmit = () => {
		// callback(image);
		console.log("image", image);
	};

	return (
		<div>
			<EditProfileModal>
				<form onSubmit={onSubmit}>
					<div className="mt-8 mx-8 flex flex-col">
						<label htmlFor="about" className="text-left">
							About Me:
						</label>
						<Textarea
							required
							name="about"
							id="about"
							placeholder="Ex: jane.doe@mail.com"
							onChange={onChange}
						/>
					</div>
					<div className="mt-4 mx-8 flex flex-col">
						<label htmlFor="about" className="text-left">
							My Donation Page:
						</label>
						<Input
							type="text"
							name="donationLink"
							id="donationLink"
							placeholder="Ex: https://www.patreon.com/janedoemods"
							onChange={onChange}
						/>
					</div>

					<div className="my-4 mx-8 flex flex-col">
						<label className="text-left">My Profile Picture:</label>
						<FileUploadInput
							id="imageFile"
							fileName={image?.name}
							{...{ handleImageChange, handleSubmit }}
						/>
					</div>
					<div className="text-center text-red-600">{error}</div>
					<div className="my-2 mx-8 flex flex-col text-center">
						<Button type="submit" variant="violet" {...{ loading }}>
							Submit Changes
						</Button>
					</div>
				</form>
			</EditProfileModal>
			<GenericProfile
				displayName={displayName || "...loading"}
				profileURL={photoURL || undefined}
				email={email || undefined}
				showEdit
				showRequestMod={false}
				onEditProfile={() => handleOpenModal()}
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
