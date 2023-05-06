import "../build.css";
// import "../src/styles/globals.css";
// import "../styles/globals.css";
import React from "react";

import type { Preview } from "@storybook/react";

import * as nextImage from "next/image";

Object.defineProperty(nextImage, "default", {
	configurable: true,
	value: (props) => React.createElement("img", {...props})
});

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" }
};

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		}
	}
};

export default preview;
