import React from 'react';
import { Story, Meta } from '@storybook/react';
import PostCard  from './PostCard';
import { IProps } from './PostCard.types';
export default {
  title: 'PanelComponents/Post Collections/Preview/PostCard/Primary',
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
  component: PostCard,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <PostCard {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  imageURL: '',
  name: 'Southwest tester',
  username: 'Southwest tester',
  userId: '@Amura',
  mainDescription: 'Mauris gravida suspendisse dolor posuere eid... ',
  postType: 'audio',
  totalPost: '7 posts',
};
