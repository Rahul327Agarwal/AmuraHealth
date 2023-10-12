import React from 'react';
import { Story, Meta } from '@storybook/react';
import BulkSummary from './BulkSummary';
import { IProps } from './BulkSummary.types';

export default {
  title: 'Summary Panel/BulkSummary',
  component: BulkSummary,
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

const TemplatePrimary: Story<IProps> = (args) => <BulkSummary {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
