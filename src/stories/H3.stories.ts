import type { Meta, StoryObj } from '@storybook/react';
import H3 from '../components/basic/typography/H3';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Modderize/H3',
  component: H3,
  tags: ['autodocs'],
} satisfies Meta<typeof H3>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: "I am a third tier header"
  },
};