import React from 'react';
import { Story, Meta } from '@storybook/react';
import NewCallSchedulerWizard  from './NewCallSchedulerWizard';
export default {
  title: 'LibraryComponents/NewCallSchedulerWizard',
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
  component: NewCallSchedulerWizard,
} as Meta;
const TemplatePrimary: Story = (args) => <NewCallSchedulerWizard {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
