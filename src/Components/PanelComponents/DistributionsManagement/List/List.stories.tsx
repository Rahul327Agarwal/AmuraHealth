import { Meta, Story } from '@storybook/react';
import React from 'react';
import { DistributionsListProps } from '../DistributionsMgt.types';
import DistributionsList from './List';

export default {
  title: 'PanelComponents/Distributions Management/List',
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
  component: DistributionsList,
} as Meta;

const Template: Story<DistributionsListProps> = (args) => <DistributionsList {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  panel: { height: '1000px' },
};
