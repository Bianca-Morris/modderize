import type { Meta, StoryObj } from "@storybook/react";
import A from "../components/basic/A";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Modderize/A",
	component: A,
	tags: ["autodocs"]
} satisfies Meta<typeof A>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonProps = { children: "I am a link..." };

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LightViolet: Story = {
	args: {
		...commonProps,
		variant: "lightViolet"
	}
};

export const Violet: Story = {
	args: {
		...commonProps,
		variant: "violet"
	}
};

export const Indigo: Story = {
	args: {
		...commonProps,
		variant: "indigo"
	}
};

export const Blue: Story = {
	args: {
		...commonProps,
		variant: "blue"
	}
};

export const Gray: Story = {
	args: {
		...commonProps,
		variant: "gray"
	}
};

export const White: Story = {
	args: {
		...commonProps,
		variant: "white"
	}
};

export const LightVioletButton: Story = {
	args: {
		...commonProps,
		linkType: "button",
		variant: "lightViolet"
	}
};

export const VioletButton: Story = {
	args: {
		...commonProps,
		linkType: "button",
		variant: "violet"
	}
};

export const IndigoButton: Story = {
	args: {
		...commonProps,
		linkType: "button",
		variant: "indigo"
	}
};

export const BlueButton: Story = {
	args: {
		...commonProps,
		linkType: "button",
		variant: "blue"
	}
};

export const GrayButton: Story = {
	args: {
		...commonProps,
		linkType: "button",
		variant: "gray"
	}
};

export const WhiteButton: Story = {
	args: {
		...commonProps,
		linkType: "button",
		variant: "white"
	}
};
