import { ComponentMeta, ComponentStory } from '@storybook/react';
import NutrientsRow  from './NutrientsRow';
import React from 'react';

export default {
  title: 'PanelComponents/RecipeHome/Components/NutrientsRow',
  component: NutrientsRow,
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
} as ComponentMeta<typeof NutrientsRow>;

const Template: ComponentStory<typeof NutrientsRow> = (args) => <NutrientsRow {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: 'Cabs',
  unit: 'g',
  variant: 'inner',
  calories: [{ kcal: 140 }, { kcal: 160 }],
  totalKcal: 300,
};
