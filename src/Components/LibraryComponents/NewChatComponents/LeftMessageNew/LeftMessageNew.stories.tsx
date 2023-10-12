import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './LeftMessageNew.types';
import LeftMessageNew  from './LeftMessageNew';
export default {
  title: 'LibraryComponents/New Chat Components/LeftMessageNew',

  parameters: {
    backgrounds: {
      default: 'Panel',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
  component: LeftMessageNew,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <LeftMessageNew {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  message: {
    messageId: '123',
    senderId: 'Manidhar',
    message: 'Hi Good Morning!',
    receivedTime: new Date().toString(),
    privacy: '@me',
    isReply: true,
    repliedMessage: {
      messageId: '123',
      senderId: 'Manidhar',
      message: 'Hi Good Morning!',
      receivedTime: new Date().toString(),
      privacy: '@me',
    },
    isAttachment: true,
    attachmentURL: 'https://www.google.com/blog.png',
    attachmentFileSize: 1024,
  },
  isFirstMessage: true,
  staffList: [
    {
      userId: 'Manidhar',
      userName: 'Manidhar',
    },
  ],
};
