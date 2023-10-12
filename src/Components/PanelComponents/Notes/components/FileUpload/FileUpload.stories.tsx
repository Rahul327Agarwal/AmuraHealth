import { Meta, Story } from '@storybook/react';
import React from 'react';
import FileUpload  from './FileUpload';
import { IProps } from './FileUpload.types';
export default {
  title: 'Library Components/Chat Components/FileUploadNew',

  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
  component: FileUpload,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <FileUpload {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  files: [],
  handleSave: (files) => {},
  rerenderFlag: false,
  multiple: true,
};
