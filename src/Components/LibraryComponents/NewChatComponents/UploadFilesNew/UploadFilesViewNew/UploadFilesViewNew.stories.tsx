import { Meta, Story } from '@storybook/react';
import React from 'react';
import UploadFilesViewNew from './UploadFilesViewNew';
import { IProps } from './UploadFilesViewNew.types.';
export default {
  title: 'LibraryComponents/New Chat Components/UploadFilesViewNew',
  parameters: {
    backgrounds: {
      default: 'Panel',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
  component: UploadFilesViewNew,
} as Meta;
const TemplatePrimary: Story<IProps> = (args) => <UploadFilesViewNew {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  files: [],
};
