import React from 'react';
import { Story, Meta } from '@storybook/react';
import PatientDetailedProfile from './PatientDetailedProfile';
import { IPatientDetailedProfile } from './PatientDetailedProfile.types';

export default {
  title: 'PanelComponents/PatientDetailedProfile',
  component: PatientDetailedProfile,
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

const TemplatePrimary: Story<IPatientDetailedProfile> = (args) => <PatientDetailedProfile {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
