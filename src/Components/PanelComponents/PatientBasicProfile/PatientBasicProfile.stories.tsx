import React from 'react';
import { Story, Meta } from '@storybook/react';
import PatientBasicProfile from './PatientBasicProfile';
import { IPatientBasicProfile } from './PatientBasicProfile.types';

export default {
  title: 'PanelComponents/PatientBasicProfile',
  component: PatientBasicProfile,
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

const TemplatePrimary: Story<IPatientBasicProfile> = (args) => <PatientBasicProfile {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
