import React from 'react';
import { Story, Meta } from '@storybook/react';
import PhlebotomyCards from './PhlebotomyCards';
export default {
  title: 'PanelComponents/PhlebotomyView/Components/PhlebotomyCards/PhlebotomyCards',
  component: PhlebotomyCards,
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
const TemplatePrimary: Story<any> = (args) => <PhlebotomyCards {...args} />;
export const Primary = TemplatePrimary.bind({});
