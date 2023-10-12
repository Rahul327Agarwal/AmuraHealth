import { ComponentMeta, ComponentStory } from '@storybook/react';
import RecipePanel  from './RecipePanel';
import React from 'react';

export default {
  title: 'PanelComponents/RecipeHome/RecipePanel',
  component: RecipePanel,
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
} as ComponentMeta<typeof RecipePanel>;

const Template: ComponentStory<typeof RecipePanel> = (args) => <RecipePanel {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
