import { Meta, Story } from '@storybook/react';
import React from 'react';
import Prescription  from './Prescription';
import { IProps } from './Prescription.types';
export default {
  title: 'PanelComponents/Prescription/Primary',
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
  component: Prescription,
} as Meta;

const Template: Story<IProps> = (args) => <Prescription {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
