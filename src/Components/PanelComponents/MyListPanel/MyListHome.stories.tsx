import { ComponentMeta, ComponentStory } from '@storybook/react';
import MyListHome from './MyListHome';
import React from 'react';

export default {
  title: 'PanelComponents/MyListHome/MyListHome',
  component: MyListHome,
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
} as ComponentMeta<typeof MyListHome>;

const Template: ComponentStory<typeof MyListHome> = (args) => <MyListHome {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
