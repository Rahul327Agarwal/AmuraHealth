import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import MyListHeader from './MyListHeader';
import { Notification, Setting } from './MyListHeader.svg';

export default {
  title: 'LibraryComponents/MyListHeader',
  component: MyListHeader,
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
} as ComponentMeta<typeof MyListHeader>;

const Template: ComponentStory<typeof MyListHeader> = (args) => <MyListHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  actionOption: [
    { icon: <Notification />, onClick: () => {} },
    { icon: <Setting />, onClick: () => {} },
  ],
};
