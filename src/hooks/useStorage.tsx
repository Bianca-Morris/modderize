import {
	getDownloadURL,
	ref,
	SettableMetadata,
	StorageReference,
	updateMetadata,
	uploadBytes
} from "firebase/storage";
import React, { useState } from "react";
import { storage } from "../firebase/clientApp";

const useStorage = () => {
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

export default useStorage;
