import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './DaySeparator.types';
import DaySeparator from './DaySeparator';
export default {
  title: 'PanelComponents/Notes/DaySeparator',

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
  component: DaySeparator,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <DaySeparator {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  date: new Date().toString(),
};
