import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import IconWithInitial from './IconWithInitial';
import { CalendarIconV2 } from './IconWithInitial.svg';

export default {
  title: 'LibraryComponents/IconWithInitial',
  component: IconWithInitial,
  parameters: {
    backgrounds: {
      default: 'Panel',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
} as Meta;

const TemplatePrimary = (args) => <IconWithInitial {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  initial: 'ah',
  icon: <CalendarIconV2 />,
};
