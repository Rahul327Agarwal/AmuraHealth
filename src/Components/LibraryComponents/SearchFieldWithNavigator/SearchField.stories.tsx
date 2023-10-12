import React from 'react';
import { Story, Meta } from '@storybook/react';
import SearchField  from './SearchFieldWithNavigator';
import { IProps } from './SearchField.types';
export default {
  title: 'LibraryComponents/SearchFieldWithNavigator',
  parameters: {
    backgrounds: {
      default: 'Panel',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
  component: SearchField,
} as Meta;

const Template: Story<IProps> = (args) => <SearchField {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Search item',
  handleSearch: (e: any) => {},
};
