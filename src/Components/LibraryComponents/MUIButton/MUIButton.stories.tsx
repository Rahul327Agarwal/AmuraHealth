import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import MUIButton from './MUIButton';

export default {
  title: 'LibraryComponents/MUIButton',
  component: MUIButton,
  // tags:['autodocs'],
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
} as ComponentMeta<typeof MUIButton>;

const Template: ComponentStory<typeof MUIButton> = (args) => <MUIButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'MUIButton',
  variant: 'contained',
  fontSize: '30px',
};
export const Contained = Template.bind({});
Contained.args = {
  children: 'MUIButton',
  variant: 'contained',
};
export const Outlined = Template.bind({});
Outlined.args = {
  children: 'MUIButton',
  variant: 'outlined',
};

export const Text = Template.bind({});
Text.args = {
  children: 'MUIButton',
  variant: 'text',
};
