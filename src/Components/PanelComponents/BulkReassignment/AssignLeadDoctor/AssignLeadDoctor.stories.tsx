import { Meta, Story } from '@storybook/react';
import React from 'react';
import AssignLeadDoctor from './AssignLeadDoctor';
//import { AssignLeadDoctorProps } from "./AssignLeadDoctor.types";
export default {
  title: 'Team Assignment/AssignLeadDoctor',
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
  component: AssignLeadDoctor,
} as Meta;

// const Template: Story<AssignLeadDoctorProps> = (args) => <AssignLeadDoctor {...args} />;
// export const Primary = Template.bind({});
