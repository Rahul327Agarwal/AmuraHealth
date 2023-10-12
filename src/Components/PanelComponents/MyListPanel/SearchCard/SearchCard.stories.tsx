import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchCard from './SearchCard';
import React from 'react';

export default {
  title: 'PanelComponents/MyListHome/SearchCard',
  component: SearchCard,
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
} as ComponentMeta<typeof SearchCard>;

const Template: ComponentStory<typeof SearchCard> = (args) => <SearchCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
