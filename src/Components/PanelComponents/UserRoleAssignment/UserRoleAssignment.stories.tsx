import React from 'react';
import { Story, Meta } from '@storybook/react';
import UserRoleAssignment from './UserRoleAssignmentNew';
import { IProps } from './UserRoleAssignment.types';

export default {
  title: 'PanelComponents/UserRoleAssignment',
  component: UserRoleAssignment,
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
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <UserRoleAssignment {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  roleName: 'Amura',
  roleId: 'Amura',
  reportsTo: [
    { userId: 'Amura', userName: 'Amura' },
    { userId: 'Apollo', userName: 'Apollo' },
    { userId: 'Saturn', userName: 'Saturn' },
    { userId: 'Chennai', userName: 'Chennai' },
  ],
  reportees: [
    { userId: 'Amura', userName: 'Amura' },
    { userId: 'Apollo', userName: 'Apollo' },
  ],
  // roleStartDate: new Date(
  //   "Mon Apr 01 2022 16:44:08 GMT+0530 (India Standard Time)"
  // ),
  shiftSegments: [],
  // weekDays: [0, 1, 2, 3],
};
