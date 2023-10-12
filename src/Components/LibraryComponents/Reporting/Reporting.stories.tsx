import React from 'react';
import { Story, Meta } from '@storybook/react';
import Reporting  from './Reporting';
import { IProps } from './Reporting.types';
export default {
  title: 'LibraryComponents/Reporting',
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
  component: Reporting,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <Reporting {...args} />;

export const Primary = TemplatePrimary.bind({});
Primary.args = {
  reportee: 'Dibakar Banerjee',
  role: 'Senior Physicians',
  client: 'DRBD Amura',
};
