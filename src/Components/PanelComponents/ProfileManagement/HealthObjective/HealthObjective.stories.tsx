import React from 'react';
import { Story, Meta } from '@storybook/react';
import HealthObjective  from './HealthObjective';
import { IProps } from './HealthObjective.types';

export default {
  title: 'PanelComponents/Profile Management/HealthObjective',
  component: HealthObjective,
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

const TemplatePrimary: Story<IProps> = (args) => <HealthObjective {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
