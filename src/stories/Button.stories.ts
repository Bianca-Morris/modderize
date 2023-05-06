import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/basic/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Modderize/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonArgs = { children: "Click me!" }

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Purple: Story = {
  args: {
    variant: "purple",
    ...commonArgs
  },
};

export const Disabled: Story = {
  args: {
    variant: "purple",
    disabled: true,
    ...commonArgs,
  },
};

export const Loading: Story = {
  args: {
    variant: "purple",
    loading: true,
    ...commonArgs
  },
};

export const Violet: Story = {
  args: {
    ...commonArgs,
    variant: "violet"
  },
};

export const Blue: Story = {
  args: {
    ...commonArgs,
    variant: "blue"
  },
};

export const Indigo: Story = {
  args: {
    ...commonArgs,
    variant: "indigo"
  },
};

export const Gray: Story = {
  args: {
    ...commonArgs,
    variant: "gray"
  }
}


export const GrayOutline: Story = {
  args: {
    ...commonArgs,
    variant: "grayOutline"
  }
}


export const GrayOutline2: Story = {
  args: {
    ...commonArgs,
    variant: "grayOutline2"
  }
}

export const NoOutline: Story = {
  args:{
    ...commonArgs,
    variant: "noOutline"
  }
}
