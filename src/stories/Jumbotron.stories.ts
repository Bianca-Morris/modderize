import type { Meta, StoryObj } from "@storybook/react";
import Jumbotron from "../components/basic/Jumbotron";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Modderize/Jumbotron",
	component: Jumbotron,
	tags: ["autodocs"]
} satisfies Meta<typeof Jumbotron>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonArgs = { title: "I am important text" };

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
	args: {
		...commonArgs
	}
};

export const WithSubtitle: Story = {
	args: {
		...commonArgs,
		subtitle: "And I am somewhat less important text"
	}
};

export const WithChildren: Story = {
	args: {
		...commonArgs,
		children: "Children go here"
	}
};
