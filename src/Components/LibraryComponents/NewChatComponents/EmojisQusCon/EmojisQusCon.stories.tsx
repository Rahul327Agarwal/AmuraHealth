import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './EmojisQusCon.types';
import EmojisQusCon  from './EmojisQusCon';
export default {
  title: 'LibraryComponents/New Chat Components/EmojisQusCon',

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
  component: EmojisQusCon,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <EmojisQusCon {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  handleAnswer: (e: any) => {},
};
