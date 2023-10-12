import { ComponentMeta, ComponentStory } from '@storybook/react';
import TimeLine  from './TimeLine';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar/Components/TimeLine',
  component: TimeLine,
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
} as ComponentMeta<typeof TimeLine>;

const Template: ComponentStory<typeof TimeLine> = (args) => <TimeLine {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  date: new Date(),
  viewType: 'OneDay',
};
