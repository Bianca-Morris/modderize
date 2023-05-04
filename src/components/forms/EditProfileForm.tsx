import { updateProfile } from "firebase/auth";
import { runTransaction } from "firebase/firestore";
import React, {
	FormEventHandler,
	ChangeEventHandler,
	useState,
	useEffect
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { profileEditModalState } from "../../atoms/profileEditModalAtom";
import { auth, db } from "../../firebase/clientApp";
import { extractMetadataFromFile } from "../../helpers";
import useStorageAPI from "../../hooks/useStorageAPI";
import useUserDoc from "../../hooks/useUserDoc";
import useUserDocs from "../../hooks/useUserDocs";
import { UserDoc } from "../../types/docTypes";
import Button from "../basic/Button";
import FileUploadInput from "../basic/FileUploadInput";
import Input from "../basic/Input";
import Textarea from "../basic/Textarea";

type EditProfileFormProps = {
	userDoc: UserDoc; // Fix for useUserDoc not working here... @TODO need to look into why
};

const EditProfileForm: React.FC<EditProfileFormProps> = ({ userDoc }) => {
	// Authenticate user
	const [user] = useAuthState(auth);
	const { uid } = user || {};

	const [error, setError] = useState("");
	const [loading, setLoading] = useState<boolean>();
	const {
		uploadFile,
		loading: fileLoading,
		error: fileError
	} = useStorageAPI();
	const setOpenProfileEditModalStateValue = useSetRecoilState(
		profileEditModalState
	);
	const [image, setImage] = useState<File>();
	const [editProfileForm, setEditProfileForm] = useState({
		about: userDoc.about,
		donationLink: userDoc.donationLink
	});
	const { updateUserDoc } = useUserDocs();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!user) {
			// Logged out, I guess?
			setError("You must be logged in to update your profile...");
			return null;
		}

		const updateObj = {} as any;

		setLoading(true);

		// Handle image processing
		if (image) {
			const metadata = extractMetadataFromFile(image);

			// Wait for image to upload
			const imageUrl = await uploadFile(
				`images/profiles/${uid}.jpeg`,
				image,
				metadata
			);

			// Update profile image in auth
			await updateProfile(user, { photoURL: imageUrl });

			if (image) {
				updateObj.photoURL = imageUrl;
			}
		}

		// Update the user doc with updated fields
		if (editProfileForm.about) {
			updateObj.about = editProfileForm.about;
		}
		if (editProfileForm.donationLink) {
			updateObj.donationLink = editProfileForm.donationLink;
		}

		await updateUserDoc(user.uid, updateObj);

		setLoading(false);

		// Close the modal
		setOpenProfileEditModalStateValue((prev) => ({ ...prev, open: false }));
	};

	const handleTextInput = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { target: { name = "", value = "" } = {} } = e;

		// update form state
		setEditProfileForm((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { files = [] } = {} } = e;

		if (files && files.length > 0) {
			const thisFile = files[0];

			if (thisFile.size < 50000) {
				setError("");
				setImage(files[0]);
			} else {
				setError("File too large.");
			}
		}
	};

	useEffect(() => {
		console.log("userDoc", userDoc);
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			<div className="mt-8 mx-8 flex flex-col">
				<label htmlFor="about" className="text-left">
					About Me:
				</label>
				<Textarea
					disabled={loading || fileLoading}
					name="about"
					id="about"
					placeholder="Ex: jane.doe@mail.com"
					onChange={handleTextInput}
					value={editProfileForm.about}
				/>
			</div>
			<div className="mt-4 mx-8 flex flex-col">
				<label htmlFor="about" className="text-left">
					{/* @TODO: Would be nice to add some validation here to ensure this is a URL */}
					My Donation Page:
				</label>
				<Input
					disabled={loading || fileLoading}
					type="text"
					name="donationLink"
					id="donationLink"
					placeholder="Ex: https://www.patreon.com/janedoemods"
					onChange={handleTextInput}
					value={editProfileForm.donationLink}
				/>
			</div>

			<div className="my-4 mx-8 flex flex-col">
				<label className="text-left">My Profile Picture:</label>
				<FileUploadInput
					disabled={loading || fileLoading}
					id="imageFile"
					fileName={image?.name}
					accept="image/jpeg"
					{...{ handleImageChange }}
				/>
			</div>
			{error ||
				(fileError && (
					<div className="text-center text-red-600">
						{error || fileError}
					</div>
				))}
			<div className="my-2 mx-8 flex flex-col text-center">
				<Button
					type="submit"
					variant="violet"
					loading={loading || fileLoading}
				>
					Submit Changes
				</Button>
			</div>
		</form>
	);
};
export default EditProfileForm;
