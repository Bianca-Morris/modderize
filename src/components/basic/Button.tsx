import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React, { MouseEventHandler } from "react";

import { PropsWithChildren } from "react";
import { ButtonVariants } from "../../types/misc";

export const BUTTON_STYLE =
	"inline-flex items-center rounded-md shadow-sm justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25";

const WITHOUT_OUTLINE = " border-transparent px-4 py-2";
const WITH_OUTLINE = " border-2 px-3 py-1";

export const COLOR_VARIANTS = {
	blue: "bg-blue-600 enabled:hover:bg-blue-500 text-white" + WITHOUT_OUTLINE,
	red: "bg-red-500 enabled:hover:bg-red-400 text-white" + WITHOUT_OUTLINE,
	purple:
		"bg-purple-500 enabled:hover:bg-purple-400 text-white" +
		WITHOUT_OUTLINE,
	indigo:
		"bg-indigo-500 enabled:hover:bg-indigo-400 text-white" +
		WITHOUT_OUTLINE,
	violet:
		"bg-violet-500 enabled:hover:bg-violet-400 text-white" +
		WITHOUT_OUTLINE,
	gray: "bg-gray-500 enabled:hover:bg-gray-400 text-white" + WITHOUT_OUTLINE,
	grayOutline:
		"bg-transparent text-gray-900 border-gray-300 enabled:hover:border-gray-200" +
		WITH_OUTLINE,
	grayOutline2:
		"bg-transparent text-white text-gray-400 border-gray-500 enabled:hover:border-gray-400 border-2 px-4 py-1",
	noOutline: "bg-transparent text-gray-500" + WITHOUT_OUTLINE
};

interface ButtonProps extends PropsWithChildren {
	cls?: string;
	type?: "button" | "submit";
	onClick?: React.MouseEventHandler<HTMLButtonElement>; // Not entirely necessary when submittnig forms
	disabled?: boolean;
	loading?: boolean;
	variant: ButtonVariants;
}

const Button: React.FC<ButtonProps> = ({
	type = "button",
	disabled = false,
	children,
	onClick,
	variant,
	loading,
	cls
}) => {
	return (
		<button
			{...{ type, disabled }}
			onClick={onClick}
			className={`${BUTTON_STYLE} ${COLOR_VARIANTS[variant]} ${
				cls ? cls : ""
			}`}
		>
			{loading ? (
				<div className="animate-spin" role="status">
					<ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
					<span className="sr-only">Loading...</span>
				</div>
			) : (
				children
			)}
		</button>
	);
};
export default Button;
