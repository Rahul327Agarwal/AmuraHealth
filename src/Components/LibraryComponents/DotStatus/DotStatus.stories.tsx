import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import DotStatus  from './DotStatus';

export default {
  title: 'LibraryComponents/DotStatus',
  component: DotStatus,
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
} as ComponentMeta<typeof DotStatus>;

const Template: ComponentStory<typeof DotStatus> = (args) => <DotStatus {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: '#1B1B1B',
};
