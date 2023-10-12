import { ComponentMeta, ComponentStory } from '@storybook/react';
import CaloriesCard  from './CaloriesCard';
import React from 'react';

export default {
  title: 'PanelComponents/RecipeHome/Components/CaloriesCard',
  component: CaloriesCard,
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
} as ComponentMeta<typeof CaloriesCard>;

const Template: ComponentStory<typeof CaloriesCard> = (args) => <CaloriesCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  headerTitle: 'Calorie (kcal) details',
  totalKcalTitle: 'Calorie',
  variant: 'outerBottom',
  calories: [
    { kcal: 40, title: 'Ingredients', value: '30' },
    { kcal: 60, title: 'This ingredient', value: '3.7' },
    { kcal: 60, title: 'Protein', value: '4.5' },
  ],
  totalKcal: 160,
};
