import type { Meta, StoryObj } from '@storybook/react';
import H1 from '../components/basic/typography/H1';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Modderize/H1',
  component: H1,
  tags: ['autodocs'],
} satisfies Meta<typeof H1>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: "I am a first tier header"
  },
};