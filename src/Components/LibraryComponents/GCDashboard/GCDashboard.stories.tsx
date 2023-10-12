import { ComponentMeta, ComponentStory } from '@storybook/react';
import GCDashboard  from './GCDashboard';
import React from 'react';

export default {
  title: 'LibraryComponents/GCDashboard',
  component: GCDashboard,
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
} as ComponentMeta<typeof GCDashboard>;

const Template: ComponentStory<typeof GCDashboard> = (args) => <GCDashboard {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
