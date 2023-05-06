/**
 * Assorted types that don't belong exclusively to a firebase document
 */

import {
	ReactElement,
	JSXElementConstructor,
	ReactFragment,
	ReactPortal
} from "react";

export type ModalViews = "login" | "signup" | "resetPassword";

export type ButtonVariants = // | "black"
	// | "white"
	// | "slate"
	| "grayOutline"
	| "grayOutline2"
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
	| "purple"
	| "noOutline";
// | "fuchsia"
// | "pink"
// | "rose";

export type LinkVariants =
	| "violet"
	| "indigo"
	| "blue"
	| "gray"
	| "white"
	| "lightViolet";

export type GameFormData = {
	gameID: string;
	image?: File;
	gameDisplayName: string;
};

export type Nullable<T> = T | null;

export type FunctionOutput =
	| string
	| number
	| ReactElement<any, string | JSXElementConstructor<any>>
	| ReactFragment
	| ReactPortal;
