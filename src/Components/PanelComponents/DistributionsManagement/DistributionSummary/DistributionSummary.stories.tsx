import { Meta, Story } from '@storybook/react';
import React from 'react';
import DistributionSummary from './DistributionSummary';
import { DistributionSummaryProps } from './DistributionSummary.types';

export default {
  title: 'PanelComponents/Distributions Management/DistributionSummary',
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
  component: DistributionSummary,
} as Meta;

const Template: Story<DistributionSummaryProps> = (args) => <DistributionSummary {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  // panel: { height: "1000px" },
};
