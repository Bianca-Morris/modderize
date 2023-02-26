import {
	doc,
	getDoc,
	runTransaction,
	serverTimestamp,
	setDoc
} from "@firebase/firestore";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { gameModalState } from "../../../atoms/gameModalAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import Button from "../../basic/Button";
import Input from "../../basic/Input";

type AddGameModalProps = {};

const NUM_CHARS_ALLOWED_FOR_NAME = 21;

const AddGameModal: React.FC<AddGameModalProps> = () => {
	// Auth State
	const [user] = useAuthState(auth);
	// Modal State
	const [modalState, setModalState] = useRecoilState(gameModalState);
	// Form State
	const [gameID, setGameID] = useState("");
	const [charsRemaining, setCharsRemaining] = useState(
		NUM_CHARS_ALLOWED_FOR_NAME
	);
	const [gameDisplayName, setGameDisplayName] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const { open } = modalState;

	// Reset when opened anew
	useEffect(() => {
		if (open) {
			setGameID("");
			setCharsRemaining(NUM_CHARS_ALLOWED_FOR_NAME);
			setGameDisplayName("");
			setLoading(false);
			setError("");
		}
	}, [open]);

	const handleClose = () => {
		setModalState({
			open: false
		});
	};

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
		if (error) {
			setError("");
		}

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

		setLoading(true);

		try {
			// If valid ID, create the community
			const gameDocRef = doc(firestore, "games", gameID);

			// Batching a few operations so if one fails, they fail together.
			await runTransaction(firestore, async (transaction) => {
				// Check if the game's ID is already in the db
				const gameDoc = await transaction.get(gameDocRef);

				if (gameDoc.exists()) {
					// Has already been created
					throw new Error(
						"This game ID already exists; check for duplicates and/or try again."
					);
				}

				// Create a new game doc in firestore with this ID
				await transaction.set(gameDocRef, {
					creatorID: user?.uid,
					createdAt: serverTimestamp(),
					displayName: gameDisplayName,
					numberOfPlayers: 1
				});

				// Then, create a snippet with some info about the games a user is following
				transaction.set(
					doc(firestore, `users/${user?.uid}/gameSnippets`, gameID),
					{
						gameID,
						gameName: gameDisplayName
					}
				);
			});

			console.log("Game created! Closing modal");
			setLoading(false);
			setModalState({ open: false });
		} catch (error: any) {
			console.log("handleCreateGame", error);
			setError(error.message);
		}

		setLoading(false);
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				// initialFocus={nameInputRef} TODO: Maybe set in future
				onClose={handleClose}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="flex items-center justify-center">
										<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
											<Dialog.Title
												as="h1"
												className="text-xl text-center font-bold font-medium text-gray-900 mb-4"
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
													A human-readable version of
													the game's name; can contain
													special characters. Please
													check for duplicates before
													creating.
												</p>
												<div className="mt-1">
													<Input
														id="name"
														name="name"
														type="text"
														placeholder="Ex: The Elder Scrolls IV - Oblivion"
														value={gameDisplayName}
														onChange={
															handleChangeDisplayName
														}
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
													This should be a unique
													identifier that contains no
													special characters aside
													from the underscore and is
													limited in length.
												</p>
												<div className="mt-1">
													<Input
														id="gameID"
														name="gameID"
														type="text"
														placeholder="ex. TES4_Oblivion"
														value={gameID}
														onChange={
															handleChangeGameID
														}
													/>
												</div>
												<span
													className={`block mt-4 text-xs ${
														charsRemaining === 0
															? "text-red-400"
															: "text-gray-400"
													}`}
												>
													{charsRemaining} Characters
													remaining
												</span>
											</div>
											{error && (
												<span
													className="block mt-4 text-sm 
													 text-red-400"
												>
													{error}
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
									>
										Cancel
									</Button>
									<Button
										type="button"
										cls="ml-2"
										onClick={handleCreateGame}
										variant="gray"
									>
										Add New Game
									</Button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
export default AddGameModal;
