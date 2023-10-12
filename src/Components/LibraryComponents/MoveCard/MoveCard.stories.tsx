import React from 'react';
import { Story, Meta } from '@storybook/react';
import MoveCard from './MoveCard';
import { IProps } from './MoveCard.types';
export default {
  title: 'New Library Components/MoveCard',
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
  component: MoveCard,
} as Meta;

const users = [
  {
    label: 'Kyle Rachau',
    value: 'Manage statuses',
    avatarUrl: 'urlstring',
  },
  {
    label: 'Steve Rogers',
    value: 'Steve Rogers',
    avatarUrl: 'urlstring',
  },
  {
    label: 'Peter Parker',
    value: 'Peter Parker',
    avatarUrl: 'urlstring',
  },
  {
    label: 'Bruce Banner',
    value: 'Bruce Banner',
    avatarUrl: 'urlstring',
  },
];

const TemplatePrimary: Story<IProps> = (args) => <MoveCard {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  cardData: {
    ID: 'ec7f0583-4cef-408d-a999-f30820883419',
    tenantId: 'amura',
    user_created_on: '2022-07-06T08:55:14.060Z',
    status: [{ statusType: 'edgeColor', current_status: 'V1', previous_status: '' }],
    userInfo: { Name: '', username: 'Aradhana Mehta', FirstName: 'Aradhana', LastName: 'Mehta' },
    Owner: { userId: '3ea11d64-0fa9-4f07-9787-dffbaa3acc65', userName: 'Manidhar Sunkara +919x464' },
    bluedot: {},
    protocol: {},
    SLA: {
      StartTime: '2023-03-17T08:54:50.552Z',
      EndTime: '2023-03-18T05:54:50.552Z',
      Title: 'Client status change',
      CreatedTime: '2023-03-17T08:54:50.552Z',
    },
    roleId: 'amura_guidance_counselor_level2',
    leaveType: 'Sick Leave',
    leaveDesription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    leaveFrom: '2022-07-06T08:55:14.060Z',
    leaveTo: '2022-07-10T08:55:14.060Z',
  },
  showBlueDot: true,
  isExtend: true,
  noThreeDot: false,
  isBorderRadius: false,
  isSelected: false,
  handleSelect: () => {},
  openClient: () => {},
  setSelectedCard: () => {},
  setAction: () => {},
  // message: {
  //   message: "hey, hi? R u there?",
  //   receivedTime: "09:25 AM"
  // }
};
