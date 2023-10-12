import React from 'react';
import { Story, Meta } from '@storybook/react';
import MUISwitch  from './MUISwitch';
import { IProps } from './MUISwitch.types';

export default {
  title: 'LibraryComponents/MUISwitch',
  component: MUISwitch,
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

const Template: Story<IProps> = (args) => <MUISwitch {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
