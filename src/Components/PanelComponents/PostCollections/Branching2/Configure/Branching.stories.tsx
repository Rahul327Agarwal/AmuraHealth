import { Meta, Story } from '@storybook/react';
import React from 'react';
import { MyListProps } from './Branching.types';
import Branching from './Branching';
export default {
  title: 'POST COLLECTIONS/Branching2',
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
  component: Branching,
} as Meta;

const Template: Story<MyListProps> = (args) => <Branching {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  panel: {
    height: '1000px',
  },
};
