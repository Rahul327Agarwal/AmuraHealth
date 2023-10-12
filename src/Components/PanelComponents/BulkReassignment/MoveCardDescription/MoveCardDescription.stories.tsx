import { Meta, Story } from '@storybook/react';
import React from 'react';
import MoveCardDescription from './MoveCardDescription';
import { IProps } from './MoveCardDescription.types';
export default {
  title: 'Bulk Assignment/MoveCardDescription',
  component: MoveCardDescription,
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

const Template: Story<IProps> = (args) => <MoveCardDescription {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
