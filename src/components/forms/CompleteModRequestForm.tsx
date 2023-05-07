import { Transition } from "@headlessui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { Fragment, useCallback, useState } from "react";
import { modRequestsCol } from "../../firebase/collections";
import { extractMetadataFromFile } from "../../helpers";
import useStorageAPI from "../../hooks/useStorageAPI";
import { ModRequest } from "../../types/docTypes";
import A from "../basic/A";
import Alert from "../basic/Alert";
import Button from "../basic/Button";
import FileUploadInput from "../basic/FileUploadInput";
import Input from "../basic/Input";
import Textarea from "../basic/Textarea";
import H2 from "../basic/typography/H2";

dayjs.extend(relativeTime);

type CompleteModRequestFormProps = {
	request: ModRequest;
};

const CompleteModRequestForm: React.FC<CompleteModRequestFormProps> = ({
	request
}) => {
	const {
		id: requestID,
		title,
		description,
		requesterDisplayName,
		requesterID,
		creationDate
	} = request || {};
	const router = useRouter();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showDescription, setShowDescription] = useState(false);
	const {
		uploadFile,
		error: fileUploadError,
		loading: fileLoading
	} = useStorageAPI();

	const onToggleDescription = useCallback(() => {
		setShowDescription(!showDescription);
	}, [showDescription]);

	const [image, setImage] = useState<File>();
	const [link, setLink] = useState("");
	const [modderNotes, setModderNotes] = useState("");

	const handleUpdateModRequest = async () => {
		if (!link) {
			setError("Link to mod file must be present.");
		}

		let imageURL: string | undefined | null;
		if (image) {
			// Process image
			const metadata = extractMetadataFromFile(image);
			imageURL = await uploadFile(
				`/images/requests/${requestID}.jpeg`,
				image,
				metadata
			);
		}

		const docRef = doc(modRequestsCol, requestID);

		const fieldsToUpdate = {
			imageURL: imageURL || "",
			modderNotes,
			modURL: link,
			completionStatus: "complete",
			lastModified: serverTimestamp() as Timestamp
		};

		try {
			setError("");
			setLoading(true);

			await updateDoc(docRef, fieldsToUpdate);
			setLoading(false);

			// redirect user back to the request page
			router.push(`/requests/${requestID}`);
		} catch (error: any) {
			console.error("handleUpdateModRequest error", error.message);
			setError(error.message);
			setLoading(false);
		}

		console.log("handleUpdateModRequest called");
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { files = [] } = {} } = e;

		if (files && files.length > 0) {
			const thisFile = files[0];

			if (thisFile.size < 60000) {
				setError("");
				setImage(files[0]);
			} else {
				setError("File too large.");
			}
		}
	};

	return (
		<>
			<div className="shadow sm:overflow-hidden sm:rounded-md">
				<div className="space-y-6 bg-white px-4 py-5 sm:p-6">
					{title && <H2>{title}</H2>}
					{requesterID && requesterDisplayName && (
						<div>
							<strong className="pr-1">Requested By:</strong>
							<A
								variant="indigo"
								cls="underline cursor-pointer text-indigo-800 hover:text-indigo-600"
								href={`/users/${requesterID}`}
							>
								{requesterDisplayName}
							</A>
							{creationDate && (
								<span className="text-sm text-gray-400 pl-1">
									{dayjs(
										new Date(creationDate?.seconds * 1000)
									).fromNow()}
								</span>
							)}
						</div>
					)}
					{description && (
						<A variant="indigo" onClick={onToggleDescription}>
							{showDescription
								? "Hide Description"
								: "Show Description"}
						</A>
					)}
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-100"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-100"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-100"
						show={showDescription && !!description}
					>
						<p className="whitespace-pre-wrap">{description}</p>
					</Transition>
					<div className="mt-4">
						<label
							htmlFor="link"
							className="block text-sm font-medium text-gray-700"
						>
							Mod Link
						</label>
						<div className="mt-2 w-full">
							<Input
								required
								type="url"
								id="link"
								name="link"
								placeholder="Ex. https://www.nexusmods.com/..."
								onChange={(e) => setLink(() => e.target.value)}
							/>
						</div>
					</div>
					<div className="mt-4">
						<label className="block text-sm font-medium text-gray-700">
							Mod Image/Screenshot
						</label>
						<div className="mt-2 w-full">
							<FileUploadInput
								id="gameImageFile"
								disabled={loading}
								fileInputHelp="JPG (MAX. 60kb, RECOMMENDED 200x200px)."
								fileName={image?.name}
								accept="image/jpeg"
								{...{
									handleImageChange
								}}
							/>
						</div>
					</div>
					<div className="mt-4">
						<label
							htmlFor="modder-notes"
							className="block text-sm font-medium leading-6 text-gray-700"
						>
							Modder Notes
						</label>
						<div className="mt-2">
							<Textarea
								id="modder-notes"
								name="modder-notes"
								rows={4}
								placeholder="What should this mod do? Be as detailed as possible. If links to other websites or images would be helpful for the modder, be sure to include those, too."
								value={modderNotes}
								onChange={(e) => setModderNotes(e.target.value)}
								required
								disabled={loading}
							/>
						</div>
						<p className="mt-2 text-sm text-gray-500">
							If there's any information necessary for people to
							know about your mod (like DLC requirements,
							dependencies on other mods, etc.), add it here.
						</p>
					</div>
				</div>
				<div>
					<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
						<Button
							type="button"
							variant="gray"
							cls="mr-2"
							onClick={() => router.back()}
						>
							Cancel
						</Button>
						<Button
							type="button"
							variant="violet"
							{...{ loading }}
							onClick={handleUpdateModRequest}
						>
							Save
						</Button>
					</div>
				</div>
				{error && (
					<Alert
						title="Error!"
						subtitle="Creating post may have failed. Try again later."
						variant="danger"
						showIcon
						iconType="warning"
						cls="mt-4"
					/>
				)}
			</div>
		</>
	);
};
export default CompleteModRequestForm;
