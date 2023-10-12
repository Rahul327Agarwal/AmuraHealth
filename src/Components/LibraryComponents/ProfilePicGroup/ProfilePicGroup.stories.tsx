import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProfilePicGroup  from './ProfilePicGroup';

export default {
  title: 'LibraryComponents/ProfilePicGroup',
  component: ProfilePicGroup,
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

const TemplatePrimary: Story<any> = (args) => <ProfilePicGroup {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  data: [
    {
      id: 1,
      first_name: 'Kyle',
      last_name: 'Rachau',
      url: 'imagesURls',
    },
    {
      id: 2,
      first_name: 'Steve',
      last_name: 'Rogers',
      url: 'imagesURls',
    },
    {
      id: 3,
      first_name: 'Peter',
      last_name: 'Parker',
      url: 'imagesURls',
    },
    {
      id: 4,
      first_name: 'Bruce',
      last_name: 'Banner',
      url: 'imagesURls',
    },
    {
      id: 5,
      first_name: 'Diana',
      last_name: 'Prince',
      url: 'imagesURls',
    },
    {
      id: 6,
      first_name: 'Natasha',
      last_name: 'Romanova',
      url: 'imagesURls',
    },
    {
      id: 7,
      first_name: 'Clint',
      last_name: 'Barton',
      url: 'imagesURls',
    },
    {
      id: 8,
      first_name: 'James',
      last_name: 'Buchanan',
      url: 'imagesURls',
    },
    {
      id: 9,
      first_name: 'Tony',
      last_name: 'Stark',
      url: 'imagesURls',
    },
  ],
};
