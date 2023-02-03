import React, { MouseEventHandler } from "react";
import { PropsWithChildren } from "react";

const COLOR_VARIANTS = {
	blue: "bg-blue-600 hover:bg-blue-500 text-white",
	red: "bg-red-500 hover:bg-red-400 text-white",
	purple: "bg-purple-500 hover:bg-purple-500 text-white",
	indigo: "bg-indigo-500 hover:bg-indigo-500 text-white",
	violet: "bg-violet-500 hover:bg-violet-500 text-white",
	gray: "bg-gray-500 hover:bg-gray-400 text-white"
};

interface ButtonProps extends PropsWithChildren {
	cls?: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	variant: // | "black"
	// | "white"
	// | "slate"
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

const Button: React.FC<ButtonProps> = ({ children, onClick, variant, cls }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`inline-flex items-center rounded-md border border-transparent shadow-sm justify-center
                        px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${COLOR_VARIANTS[variant]} ${cls ? cls : ""}`}
		>
			{children}
		</button>
	);
};
export default Button;
