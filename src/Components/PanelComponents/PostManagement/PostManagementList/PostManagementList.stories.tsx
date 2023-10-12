import { Meta, Story } from '@storybook/react';
import React from 'react';
import PostManagementList  from './PostManagementList';
import { PostManagementListProps } from './PostManagementList.types';

export default {
  title: 'PanelComponents/Post Management/Post Management List',
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
  component: PostManagementList,
} as Meta;

const Template: Story<PostManagementListProps> = (args) => <PostManagementList {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  panel: { height: '1000px' },
};
