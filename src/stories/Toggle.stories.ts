import type { Meta, StoryObj } from "@storybook/react";
import Toggle from "../components/basic/Toggle";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Modderize/Toggle",
	component: Toggle,
	tags: ["autodocs"]
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
	args: {
		value: false
	}
};

export const Enabled: Story = {
	args: {
		value: true
	}
};

export const Loading: Story = {
	args: {
		loading: true
	}
};

export const WithLabel: Story = {
	args: {
		label: "I am a toggle"
	}
};
