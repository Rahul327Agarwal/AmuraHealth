import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './RadioButtonGroup.types';
import RadioButtonGroup  from './RadioButtonGroup';
export default {
  title: 'LibraryComponents/RadioButtonGroup',

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
  component: RadioButtonGroup,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <RadioButtonGroup {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  options: ['opt1', 'opt2', 'opt3', 'opt4'],
  label: 'Amura',
  handleAnswer: (e: any) => {},
};
