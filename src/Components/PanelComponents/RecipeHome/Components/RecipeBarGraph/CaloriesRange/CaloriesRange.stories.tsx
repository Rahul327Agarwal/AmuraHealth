import { ComponentMeta, ComponentStory } from '@storybook/react';
import CaloriesRange  from './CaloriesRange';
import React from 'react';

export default {
  title: 'PanelComponents/RecipeHome/Components/CaloriesRange',
  component: CaloriesRange,
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
} as ComponentMeta<typeof CaloriesRange>;

const Template: ComponentStory<typeof CaloriesRange> = (args) => <CaloriesRange {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  variant: 'outerBottom',
  calories: [
    { kcal: 60, value: '30', title: 'Cabs' },
    { kcal: 260, value: '3.5', title: 'Fat' },
    { kcal: 260, value: '4.7', title: 'Protein' },
  ],
  totalKcal: 300,
};
