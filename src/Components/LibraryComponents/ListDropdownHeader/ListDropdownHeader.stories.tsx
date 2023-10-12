import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ListDropdownHeader  from './ListDropdownHeader';

export default {
  title: 'LibraryComponents/ListDropdownHeader',
  component: ListDropdownHeader,
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
} as ComponentMeta<typeof ListDropdownHeader>;

const Template: ComponentStory<typeof ListDropdownHeader> = (args) => <ListDropdownHeader {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  childEventTrigger: () => {},
  selectedDropdown: 'people',
  setSelectedDropdown: () => {},
  handleSearch: () => {},
  headerActionOptions: [],
};
