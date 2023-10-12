import React from 'react';
import { Story, Meta } from '@storybook/react';
import InputField  from './InputField';
import { IProps } from './InputField.types';
export default {
  title: 'LibraryComponents/InputField',
  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Gray', value: '#F8F8F8' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
  component: InputField,
} as Meta;

const Template: Story<IProps> = (args) => <InputField {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  // label: "Title",
  onChange: (e) => {},
  // value: ["Hello", "Hello", "Hi", "Hey"],
  // placeholder: "Enter Time",
  // disabled: true,
  // isReadOnly: true,
  // multiline: true,
  // autoHeight: true,
  // maxHeight: "100px",
  // renderValueAsToken: true,
  // renderValueAsTokenDeletable: true,
  // handleDeleteToken: Function,
  solidVariant: true,
  type: 'text',
};
