import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from '../Registration.types';
import PersonalInformation from './PersonalInformation';
export default {
  title: 'Registration/PersonalInformation',

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
  component: PersonalInformation,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <PersonalInformation {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  Auth: null,
  loginCredentials: {},
  setLoginCredentials: () => {},
  history: {},
  AmplifyConfigure: () => {},
};
