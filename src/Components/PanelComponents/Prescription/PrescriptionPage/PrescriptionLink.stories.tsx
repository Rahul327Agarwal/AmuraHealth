import React from 'react';
import { Story, Meta } from '@storybook/react';
import PrescriptionPage from './PrescriptionPage';

export default {
  title: 'PanelComponents/Prescription/PrescriptionPage',
  component: PrescriptionPage,
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
} as Meta;

const TemplatePrimary: Story<any> = (args) => <PrescriptionPage {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
