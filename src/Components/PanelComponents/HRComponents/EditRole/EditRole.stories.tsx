import { ComponentMeta, ComponentStory } from '@storybook/react';
import EditRole  from './EditRole';
import React from 'react';

export default {
  title: 'PanelComponents/HRComponents/EditRole',
  component: EditRole,
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
} as ComponentMeta<typeof EditRole>;

const Template: ComponentStory<typeof EditRole> = (args) => <EditRole {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  // reportee: 'Dibakar Banerjee',
  role: 'Senior Physician',
  client: 'DRBD Amura',

  roleName: 'Amura',
  roleId: 'Amura',
  reportingTo: [{ userId: 'Amura', userName: 'Dibakar Banerjee' }],
  reportees: [
    { userId: 'Amura', userName: 'Kasturi Iyer' },
    { userId: 'Apollo', userName: 'Apollo' },
  ],
  // roleStartDate: new Date('Mon Apr 01 2022 16:44:08 GMT+0530 (India Standard Time)'),
  shiftSegments: [
    // {
    //   segmentId: 'uuid',
    //   segmentName: 'Shift Segments',
    //   weekDays: [1, 3, 5],
    //   startDate: new Date('Mon Apr 01 2022 16:44:08 GMT+0530 (India Standard Time)'),
    //   endDate: new Date('Mon Apr 04 2022 16:44:08 GMT+0530 (India Standard Time)'),
    //   startTime: new Date('Mon Apr 01 2022 00:00:00 GMT+0530 (India Standard Time)'),
    //   endTime: new Date('Mon Apr 01 2022 23:59:59 GMT+0530 (India Standard Time)'),
    // },
  ],
};
