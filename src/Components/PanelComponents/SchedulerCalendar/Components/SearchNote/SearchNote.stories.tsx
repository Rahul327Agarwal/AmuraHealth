import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchNote  from './SearchNote';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar/Components/SearchNote',
  component: SearchNote,
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
} as ComponentMeta<typeof SearchNote>;

const Template: ComponentStory<typeof SearchNote> = (args) => <SearchNote {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
