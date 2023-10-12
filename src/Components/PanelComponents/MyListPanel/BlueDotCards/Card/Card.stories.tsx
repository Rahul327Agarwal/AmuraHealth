import React from 'react';
import { Story, Meta } from '@storybook/react';
import Card from './Card';
import { ICardProps } from './Card.types';
export default {
  title: 'My List New Design/Blue dot Card',
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
  component: Card,
} as Meta;

const TemplatePrimary: Story<ICardProps> = (args) => <Card {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
