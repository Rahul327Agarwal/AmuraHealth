import { Meta, Story } from '@storybook/react';
import React from 'react';
import { IProps } from './MessageInput.types';
import DaySeparator from '../../../../Notes/components/DaySeparator/DaySeparator';
export default {
  title: 'Library Components/Chat Components/MessageInputNew',

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
  component: DaySeparator,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <DaySeparator {...(args as any)} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  date: new Date().toString(),
  tagOptions: [
    {
      id: 'me',
      label: 'me',
    },
    {
      id: 'all',
      label: 'all',
    },
  ],
};
