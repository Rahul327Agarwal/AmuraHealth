import React from 'react';
import { Story, Meta } from '@storybook/react';
import InputField  from './InputField';
import { IProps } from './InputField.types';
export default {
  title: 'Registration/Components/InputField',
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
  component: InputField,
} as Meta;

const Template: Story<IProps> = (args) => <InputField {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Enter your name',
  label: 'Name',
  value: '',
  handleOnChange: (e: any) => {
    return e;
  },
  onBlur: () => {},
  validate: (e: any) => {
    return e ? '' : 'Wrong name';
  },
  onKeyPress: (e: any) => {},
  showError: true,
};
