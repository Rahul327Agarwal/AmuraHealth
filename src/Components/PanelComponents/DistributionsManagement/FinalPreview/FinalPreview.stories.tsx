import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FinalPreviewProps } from '../Preview/Preview.types';
import FinalPreview  from './FinalPreview';

export default {
  title: 'PanelComponents/Distributions Management/FinalPreview',
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
  component: FinalPreview,
} as Meta;

const Template: Story<FinalPreviewProps> = (args) => <FinalPreview {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  // panel: { height: "1000px" },
};
