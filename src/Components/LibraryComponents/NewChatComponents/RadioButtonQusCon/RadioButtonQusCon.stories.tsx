import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './RadioButtonQusCon.types';
import RadioButtonQusCon  from './RadioButtonQusCon';
export default {
  title: 'LibraryComponents/New Chat Components/RadioButtonQusCon',

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
  component: RadioButtonQusCon,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <RadioButtonQusCon {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  handleAnswer: (e: any) => {},
  options: ['opt1', 'opt2', 'opt3', 'opt4'],
};
