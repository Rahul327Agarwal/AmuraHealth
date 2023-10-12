import { ComponentMeta, ComponentStory } from '@storybook/react';
import TimeManagementHome from './TimeManagement';
import React from 'react';

export default {
  title: 'PanelComponents/TimeManagementHome/Primary',
  component: TimeManagementHome,
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
} as ComponentMeta<typeof TimeManagementHome>;

const Template: ComponentStory<typeof TimeManagementHome> = (args) => <TimeManagementHome {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
