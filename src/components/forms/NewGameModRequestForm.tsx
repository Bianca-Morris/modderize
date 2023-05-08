import { User } from "firebase/auth";
import { addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { modRequestsCol } from "../../firebase/collections";
import { ModRequestSansID } from "../../types/docTypes";
import Alert from "../basic/Alert";
import Button from "../basic/Button";
import Input from "../basic/Input";
import Textarea from "../basic/Textarea";

type NewGameModRequestFormProps = {
	user: User;
	gameID: string;
	gameDisplayName: string;
};

const NewGameModRequestForm: React.FC<NewGameModRequestFormProps> = ({
	user,
	gameID,
	gameDisplayName
}) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleCreateGameModRequest = async () => {
		// create the new game mod request object => type ModRequest
		const newModRequest: ModRequestSansID = {
			gameID,
			gameDisplayName,
			title,
			description,
			requesterID: user?.uid,
			requesterDisplayName:
				user?.displayName || user.email!.split("@")[0],
			creationDate: serverTimestamp() as Timestamp,
			lastModified: serverTimestamp() as Timestamp,
			voteStatus: 0,
			completionStatus: "pending modder",
			modderStatus: "open"
		};

		// store the mod request in db
		try {
			setError(false);
			setLoading(true);
			await addDoc(modRequestsCol, newModRequest);
			setLoading(false);

			// redirect the user back to the game page
			router.back();
		} catch (error: any) {
			console.error("handleCreateModRequest error", error.message);
			setError(true);
			setLoading(false);
		}
	};
	return (
		<>
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
								disabled={loading}
								maxLength={50}
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
								disabled={loading}
								maxLength={500}
							/>
						</div>
						<p className="mt-2 text-sm text-gray-500">
							Brief description of the mod you are requesting.
							<br />
						</p>
					</div>
				</div>
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
						onClick={handleCreateGameModRequest}
						{...{ loading }}
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
		</>
	);
};
export default NewGameModRequestForm;
