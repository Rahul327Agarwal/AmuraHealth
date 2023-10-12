import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import IndeterminateLoader  from './InderminateLoader';

export default {
  title: 'LibraryComponents/IndeterminateLoader',
  component: IndeterminateLoader,
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
} as ComponentMeta<typeof IndeterminateLoader>;

const Template: ComponentStory<typeof IndeterminateLoader> = (args) => <IndeterminateLoader {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
