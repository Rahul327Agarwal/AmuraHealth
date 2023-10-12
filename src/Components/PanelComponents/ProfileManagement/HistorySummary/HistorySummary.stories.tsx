import React from 'react';
import { Story, Meta } from '@storybook/react';
import HistorySummary  from './HistorySummary';
import { IProps } from './HistorySummary.types';

export default {
  title: 'PanelComponents/Profile Management/HistorySummary',
  component: HistorySummary,
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

const TemplatePrimary: Story<IProps> = (args) => <HistorySummary {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
