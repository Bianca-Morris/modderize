import { User } from "firebase/auth";
import {
	addDoc,
	collection,
	serverTimestamp,
	Timestamp
} from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "../../firebase/clientApp";
import { ModRequest } from "../../types/docTypes";
import Button from "../basic/Button";
import Input from "../basic/Input";
import Textarea from "../basic/Textarea";

type NewGameModRequestFormProps = {
	user: User;
	gameID: string;
};

const NewGameModRequestForm: React.FC<NewGameModRequestFormProps> = ({
	user,
	gameID
}) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleCreateGameModRequest = async () => {
		// create the new game mod request object => type ModRequest
		const newModRequest: ModRequest = {
			id: "",
			gameID,
			title,
			description,
			requesterID: user?.uid,
			requesterDisplayName: user.email!.split("@")[0],
			creationDate: serverTimestamp() as Timestamp,
			lastModified: serverTimestamp() as Timestamp,
			voteStatus: 0,
			numUpvotes: 0,
			numDownvotes: 0,
			completionStatus: "pending modder",
			modderStatus: "open"
		};

		// store the post in db
		try {
			const modRequestDocRef = await addDoc(
				collection(firestore, "modRequests"),
				newModRequest
			);
		} catch (error: any) {
			console.log("handleCreateModRequest error", error.message);
		}

		// redirect the user back to the game page
	};
	return (
		<form action="#" method="POST">
			<div className="shadow sm:overflow-hidden sm:rounded-md">
				<div className="space-y-6 bg-white px-4 py-5 sm:p-6">
					<div>
						<label
							htmlFor="mod-request-title"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Mod Request Title
						</label>
						<div className="mt-2 w-full flex rounded-md shadow-sm">
							<Input
								type="text"
								cls="w-full"
								wrapperCls="w-full"
								value={title}
								name="mod-request-title"
								id="mod-request-title"
								placeholder="Give this mod request a distinctive name..."
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="mod-request-description"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Mod Description
						</label>
						<div className="mt-2">
							<Textarea
								id="mod-request-description"
								name="mod-request-description"
								rows={4}
								placeholder="What should this mod do? Be as detailed as possible. If links to other websites or images would be helpful for the modder, be sure to include those, too."
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
							/>
						</div>
						<p className="mt-2 text-sm text-gray-500">
							Brief description of the mod you are requesting.
							<br />
							<i>
								Note: URLs will be hyperlinked on the view page.
							</i>
						</p>
					</div>

					{/* <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>
                                    Upload a file
                                </span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                />
                            </label>
                            <p className="pl-1">
                                or drag and drop
                            </p>
                        </div>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                        </p>
                    </div>
                </div>
            </div> */}
				</div>
				<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
					<Button type="button" variant="gray" cls="mr-2">
						Cancel
					</Button>
					<Button type="submit" variant="violet">
						Save
					</Button>
				</div>
			</div>
		</form>
	);
};
export default NewGameModRequestForm;
