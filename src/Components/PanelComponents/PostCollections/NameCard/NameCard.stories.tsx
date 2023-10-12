import React from 'react';
import { Story, Meta } from '@storybook/react';
import NameCard  from './NameCard';
import { IProps } from './NameCard.types';
export default {
  title: 'PanelComponents/Post Collections/NameCard',
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
  component: NameCard,
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

const TemplatePrimary: Story<IProps> = (args) => <NameCard {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  cardData: {
    ID: 'ec7f0583-4cef-408d-a999-f30820883419',
    tenantId: 'amura',
    user_created_on: '2022-07-06T08:55:14.060Z',
    status: [{ statusType: 'edgeColor', current_status: 'New', previous_status: '' }],
    userInfo: { Name: '', username: 'Deepa Balajee +919x472', FirstName: 'Deepa', LastName: 'Balajee' },
    Owner: { userId: '3ea11d64-0fa9-4f07-9787-dffbaa3acc65', userName: 'Manidhar Sunkara +919x464' },
    bluedot: {},
    protocol: {},
    SLA: { StartTime: 1657022126539, EndTime: 1657108526539, Title: 'Client status change', CreatedTime: 1657097726501 },
    roleId: 'amura_guidance_counselor_level2',
  },
  isExtend: false,
  noThreeDot: false,
  isBorderRadius: false,
  isSelected: false,
  handleSelect: () => {},
  openClient: () => {},
  setSelectedCard: () => {},
  setAction: () => {},
  // message: {
  //   message: 'hey, hi? R u there?',
  //   receivedTime: '09:25 AM',
  // },
};
