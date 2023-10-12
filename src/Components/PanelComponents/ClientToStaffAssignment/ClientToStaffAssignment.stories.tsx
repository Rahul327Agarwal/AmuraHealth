import { Meta, Story } from '@storybook/react';
import React from 'react';
import UserListView from './ClientToStaffAssignment';
//import { AssignLeadDoctorProps } from "./AssignLeadDoctor.types";
export default {
  title: 'UserListView',
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
  component: UserListView,
} as Meta;

const Template: Story<any> = (args) => <UserListView {...args} />;
export const Primary = Template.bind({});
