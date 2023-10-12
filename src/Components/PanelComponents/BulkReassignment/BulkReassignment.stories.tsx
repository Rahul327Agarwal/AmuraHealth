import { Meta, Story } from '@storybook/react';
import React from 'react';
import BulkReassignmentHome from './BulkReassignment';
import { IProps } from './BulkReassignment.types';

export default {
  title: 'My Page Panel/MyPagePanel',
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
  component: BulkReassignmentHome,
} as Meta;

const Template: Story<IProps> = (args) => <BulkReassignmentHome {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  panel: { height: '1000px' },
};
