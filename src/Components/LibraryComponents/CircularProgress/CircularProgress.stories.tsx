import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import CircularProgress  from './CircularProgress';

export default {
  title: 'LibraryComponents/CircularProgress',
  component: CircularProgress,
  argTypes: { backgroundColor: { control: 'color' } },
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
} as ComponentMeta<typeof CircularProgress>;

const Template: ComponentStory<typeof CircularProgress> = (args) => <CircularProgress {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  borderColor: '#F1F1F1',
  progressBarColor: '#40916C',
  borderThickness: 4,
};
