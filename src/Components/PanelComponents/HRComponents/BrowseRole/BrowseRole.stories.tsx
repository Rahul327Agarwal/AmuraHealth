import { ComponentMeta, ComponentStory } from '@storybook/react';
import BrowseRole  from './BrowseRole';
import React from 'react';

export default {
  title: 'PanelComponents/HRComponents/BrowseRole',
  component: BrowseRole,
  argTypes: { backgroundColor: { control: 'color' } },
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
} as ComponentMeta<typeof BrowseRole>;

const Template: ComponentStory<typeof BrowseRole> = (args) => <BrowseRole {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  // reportee:"Dibakar Banerjee",
  // role:"Senior Physician",
  // client:"DRBD Amura",

  // roleName: "Amura",
  // roleId: "Amura",
  // reportingTo: [
  //   { userId: "Amura", userName: "Dibakar Banerjee" },
  // ],
  // reportees: [
  //   { userId: "Amura", userName: "Kasturi Iyer" },
  //   { userId: "Apollo", userName: "Apollo" },
  // ],
  // roleStartDate: new Date(
  //   "Mon Apr 01 2022 16:44:08 GMT+0530 (India Standard Time)"
  // ),
  // shiftSegments: [
  //   {
  //     segmentId: "uuid",
  //     segmentName: "Shift Segments",
  //     weekDays: [1,3,5],
  //     startDate: new Date("Mon Apr 01 2022 16:44:08 GMT+0530 (India Standard Time)"),
  //     endDate: new Date("Mon Apr 04 2022 16:44:08 GMT+0530 (India Standard Time)"),
  //     startTime: new Date("Mon Apr 01 2022 00:00:00 GMT+0530 (India Standard Time)"),
  //     endTime: new Date("Mon Apr 01 2022 23:59:59 GMT+0530 (India Standard Time)"),
  //   },
  // ],

  // EventName: 'add-staff-role',
  roles: [
    {
      tenantId: 'amura',
      roleName: 'L1 - Intake Doctor',
      roleId: 'L1 - Intake Doctor',
      is_active: true,
      reportees: [
        {
          userName: 'Manohar  MM',
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'L2 - Intake Doctor',
        },
      ],
      reportingTo: [
        {
          userName: 'Manohar  Menum',
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'L2 - Intake Doctor',
        },
      ],
      shiftSegments: [
        {
          is_active: true,
          weekDays: [2],
          endDate: null,
          segmentId: '4b78cfa6-3efd-4e52-8614-cb305adde6ee',
          startTime: '2022-09-14T18:30:00.000Z',
          neverEnds: true,
          endTime: '2022-09-15T18:30:00.000Z',
          segmentName: 'mm',
          startDate: '2022-09-15T11:42:54.010Z',
        },
      ],
      action: 'UPDATE',
    },
    {
      tenantId: 'amura',
      roleName: 'L1 - Intake Doctor',
      roleId: 'L1 - Intake Doctor',
      is_active: true,
      reportees: [
        {
          userName: 'Manohar  MM',
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'L2 - Intake Doctor',
        },
      ],
      reportingTo: [
        {
          userName: 'Manohar  Menum',
          userId: '948aee3d-6712-48a9-a03b-c926f5f99915',
          roleId: 'L2 - Intake Doctor',
        },
      ],
      shiftSegments: [
        {
          is_active: true,
          weekDays: [2],
          endDate: null,
          segmentId: '4b78cfa6-3efd-4e52-8614-cb305adde6ee',
          startTime: '2022-09-14T18:30:00.000Z',
          neverEnds: true,
          endTime: '2022-09-15T18:30:00.000Z',
          segmentName: 'mm',
          startDate: '2022-09-15T11:42:54.010Z',
        },
      ],
      action: 'UPDATE',
    },
  ],
  // userId: '781c9530-f3e1-45b9-9a84-2f42fcf138b9',
  // tenantId: 'amura',
};
