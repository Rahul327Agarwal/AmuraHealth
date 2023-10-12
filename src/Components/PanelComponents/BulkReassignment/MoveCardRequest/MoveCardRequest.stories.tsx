import { Meta, Story } from '@storybook/react';
import React from 'react';
import MoveCardRequest from './MoveCardRequest';
import { IMoveMyCardsProps } from './MoveCardRequest.types';

export default {
  title: 'My Page Panel/MoveCardRequest',
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
  component: MoveCardRequest,
} as Meta;

const Template: Story<IMoveMyCardsProps> = (args) => <MoveCardRequest {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  panel: { height: '1000px' },
};
