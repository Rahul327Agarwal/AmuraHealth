import { ComponentMeta, ComponentStory } from '@storybook/react';
import MyList from './MyList';
import React from 'react';

export default {
  title: 'PanelComponents/MyListHome/MyList',
  component: MyList,
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
} as ComponentMeta<typeof MyList>;

const Template: ComponentStory<typeof MyList> = (args) => <MyList {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
