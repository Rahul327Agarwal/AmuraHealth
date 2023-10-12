import { ComponentMeta, ComponentStory } from '@storybook/react';
import SchedulerCalendar  from './SchedulerCalendar';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar',
  component: SchedulerCalendar,
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
} as ComponentMeta<typeof SchedulerCalendar>;

const Template: ComponentStory<typeof SchedulerCalendar> = (args) => <SchedulerCalendar {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
