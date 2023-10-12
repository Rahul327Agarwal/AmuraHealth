import React from 'react';
import { Story, Meta } from '@storybook/react';
import SuccessWizard  from './SuccessWizard';
export default {
  title: 'LibraryComponents/SuccessWizard',
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
  component: SuccessWizard,
} as Meta;
const TemplatePrimary: Story = (args) => <SuccessWizard {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  messageData: {
    tenantId: 'Amura',
    tenantLocation: 'India',
    persons: [
      { label: 'Kavya', id: 'Kavya', color: 'red' },
      { label: 'Mano', id: 'Mano', color: 'green' },
      { label: 'Mani', id: 'Mani', color: 'orange' },
    ],
    scheduleData: { channel: 'voice', timevalue: '10', title: 'Heading', timeUnits: 'mins' },
  },
};
