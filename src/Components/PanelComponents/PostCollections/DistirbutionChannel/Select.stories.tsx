import { Meta, Story } from '@storybook/react';
import React from 'react';
import Select  from './DistirbutionChannel';
import { IProps } from './Select.types';
export default {
  title: 'PanelComponents/Post Collections/Distribution Channel/Select',
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
    { label: 'Test package 1', value: 'Test package 1' },
    { label: 'Test package 2', value: 'Test package 2' },
    { label: 'Test package 3', value: 'Test package 3' },
    { label: 'Test package 4', value: 'Test package 4' },
    { label: 'Test package 5', value: 'Test package 5' },
    { label: 'Test package 6', value: 'Test package 6' },
  ],
  placeholder: 'Select Options',
  optionsType: 'checkbox',
  isToken: true,
  isTokenDeletable: true,
  headerTitle: 'Condition Header',
  isSearch: true,
  position: 'bottom',
  isDivider: true,
  setValues: () => {},
  values: [],
};
