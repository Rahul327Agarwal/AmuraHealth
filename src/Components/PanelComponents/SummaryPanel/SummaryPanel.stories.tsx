import React from 'react';
import { Story, Meta } from '@storybook/react';
import SummaryPanel  from './SummaryPanel';
import { IProps } from './SummaryPanel.types';

export default {
  title: 'Components/Summary Panel/Primary',
  component: SummaryPanel,
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

const TemplatePrimary: Story<IProps> = (args) => <SummaryPanel {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
