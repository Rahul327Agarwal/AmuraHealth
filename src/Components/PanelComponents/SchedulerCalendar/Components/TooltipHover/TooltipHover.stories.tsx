import { ComponentMeta, ComponentStory } from '@storybook/react';
import TooltipHover  from './TooltipHover';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar/Components/TooltipHover',
  component: TooltipHover,
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
} as ComponentMeta<typeof TooltipHover>;

const Template: ComponentStory<typeof TooltipHover> = (args) => <TooltipHover {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
