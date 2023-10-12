import React from 'react';
import { Story, Meta } from '@storybook/react';
import MinimizeCard from './MinimizeCard';

export default {
  title: 'New Library Components/MinimizeCard',

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
  component: MinimizeCard,
} as Meta;

const TemplatePrimary: Story = (args) => (
  <MinimizeCard
    handlePanelComponentsHeights={undefined}
    current_screen={''}
    setScreen={undefined}
    screen={[]}
    view={''}
    {...args}
  />
);
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
