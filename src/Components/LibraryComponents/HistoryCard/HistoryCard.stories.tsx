import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import HistoryCard  from './HistoryCard';

export default {
  title: 'LibraryComponents/HistoryCard',
  component: HistoryCard,
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
} as ComponentMeta<typeof HistoryCard>;

const Template: ComponentStory<typeof HistoryCard> = (args) => <HistoryCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Health Objective',
  after: 'Lorum ipsum psum ipsum lorum ipsum lorum ipsum ipsum ipsum',
  before: 'Like to reverse my type 2 diabetes and reduce, Like to reverse my type 2 diabetes and reduce',
  updatedOn: '20/04/2022, 10:52 AM',
  updatedBy: 'John Honay',
};
