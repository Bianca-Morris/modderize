import type { Meta, StoryObj } from "@storybook/react";
import { Children } from "react";
import Alert from "../components/basic/Alert";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Modderize/Alert",
	component: Alert,
	tags: ["autodocs"]
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonProps = { title: "This is a title" };

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Info: Story = {
	args: {
		...commonProps,
		variant: "info"
	}
};

export const Danger: Story = {
	args: {
		...commonProps,
		variant: "danger"
	}
};

export const Success: Story = {
	args: {
		...commonProps,
		variant: "success"
	}
};

export const Warning: Story = {
	args: {
		...commonProps,
		variant: "warning"
	}
};

export const Dark: Story = {
	args: {
		...commonProps,
		variant: "dark"
	}
};

export const WithSubtitle: Story = {
	args: {
		...commonProps,
		variant: "info",
		subtitle: "This, however, is a subtitle"
	}
};

export const WithInfoIcon: Story = {
	args: {
		...commonProps,
		variant: "info",
		iconType: "info",
		showIcon: true
	}
};

export const WithWarningIcon: Story = {
	args: {
		...commonProps,
		variant: "info",
		iconType: "warning",
		showIcon: true
	}
};
