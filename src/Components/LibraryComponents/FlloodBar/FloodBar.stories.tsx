import React from 'react';
import { Story, Meta } from '@storybook/react';
import FloodBar  from './FlloodBar';
import { IProps } from './FloodBar.types';

export default {
  title: 'LibraryComponents/FlloodBar',
  component: FloodBar,
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

const TemplatePrimary: Story<IProps> = (args) => <FloodBar {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  step: 10,
  defaultValue: 40,
  valueLabelDisplay: 'on',
  isEditable: true,

  marks: [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
  ],
  className: '',
};
