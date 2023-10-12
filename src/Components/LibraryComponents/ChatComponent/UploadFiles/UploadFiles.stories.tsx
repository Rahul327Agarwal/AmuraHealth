import React from 'react';
import { Story, Meta } from '@storybook/react';
import UploadFiles  from './UploadFiles';
import { IProps } from './UploadFiles.types';

export default {
  title: 'LibraryComponents/ChatComponent/UploadFiles',
  component: UploadFiles,
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
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <UploadFiles {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  // onFileChange: () => {},
};
