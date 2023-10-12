import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './AttachMedia.types';
import AttachMedia  from './AttachMedia';
export default {
  title: 'LibraryComponents/ChatComponent/AttachMedia',
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
  component: AttachMedia,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <AttachMedia {...args} />;
export const Primary = TemplatePrimary.bind({});
