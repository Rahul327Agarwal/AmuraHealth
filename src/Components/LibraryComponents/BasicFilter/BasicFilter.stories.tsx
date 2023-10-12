import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import BasicFilter  from './BasicFilter';

export default {
  title: 'LibraryComponents/BasicFilter',
  component: BasicFilter,
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
} as ComponentMeta<typeof BasicFilter>;

const Template: ComponentStory<typeof BasicFilter> = (args) => <BasicFilter {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
