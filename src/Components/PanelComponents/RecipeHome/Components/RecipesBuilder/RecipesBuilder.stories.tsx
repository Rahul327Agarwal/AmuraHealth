import { ComponentMeta, ComponentStory } from '@storybook/react';
import RecipesBuilder  from './RecipesBuilder';
import React from 'react';

export default {
  title: 'PanelComponents/RecipeHome/RecipesBuilder',
  component: RecipesBuilder,
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
} as ComponentMeta<typeof RecipesBuilder>;

const Template: ComponentStory<typeof RecipesBuilder> = (args) => <RecipesBuilder {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
