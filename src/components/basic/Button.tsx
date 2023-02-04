import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React, { MouseEventHandler } from "react";

import { PropsWithChildren } from "react";

const WITHOUT_OUTLINE = " border-transparent px-4 py-2";
const WITH_OUTLINE = " border-2 px-3 py-1";

const COLOR_VARIANTS = {
	blue: "bg-blue-600 hover:bg-blue-500 text-white" + WITHOUT_OUTLINE,
	red: "bg-red-500 hover:bg-red-400 text-white" + WITHOUT_OUTLINE,
	purple: "bg-purple-500 hover:bg-purple-500 text-white" + WITHOUT_OUTLINE,
	indigo: "bg-indigo-500 hover:bg-indigo-500 text-white" + WITHOUT_OUTLINE,
	violet: "bg-violet-500 hover:bg-violet-500 text-white" + WITHOUT_OUTLINE,
	gray: "bg-gray-500 hover:bg-gray-400 text-white" + WITHOUT_OUTLINE,
	grayOutline:
		"bg-transparent text-gray-900 border-gray-300 hover:border-gray-200" +
		WITH_OUTLINE
};

interface ButtonProps extends PropsWithChildren {
	cls?: string;
	type?: "button" | "submit";
	onClick?: React.MouseEventHandler<HTMLButtonElement>; // Not entirely necessary when submittnig forms
	disabled?: boolean;
	loading?: boolean;
	variant: // | "black"
	// | "white"
	// | "slate"
	| "grayOutline"
		| "gray"
		// | "zinc"
		// | "neutral"
		// | "stone"
		| "red"
		// | "orange"
		// | "amber"
		// | "yellow"
		// | "lime"
		// | "green"
		// | "emerald"
		// | "teal"
		// | "cyan"
		// | "sky"
		| "blue"
		| "indigo"
		| "violet"
		| "purple";
	// | "fuchsia"
	// | "pink"
	// | "rose";
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
			className={`inline-flex items-center rounded-md shadow-sm justify-center
                        text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${COLOR_VARIANTS[variant]} ${cls ? cls : ""}`}
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
