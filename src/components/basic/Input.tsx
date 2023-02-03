import React from "react";

type InputProps = {
	type: "text" | "password";
	id: string;
	name: string;
	placeholder: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	value?: string;
	required?: boolean;
};

const Input: React.FC<InputProps> = ({
	type,
	placeholder,
	name,
	id,
	onChange,
	value,
	required
}) => {
	return (
		<div className="relative mt-1 rounded-md shadow-sm">
			<input
				className="block w-full rounded-md border-gray-300 px-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				{...{ value, onChange, name, id, type, placeholder, required }}
			/>
		</div>
	);
};
export default Input;
