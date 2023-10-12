import { DEFAULT_FILTERS } from './CalendarFilter.function';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CalendarFilter  from './CalendarFilter';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar/CalendarFilter',
  component: CalendarFilter,
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
} as ComponentMeta<typeof CalendarFilter>;

const Template: ComponentStory<typeof CalendarFilter> = (args) => <CalendarFilter {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  defaultFilters: DEFAULT_FILTERS,
  handleBack: () => {},
  onFilterChange: () => {},
};
