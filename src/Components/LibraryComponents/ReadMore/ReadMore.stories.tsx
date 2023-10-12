import React from 'react';
import { Story, Meta } from '@storybook/react';
import ReadMore  from './ReadMore';
import { IProps } from './ReadMore.types';
export default {
  title: 'LibraryComponents/ReadMore2',
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
  component: ReadMore,
} as Meta;

const Template: Story<IProps> = (args) => <ReadMore {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  text: 'Hey there i am using whatsup Hey there i am using whatsup Hey there i am using number',
};
