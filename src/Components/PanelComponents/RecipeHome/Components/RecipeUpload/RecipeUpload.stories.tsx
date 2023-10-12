import { ComponentMeta, ComponentStory } from '@storybook/react';
import RecipeUpload  from './RecipeUpload';
import React from 'react';

export default {
  title: 'PanelComponents/RecipeHome/Components/RecipeUpload',
  component: RecipeUpload,
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
} as ComponentMeta<typeof RecipeUpload>;

const Template: ComponentStory<typeof RecipeUpload> = (args) => <RecipeUpload {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
