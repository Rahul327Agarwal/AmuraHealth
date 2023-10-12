import { Meta, Story } from '@storybook/react';
import React from 'react';
import { PostSnippetHeader } from './PostSnippet';
import { PostSnippetHeaderProps } from './PostSnippet.types';
import { PostIcon } from './PostSnippetHeader.svg';
export default {
  title: 'New Library Components/PostSnippetHeader',
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
  component: PostSnippetHeader,
} as Meta;

const Template: Story<PostSnippetHeaderProps> = (args) => <PostSnippetHeader {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  content: 'Some Content text',
  handleToggleView: () => {},
  isHideView: false,
  icon: PostIcon,
};
