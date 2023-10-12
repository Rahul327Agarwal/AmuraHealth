import { ComponentMeta, ComponentStory } from '@storybook/react';
import AgendaView  from './AgendaView';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar/AgendaView',
  component: AgendaView,
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
} as ComponentMeta<typeof AgendaView>;

const Template: ComponentStory<typeof AgendaView> = (args) => <AgendaView {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
