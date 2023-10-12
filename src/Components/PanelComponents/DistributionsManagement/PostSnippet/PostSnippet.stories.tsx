import { Meta, Story } from '@storybook/react';
import React from 'react';
import { PostSnippet } from './PostSnippet';
import { PostSnippetProps } from './PostSnippet.types';
export default {
  title: 'New Library Components/PostSnippet',
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
  component: PostSnippet,
} as Meta;

const Template: Story<PostSnippetProps> = (args) => <PostSnippet {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  title: 'header title',
  content: 'Some Content text',
  handleToggleView: () => {},
  isHideView: false,
};
