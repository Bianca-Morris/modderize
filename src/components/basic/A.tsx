import Link from "next/link";
import React, { DOMAttributes, PropsWithChildren } from "react";
import { classNames } from "../../helpers";
import { ButtonVariants, LinkVariants } from "../../types/misc";
import { BUTTON_STYLE, COLOR_VARIANTS as BUTTON_VARIANTS } from "./Button";

export const LINK_STYLE = "underline cursor-pointer";

export const COLOR_VARIANTS = {
	lightViolet: "text-violet-300 hover:text-indigo-400",
	violet: "text-violet-700 hover:text-violet-500",
	indigo: "text-indigo-800 hover:text-indigo-600",
	blue: " ",
	gray: "text-gray-500 hover:text-gray-300",
	white: "text-white hover:text-gray-200"

	// blue: "bg-blue-600 enabled:hover:bg-blue-500 text-white",
	// red: "bg-red-500 enabled:hover:bg-red-400 text-white",
	// purple: "bg-purple-500 enabled:hover:bg-purple-400 text-white",
	// indigo: "bg-indigo-500 enabled:hover:bg-indigo-400 text-white",
	// violet: "bg-violet-500 enabled:hover:bg-violet-400 text-white",
	// gray: "bg-gray-500 enabled:hover:bg-gray-400 text-white",
	// grayOutline:
	// 	"bg-transparent text-gray-900 border-gray-300 enabled:hover:border-gray-200",
	// grayOutline2:
	// 	"bg-transparent text-white text-gray-400 border-gray-500 enabled:hover:border-gray-400 border-2 px-4 py-1",
	// noOutline: "bg-transparent text-gray-500"
};

interface AProps extends PropsWithChildren {
	linkType?: "button" | "link"; // Style as button or link
	tagType?: "Link" | "a"; // Render as NextJS "<Link>" or as an JSX "<a>"
	id?: string;
	href?: string | object;
	replace?: boolean;
	prefetch?: boolean;
	passHref?: boolean;
	scroll?: boolean;
	shallow?: boolean;
	target?: string;
	rel?: string;
	// locale?: string | boolean; // @TODO get this to work
	noreferrer?: string;
	cls?: string;
	variant: ButtonVariants | LinkVariants;
	onClick?: React.MouseEventHandler;
}

const A: React.FC<AProps> = ({
	children,
	id,
	linkType = "link",
	tagType = "Link",
	href,
	replace = false,
	prefetch = true,
	passHref = false,
	scroll = true,
	shallow = false,
	// locale = false,
	noreferrer = "",
	cls = "",
	variant,
	target,
	rel,
	onClick
}) => {
	// Decide whether to show as button or link
	let linkClass = "";
	if (linkType === "button") {
		linkClass = classNames(linkClass, BUTTON_STYLE);
		linkClass = classNames(linkClass, BUTTON_VARIANTS[variant]);
	} else {
		linkClass = classNames(linkClass, LINK_STYLE);
		linkClass = classNames(linkClass, COLOR_VARIANTS[variant]);
	}

	if (tagType === "Link" && href) {
		return (
			<Link
				className={`${cls} ${linkClass}`}
				{...{
					id,
					href,
					replace,
					prefetch,
					passHref,
					scroll,
					shallow
				}}
			>
				{children}
			</Link>
		);
	}

	if (typeof href !== "string" && !!href)
		throw new Error(
			"<A> must be passed a string 'href' if configured as '<a>' tag."
		);

	return (
		<a
			{...{ href, id, noreferrer, target, rel, onClick }}
			className={`${cls} ${linkClass}`}
		>
			{children}
		</a>
	);
};
export default A;
