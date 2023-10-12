import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchEventNote  from './SearchEventNote';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar/Components/SearchEventNote',
  component: SearchEventNote,
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
} as ComponentMeta<typeof SearchEventNote>;

const Template: ComponentStory<typeof SearchEventNote> = (args) => <SearchEventNote {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
