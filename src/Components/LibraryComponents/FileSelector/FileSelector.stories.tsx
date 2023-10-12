import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './FileSelector.types';
import FileSelector from './FileSelector';

export default {
  title: 'FileSelector',
  parameters: {},
  component: FileSelector,
} as Meta;
const TemplatePrimary: Story<IProps> = (args) => <FileSelector {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  acceptedFileFormats: ['.jpg'],
  maximumSize: 1000,
  multiple: true,
  handleSave: (files) => {
    console.log(files);
  },
  onError: (error) => {
    console.log(error);
  },
  children: <div>Upload</div>,
} as IProps;
