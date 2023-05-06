import type { Meta, StoryObj } from "@storybook/react";
import H2 from "../components/basic/typography/H2";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Modderize/H2",
	component: H2,
	tags: ["autodocs"]
} satisfies Meta<typeof H2>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
	args: {
		children: "I am a second tier header"
	}
};
