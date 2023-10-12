import { Meta, Story } from '@storybook/react';
import React from 'react';
import PostManagementSummary  from './PostManagementSummary';
import { IProps } from './PostManagementSummary.types';
export default {
  title: 'PanelComponents/Post Management/Summary',
  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: '#FFFFFF' },
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
      ],
    },
  },
  component: PostManagementSummary,
} as Meta;

const Template: Story<IProps> = (args) => <PostManagementSummary {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
