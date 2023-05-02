import React, { useState } from "react";
import {
	getDownloadURL,
	ref,
	SettableMetadata,
	uploadBytes
} from "firebase/storage";

import { storage } from "../firebase/clientApp";

const useStorageAPI = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const uploadFile = async (
		fileRefPath: string,
		file: File,
		metadata: SettableMetadata
	) => {
		const fileRef = ref(storage, fileRefPath);

		setLoading(true);
		return uploadBytes(fileRef, file, metadata)
			.then(() => {
				return getDownloadURL(fileRef);
			})
			.then((url) => {
				setLoading(false);
				return url;
			})
			.catch((err) => {
				console.error("something went wrong while uploading file", err);
				setError(err.message);
				setLoading(false);
				return null;
			});
	};

	const deleteFile = async () => {};

	const retrieveFile = async () => {};

	return {
		uploadFile,
		deleteFile,
		retrieveFile,
		loading,
		error
	};
};

export default useStorageAPI;
