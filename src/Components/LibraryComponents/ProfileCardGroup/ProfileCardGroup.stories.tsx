import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProfileCardGroup  from './ProfileCardGroup';
import { ProfileCardGroupProps, ProfileCardProps } from './ProfileCardGroup.types';
export default {
  title: 'LibraryComponents/ProfileCardGroup',
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
  component: ProfileCardGroup,
} as Meta;

const Template: Story<ProfileCardGroupProps> = (args) => <ProfileCardGroup {...args} />;
export const Primary = Template.bind({});
const profileLists: ProfileCardProps[] = [
  {
    id: '1',
    profileName: 'Cody Fisher',
    ratingValue: '4.8',
    progressValue: 25,
    progreesColor: '#0096C7',
    isSelected: false,
    handleSelect: () => {},
  },
  {
    id: '2',
    profileName: 'Jane Cooper',
    ratingValue: '4.8',
    progressValue: 25,
    progreesColor: '#F3752B',
    isSelected: false,
    handleSelect: () => {},
  },
  {
    id: '3',
    profileName: 'Mark Spencer',
    ratingValue: '4.8',
    progressValue: 30,
    progreesColor: '#DA5552',
    isSelected: false,
    handleSelect: () => {},
  },
  {
    id: '4',
    profileName: 'Theresa Webb',
    ratingValue: '4.8',
    progressValue: 45,
    progreesColor: '#52B788',
    isSelected: false,
    handleSelect: () => {},
  },
];
Primary.args = {
  profileLists,
};
