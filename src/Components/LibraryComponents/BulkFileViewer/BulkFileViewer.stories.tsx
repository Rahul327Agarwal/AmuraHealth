import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './BulkFileViewer.types';
import BulkFileViewer from './BulkFileViewer';
export default {
  title: 'BulkFileViewer',
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
  component: BulkFileViewer,
} as Meta;
const TemplatePrimary: Story<IProps> = (args) => <BulkFileViewer {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  files: [],
};
