import { Meta, Story } from '@storybook/react';
import React from 'react';
import Preview  from './Preview';
import { PreviewProps } from './Preview.types';

export default {
  title: 'PanelComponents/Distributions Management/Preview',
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
  component: Preview,
} as Meta;

const Template: Story<PreviewProps> = (args) => <Preview {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  // panel: { height: "1000px" },
};
