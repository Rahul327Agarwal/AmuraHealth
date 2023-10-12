import { ComponentMeta, ComponentStory } from '@storybook/react';
import RecipeHome  from './RecipeHome';
import React from 'react';

export default {
  title: 'PanelComponents/RecipeHome',
  component: RecipeHome,
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
} as ComponentMeta<typeof RecipeHome>;

const Template: ComponentStory<typeof RecipeHome> = (args) => <RecipeHome {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
