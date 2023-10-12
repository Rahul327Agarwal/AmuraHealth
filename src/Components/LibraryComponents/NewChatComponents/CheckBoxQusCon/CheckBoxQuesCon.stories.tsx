import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './CheckBoxQusCon.types';
import CheckBoxQusCon  from './CheckBoxQusCon';
export default {
  title: 'LibraryComponents/New Chat Components/CheckBoxQusCon',

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
  component: CheckBoxQusCon,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <CheckBoxQusCon {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  values: [
    { name: 'opt1', desc: 'tablet' },
    { name: 'opt2', desc: 'tablet2' },
    { name: 'opt3', desc: 'tablet3' },
    { name: 'opt4', desc: 'tablet4' },
  ],
};
