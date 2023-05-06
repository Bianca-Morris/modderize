import React from "react";
import Button from "./Button";

type FileUploadInputProps = {
	label?: string;
	id?: string;
	fileName?: string;
	fileInputHelp?: string;
	accept?: string;
	handleSubmit?: React.MouseEventHandler;
	handleImageChange: React.ChangeEventHandler;
	disabled?: boolean;
	required?: boolean;
};

const FileUploadInput: React.FC<FileUploadInputProps> = ({
	label = "Choose file",
	fileInputHelp = "JPG (MAX. 50kb, RECOMMENDED 208x208px).",
	fileName = "No file chosen...",
	id = "file_input",
	accept = "image/jpeg",
	handleSubmit,
	handleImageChange,
	disabled = false,
	required
}) => {
	return (
		<>
			<div className="flex gap-2">
				<div className="max-w-full flex whitespace-nowrap flex-row flex-nowrap items-center w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 focus:outline-none">
					<label
						htmlFor={id}
						className="bg-gray-200 h-full py-2 px-3 mr-2 cursor-pointer"
					>
						{label}
					</label>
					<span className="text-ellipsis overflow-hidden pr-14">
						{fileName}
					</span>
				</div>

				{!!handleSubmit && (
					<Button
						type="button"
						onClick={handleSubmit}
						variant="violet"
						disabled={fileName === "No file chosen..."}
					>
						Upload
					</Button>
				)}
			</div>
			<input
				className="hidden"
				aria-describedby="file_input_help"
				id={id}
				type="file"
				onChange={handleImageChange}
				{...{ accept, disabled, required }}
			/>
			{fileInputHelp && (
				<p className="mt-1 text-xs text-gray-500" id="file_input_help">
					{fileInputHelp}
				</p>
			)}
		</>
	);
};
export default FileUploadInput;
