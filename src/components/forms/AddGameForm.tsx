import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

import Button from "../basic/Button";
import FileUploadInput from "../basic/FileUploadInput";
import Input from "../basic/Input";
import useStorageAPI from "../../hooks/useStorageAPI";
import useGameData from "../../hooks/useGameData";

const NUM_CHARS_ALLOWED_FOR_NAME = 21;

type AddGameFormProps = {
	handleClose: () => void;
};

const AddGameForm: React.FC<AddGameFormProps> = ({ handleClose }) => {
	// Form State
	const [gameID, setGameID] = useState("");
	const [charsRemaining, setCharsRemaining] = useState(
		NUM_CHARS_ALLOWED_FOR_NAME
	);
	const [gameDisplayName, setGameDisplayName] = useState("");
	const [image, setImage] = useState<File>();
	const [error, setError] = useState("");
	const { createGame } = useGameData();

	const { loading: fileLoading, error: fileError } = useStorageAPI();

	const handleChangeDisplayName = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { target: { value = "" } = {} } = event;
		setGameDisplayName(value);
	};

	const handleChangeGameID = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { value = "" } = {} } = event;

		if (value.length > NUM_CHARS_ALLOWED_FOR_NAME) {
			return;
		}

		// Recalculate how many chars left in the ID
		setGameID(value);
		setCharsRemaining(NUM_CHARS_ALLOWED_FOR_NAME - value.length);
	};

	const handleCreateGame = async () => {
		// Validate the game id (should be unique & within length restraints)
		const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

		if (format.test(gameID) || gameID.length < 3) {
			setError(
				"Game IDs must be between 3–21 characters, and can only contain letters, numbers, or underscores."
			);
			return;
		}

		if (gameDisplayName.length < 3) {
			setError("Game Name must be at least 3 characters.");
			return;
		}

		await createGame({ gameID, image, gameDisplayName });
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
			<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div className="flex items-center justify-center">
					<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<Dialog.Title
							as="h1"
							className="text-xl text-center font-bold font-medium text-gray-900"
						>
							Add New Game (Admin Only)
						</Dialog.Title>
						<hr />
						<div className="mt-4">
							<label
								htmlFor="about"
								className="block text-sm font-medium text-gray-700"
							>
								Game Display Name
							</label>
							<p className="my-2 text-sm text-gray-500">
								A human-readable version of the game&apos;s
								name; can contain special characters. Please
								check for duplicates before creating.
							</p>
							<div className="mt-1">
								<Input
									id="name"
									name="name"
									type="text"
									placeholder="Ex: The Elder Scrolls IV - Oblivion"
									value={gameDisplayName}
									onChange={handleChangeDisplayName}
								/>
							</div>
						</div>
						<div className="mt-4">
							<label
								htmlFor="about"
								className="block text-sm font-medium text-gray-700"
							>
								Game ID
							</label>
							<p className="my-2 text-sm text-gray-500">
								This should be a unique identifier that contains
								no special characters aside from the underscore
								and is limited in length.
							</p>
							<div className="mt-1">
								<Input
									id="gameID"
									name="gameID"
									type="text"
									placeholder="ex. TES4_Oblivion"
									value={gameID}
									onChange={handleChangeGameID}
								/>
							</div>
							<span
								className={`block mt-4 text-xs ${
									charsRemaining === 0
										? "text-red-400"
										: "text-gray-400"
								}`}
							>
								{charsRemaining} Characters remaining
							</span>
						</div>
						<div className="mt-4">
							<label className="block text-sm font-medium text-gray-700">
								Game Image
							</label>
							<div className="mt-2 w-full">
								<FileUploadInput
									id="gameImageFile"
									required
									disabled={fileLoading}
									fileInputHelp="Webp (MAX. 60kb, RECOMMENDED 208x208px)."
									fileName={image?.name}
									accept="image/webp"
									{...{
										handleImageChange
									}}
								/>
							</div>
						</div>
						{error && (
							<span className="block mt-4 text-sm text-red-400">
								{error || fileError}
							</span>
						)}
					</div>
				</div>
			</div>
			<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:justify-end sm:px-6">
				<Button
					type="button"
					onClick={handleClose}
					variant="red"
					loading={fileLoading}
				>
					Cancel
				</Button>
				<Button
					type="button"
					cls="ml-2"
					onClick={handleCreateGame}
					variant="gray"
					loading={fileLoading}
				>
					Add New Game
				</Button>
			</div>
		</>
	);
};
export default AddGameForm;
