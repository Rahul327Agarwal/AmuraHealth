import { Meta, Story } from '@storybook/react';
import React from 'react';
import EventCardList from './EventCardList';
import { IProps } from './EventCardList.types';

export default {
  title: 'EventCardList/EventCardList',
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
  component: EventCardList,
} as Meta;

const Template: Story<IProps> = (args) => <EventCardList {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  panel: { height: '1000px' },
};
