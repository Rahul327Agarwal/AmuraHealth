import { Meta, Story } from '@storybook/react';
import React from 'react';
import Select  from './Select';
import { IProps } from './Select.types';
export default {
  title: 'LibraryComponents/Select',
  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: '#FFFFFF' },
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
      ],
    },
  },
  component: Select,
} as Meta;

const Template: Story<IProps> = (args) => <Select {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  options: [
    { label: 'Test package 1', value: 'Test package 1', userId: 'kjdkfjkd', subLabel: 'doctor' },
    { label: 'Test package 2', value: 'Test package 2', userId: 'kjdkfjkd', subLabel: 'doctor' },
    { label: 'Test package 3', value: 'Test package 3', userId: 'kjdkfjkd', subLabel: 'doctor' },
    { label: 'Test package 4', value: 'Test package 4', userId: 'kjdkfjkd', subLabel: 'doctor' },
    { label: 'Test package 5', value: 'Test package 5', userId: 'kjdkfjkd', subLabel: 'doctor' },
    { label: 'Test package 6', value: 'Test package 6', userId: 'kjdkfjkd', subLabel: 'doctor' },
  ],
  placeholder: 'Select Options',
  optionsType: 'profileToken',
  isToken: true,
  isTokenDeletable: true,
  headerTitle: 'Condition Header',
  isSearch: true,
  position: 'bottom',
  isDivider: true,
  setValues: () => {},
  values: [],
  extendTokenHeight: true,
};
