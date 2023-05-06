import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "../components/basic/Dropdown";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Modderize/Dropdown",
	component: Dropdown,
	tags: ["autodocs"]
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
	args: {
		title: "I am a dropdown!",
		children: "Peek-a-boo"
	}
};
