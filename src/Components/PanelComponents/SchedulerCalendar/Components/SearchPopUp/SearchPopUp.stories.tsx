import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchPopUp  from './SearchPopUp';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar/Components/SearchPopUp',
  component: SearchPopUp,
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
} as ComponentMeta<typeof SearchPopUp>;

const Template: ComponentStory<typeof SearchPopUp> = (args) => <SearchPopUp {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
