import React from 'react';
import { Story, Meta } from '@storybook/react';
import MUITabs  from './MUITabs';
import { IProps } from './MUITabs.types';

export default {
  title: 'LibraryComponents/MUITabs',
  component: MUITabs,
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
} as Meta;

const Template: Story<IProps> = (args) => <MUITabs {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  tabOptions: ['All', 'About tab', 'Contact tab', 'Status only', 'other'],
  activeTab: 'All',
  handleEditTab: () => {},
  onTabChange: () => {},
};
