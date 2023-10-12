import React from 'react';
import { Story, Meta } from '@storybook/react';
import MUICheckboxGroup  from './MUICheckboxGroup';
import { IProps } from './MUICheckboxGroup.types';

export default {
  title: 'LibraryComponents/MUICheckboxGroup',
  component: MUICheckboxGroup,
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

const TemplatePrimary: Story<IProps> = (args) => <MUICheckboxGroup {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  value: [],
  onChange: () => {},
  options: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'other' },
  ],
};
