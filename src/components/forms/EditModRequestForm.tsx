import React, { useState } from "react";

import { User } from "firebase/auth";
import {
	serverTimestamp,
	Timestamp,
	addDoc,
	doc,
	updateDoc
} from "firebase/firestore";
import { useRouter } from "next/router";

import { modRequestsCol } from "../../firebase/collections";
import { ModRequest } from "../../types/docTypes";
import Alert from "../basic/Alert";
import Button from "../basic/Button";
import Input from "../basic/Input";
import Textarea from "../basic/Textarea";

type EditModRequestFormProps = {
	request: ModRequest;
};

const EditModRequestForm: React.FC<EditModRequestFormProps> = ({ request }) => {
	const [title, setTitle] = useState(request.title);
	const [description, setDescription] = useState(request.description);

	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleUpdateModRequest = async () => {
		const docRef = doc(modRequestsCol, request.id);

		const fieldsToUpdate = {
			title,
			description,
			lastModified: serverTimestamp() as Timestamp
		};

		try {
			setError(false);
			setLoading(true);

			await updateDoc(docRef, fieldsToUpdate);
			setLoading(false);

			// redirect user back to the game page
			router.back();
		} catch (error: any) {
			console.error("handleUpdateModRequest error", error.message);
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
						onClick={handleUpdateModRequest}
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
export default EditModRequestForm;
