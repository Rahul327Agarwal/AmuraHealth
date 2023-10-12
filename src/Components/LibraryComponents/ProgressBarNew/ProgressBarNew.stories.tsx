import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './ProgressBarNew.types';
import ProgressBarNew  from './ProgressBarNew';
export default {
  title: 'LibraryComponents/ProgressBarNew',

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
  component: ProgressBarNew,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <ProgressBarNew {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  percent: 98.333,
};
