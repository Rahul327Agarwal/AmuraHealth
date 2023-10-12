import { ComponentMeta, ComponentStory } from '@storybook/react';
import EventNote  from './EventNote';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar/Components/EventNote',
  component: EventNote,
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
} as ComponentMeta<typeof EventNote>;

const Template: ComponentStory<typeof EventNote> = (args) => <EventNote {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
