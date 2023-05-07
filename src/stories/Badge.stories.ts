import type { Meta, StoryObj } from "@storybook/react";
import Badge from "../components/basic/Badge";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Modderize/Badge",
	component: Badge,
	tags: ["autodocs"]
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonProps = { children: "I am a badge"}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Gray: Story = {
	args: {
		...commonProps,
		variant: "gray",
	}
};

export const Red: Story = {
	args: {
		...commonProps,
		variant: "red",
	}
};

export const Pink: Story = {
	args: {
		...commonProps,
		variant: "pink",
	}
};

export const Purple: Story = {
	args: {
		...commonProps,
		variant: "purple",
	}
};

export const Indigo: Story = {
	args: {
		...commonProps,
		variant: "indigo",
	}
};

export const Blue: Story = {
	args: {
		...commonProps,
		variant: "blue",
	}
};

export const Green: Story = {
	args: {
		...commonProps,
		variant: "green",
	}
};

export const Yellow: Story = {
	args: {
		...commonProps,
		variant: "yellow",
	}
};
