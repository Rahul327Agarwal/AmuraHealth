import React from 'react';
import { Story, Meta } from '@storybook/react';
import RoleCard  from './RoleCard';
import { IProps } from './RoleCard.types';

export default {
  title: 'LibraryComponents/RoleCard',
  component: RoleCard,
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

const TemplatePrimary: Story<IProps> = (args) => <RoleCard {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  roleName: 'Mid-Snr Physician',
  roleId: '01',
  // reportingTo: [
  //   {
  //     userName: 'Sarvanan Balakrishnan All',
  //     userId: 'a463bc09-53d6-49f5-a9e7-30fe3ecf7210',
  //   },
  // ],
  // reportees: [
  //   {
  //     userName: 'Sarvanan Balakrishnan All',
  //     userId: 'a463bc09-53d6-49f5-a9e7-30fe3ecf7210',
  //   },
  // ],
  // roleStartDate: new Date('Mon Apr 01 2022 16:44:08 GMT+0530 (India Standard Time)'),
  shiftSegments: [
    {
      segmentId: 'uuid',
      segmentName: 'Shift Segments',
      weekDays: [1, 3, 5],
      startDate: new Date('Mon Apr 01 2022 16:44:08 GMT+0530 (India Standard Time)'),
      endDate: new Date('Mon Apr 04 2022 16:44:08 GMT+0530 (India Standard Time)'),
      startTime: new Date('Mon Apr 01 2022 00:00:00 GMT+0530 (India Standard Time)'),
      endTime: new Date('Mon Apr 01 2022 23:59:59 GMT+0530 (India Standard Time)'),
      is_active: true,
      neverEnds: false,
    },
  ],
  // weekDays: [0, 1, 2, 3],
};
