import { Meta, Story } from '@storybook/react';
import React from 'react';
import MUITimePicker from './MUITimePicker';
import { IProps } from './MUITimePicker.types';
import { format } from 'date-fns';

export default {
  title: 'LibraryComponents/MUITimePicker',
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
  component: MUITimePicker,
} as Meta;

const Template: Story<IProps> = (args) => <MUITimePicker {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  headerTitle: 'Set Time',
  label: 'Time',
  value: format(new Date(), 'hh:mm a'),
  onChange: () => {},
};
export const Seconds = Template.bind({});
Seconds.args = {
  headerTitle: 'Set Time',
  label: 'Time',
  value: format(new Date(), 'hh:mm:ss a'),
  showSeconds: true,
  onChange: () => {},
};
