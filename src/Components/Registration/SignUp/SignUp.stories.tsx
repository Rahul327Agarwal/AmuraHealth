import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from '../Registration.types';
import SignUp from './SignUp';
export default {
  title: 'Registration/SignUp',

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
  component: SignUp,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <SignUp {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  Auth: null,
  loginCredentials: {},
  setLoginCredentials: () => {},
  history: {},
  AmplifyConfigure: () => {},
};
