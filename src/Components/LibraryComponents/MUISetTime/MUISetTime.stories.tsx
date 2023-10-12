import { Meta, Story } from '@storybook/react';
import React from 'react';
import MUISetTime  from './MUISetTime';
import { IProps } from './MUISetTime.types';
export default {
  title: 'LibraryComponents/MUISetTime',
  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Dark', value: '#FFFFFF' },
        { name: 'Panel', value: '#FFFFFF' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
  component: MUISetTime,
} as Meta;

const Template: Story<IProps> = (args) => <MUISetTime {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  headerTitle: 'Custom Time',
  onTimeChange: (data) => {},
  inputLabel: 'Set Time',
  isSuggestion: true,
};
