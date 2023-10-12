import { Meta, Story } from '@storybook/react';
import React from 'react';
import PostPreview  from './postPreview';
import { IProps } from './Preview.types';
export default {
  title: 'PanelComponents/Post Collections/Preview/PostPreview',
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
  component: PostPreview,
} as Meta;

const Template: Story<IProps> = (args) => <PostPreview {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
