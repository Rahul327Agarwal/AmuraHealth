import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProfileCard  from './Profile';
import { IProps } from './ProfileCard.types';
export default {
  title: 'LibraryComponents/ProfileCard',
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
  component: ProfileCard,
} as Meta;

const Template: Story<IProps> = (args) => <ProfileCard {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  userName: 'Cody Fisher',
  ratingValue: '4.8',
  progressValue: '50',
  progreesColor: '#0096C7',
};
