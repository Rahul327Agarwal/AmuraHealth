import React from 'react';
import { Story, Meta } from '@storybook/react';
import RadioGroup  from './MUIRadioGroup';
import { IProps } from './RadioGroup.types';

export default {
  title: 'LibraryComponents/RadioGroup',
  component: RadioGroup,
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
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <RadioGroup {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  variant: 'token',
  value: 'male',
  setValue: () => {},
  options: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'other' },
  ],
};
