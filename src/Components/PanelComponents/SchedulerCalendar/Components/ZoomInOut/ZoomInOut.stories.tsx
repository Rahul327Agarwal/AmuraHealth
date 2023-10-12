import { ComponentMeta, ComponentStory } from '@storybook/react';
import ZoomInOut  from './ZoomInOut';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar/Components/ZoomInOut',
  component: ZoomInOut,
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
} as ComponentMeta<typeof ZoomInOut>;

const Template: ComponentStory<typeof ZoomInOut> = (args) => <ZoomInOut {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
