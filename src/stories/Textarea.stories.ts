import type { Meta, StoryObj } from '@storybook/react';
import Textarea from '../components/basic/Textarea';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Modderize/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;


const commonProps = { placeholder: "Put some text in me!" }

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    id: "default-textarea",
    name: "default-textarea",
    ...commonProps
  },
};

export const Disabled: Story = {
    args: {
      id: "disabled-textarea",
      name: "disabled-textarea",
      disabled: true,
      ...commonProps
    },
};

export const WithFourRows: Story = {
    args: {
        id: "with4rows-textarea",
        name: "with4rows-textarea",
        rows: 4,
        ...commonProps
    }
}

export const WithText: Story = {
    args: {
        id: "withtext-textarea",
        name: "withtext-textarea",
        value: `Lorem ipsum dolor sit amet. Et quia tempora sit
        culpa obcaecati et dignissimos tempora. Vel
        molestiae blanditiis et necessitatibus blanditiis
        qui nisi eligendi. Sit totam nihil non mollitia
        repellat et asperiores dolores est ipsum molestias.
        Hic quidem praesentium aut dolor commodi in quasi
        saepe eos quis modi et eveniet facilis id asperiores
        architecto!
        
        Lorem ipsum dolor sit amet. Et quia tempora sit
							culpa obcaecati et dignissimos tempora. Vel
							molestiae blanditiis et necessitatibus blanditiis
							qui nisi eligendi. Sit totam nihil non mollitia
							repellat et asperiores dolores est ipsum molestias.
							Hic quidem praesentium aut dolor commodi in quasi
							saepe eos quis modi et eveniet facilis id asperiores
							architecto!`,
        ...commonProps
    }
}