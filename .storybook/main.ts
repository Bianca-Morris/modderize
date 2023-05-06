import type { StorybookConfig } from "@storybook/react-webpack5";
const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		{
			name: '@storybook/addon-styling',
			options: {
			  postCss: true,
			}
		},
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {}
	},
	docs: {
		autodocs: "tag"
	},
	webpackFinal: async (config) => {
		config?.module?.rules?.push({
		  test: /\.scss$/,
		  use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
		});
	
		return config;
	  },
};
export default config;
