import React from 'react';
import { Story, Meta } from '@storybook/react';
import MUISkeleton  from './MUISkeleton';
import { IProps } from './MUISkeleton.types';

export default {
  title: 'LibraryComponents/MUISkeleton',
  component: MUISkeleton,
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
} as Meta;

const Template: Story<IProps> = (args) => <MUISkeleton {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  height: '100px',
  width: '100px',
};
