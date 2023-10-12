import { ComponentMeta, ComponentStory } from '@storybook/react';
import RoleCard  from './RoleCard';
import React from 'react';

export default {
  title: 'PanelComponents/HRComponents/RoleCard',
  component: RoleCard,
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
} as ComponentMeta<typeof RoleCard>;

const Template: ComponentStory<typeof RoleCard> = (args) => <RoleCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  roleName: 'Mid-Snr Physician',
  roleId: '01',
  // reportsTo: 'Snr Physician | Dibakar',
  // reportees: 'Intern | Kasturi (KRI675)',
  // roleStartDate: new Date('Mon Apr 01 2022 16:44:08 GMT+0530 (India Standard Time)'),
  shiftSegments: [
    // {
    //   segmentId: 'uuid',
    //   segmentName: 'Shift Segments',
    //   weekDays: [0, 1, 2, 3],
    //   startDate: new Date('Mon Apr 01 2022 16:44:08 GMT+0530 (India Standard Time)'),
    //   endDate: new Date('Mon Apr 04 2022 16:44:08 GMT+0530 (India Standard Time)'),
    //   startTime: new Date('Mon Apr 01 2022 00:00:00 GMT+0530 (India Standard Time)'),
    //   endTime: new Date('Mon Apr 01 2022 23:59:59 GMT+0530 (India Standard Time)'),
    // },
  ],
  // weekDays: [0, 1, 2, 3],
};
