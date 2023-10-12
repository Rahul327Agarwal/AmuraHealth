import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchField from './SearchField';
import React from 'react';

export default {
  title: 'PanelComponents/MyListHome/SearchField',
  component: SearchField,
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
} as ComponentMeta<typeof SearchField>;

const Template: ComponentStory<typeof SearchField> = (args) => <SearchField {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  placeholder: 'Search item',
  searchvalue: '',
  setSearchvalue: (e) => {},
};
