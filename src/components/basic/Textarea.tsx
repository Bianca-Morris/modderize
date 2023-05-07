import React from "react";

type TextareaProps = {
	id: string;
	name: string;
	placeholder: string;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
	value?: string;
	required?: boolean;
	disabled?: boolean;
	cls?: string;
	wrapperCls?: string;
	rows?: number;
};

const Textarea: React.FC<TextareaProps> = ({
	placeholder,
	name,
	id,
	onChange,
	value,
	required,
	disabled,
	cls = "",
	wrapperCls,
	rows
}) => {
	return (
		<div className={"relative mt-1 rounded-md shadow-sm " + wrapperCls}>
			<textarea
				className={
					"placeholder:text-gray-400 block w-full rounded-md border-gray-300 px-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm " +
					cls
				}
				{...{
					rows,
					value,
					onChange,
					name,
					id,
					placeholder,
					required,
					disabled
				}}
			/>
		</div>
	);
};
export default Textarea;
