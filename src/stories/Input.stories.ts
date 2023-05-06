import type { Meta, StoryObj } from '@storybook/react';
import Input from '../components/basic/Input';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Modderize/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    type: "text",
    id: "defaultStory",
    name: "defaultStory",
    placeholder: "Type something...",
  },
};

export const Disabled: Story = {
    args: {
      type: "text",
      id: "disabledStory",
      name: "disabledStory",
      placeholder: "Type something...",
      disabled: true
    },
};

export const WithValue: Story = {
    args: {
      type: "text",
      id: "withValueStory",
      name: "withValueStory",
      placeholder: "Type something...",
      value: "Something was typed..."
    },
};