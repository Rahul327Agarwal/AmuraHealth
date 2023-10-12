import React from 'react';
import { Story, Meta } from '@storybook/react';
import PhoneInputField  from './PhoneInputField';
import { IProps } from './PhoneInputField.types';
import { isValidPhoneNumber } from 'react-phone-number-input';
export default {
  title: 'Registration/Components/PhoneInputField',
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
  component: PhoneInputField,
} as Meta;

const Template: Story<IProps> = (args) => <PhoneInputField {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Enter your name',
  label: 'Name',
  value: '',
  handleOnChange: (e: any) => {},
  onBlur: () => {},
  validate: (e: any) => {
    return e ? (isValidPhoneNumber(e.replace(/[^A-Z0-9+]/gi, '')) ? '' : 'Invalid phone number') : 'Wrong name';
  },
  showError: true,
};
