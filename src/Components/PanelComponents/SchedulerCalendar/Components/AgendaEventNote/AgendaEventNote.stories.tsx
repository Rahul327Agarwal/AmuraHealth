import { ComponentMeta, ComponentStory } from '@storybook/react';
import AgendaEventNote  from './AgendaEventNote';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar/Components/AgendaEventNote',
  component: AgendaEventNote,
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
} as ComponentMeta<typeof AgendaEventNote>;

const Template: ComponentStory<typeof AgendaEventNote> = (args) => <AgendaEventNote {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
