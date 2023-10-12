import { Meta, Story } from '@storybook/react';
import React from 'react';
import PresHeader  from './PresHeader';
import { IProps } from './PresHeader.types';
export default {
  title: 'LibraryComponents/PresHeader',
  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: '#FFFFFF' },
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
      ],
    },
  },
  component: PresHeader,
} as Meta;

const Template: Story<IProps> = (args) => <PresHeader {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
