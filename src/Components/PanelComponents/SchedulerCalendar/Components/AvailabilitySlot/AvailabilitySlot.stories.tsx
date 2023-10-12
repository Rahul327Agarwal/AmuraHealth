import { ComponentMeta, ComponentStory } from '@storybook/react';
import AvailabilitySlot  from './AvailabilitySlot';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar/Components/AvailabilitySlot',
  component: AvailabilitySlot,
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
} as ComponentMeta<typeof AvailabilitySlot>;

const Template: ComponentStory<typeof AvailabilitySlot> = (args) => <AvailabilitySlot {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
