import React from 'react';
import { Story, Meta } from '@storybook/react';
import MUISelect  from './MUISelect';
import { IProps } from './MUISelect.types';

export default {
  title: 'LibraryComponents/MUISelect',
  component: MUISelect,
  parameters: {
    backgrounds: {
      default: 'Gray',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Gray', value: '#F8F8F8' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
} as Meta;

const Template: Story<IProps> = (args) => <MUISelect {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  options: [
    { label: 'Hours', value: 'Hours' },
    { label: 'Minute', value: 'Minute' },
    { label: 'Day', value: 'Day' },
  ],
  value: 'Hours',
  onChange: () => {},
  labelId: 'SELECT_TIME',
  label: 'Number',
  // variant: "filled",
};
