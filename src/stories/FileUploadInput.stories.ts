import type { Meta, StoryObj } from '@storybook/react';
import FileUploadInput from '../components/basic/FileUploadInput';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Modderize/FileUploadInput',
  component: FileUploadInput,
  tags: ['autodocs'],
} satisfies Meta<typeof FileUploadInput>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
};

export const WithSubmitButton: Story = {
    args: {
      handleSubmit: () => (console.log("Submitted!"))
    },
};

export const NoFileInputHelp: Story = {
    args: {
        fileInputHelp: ""
    }
}