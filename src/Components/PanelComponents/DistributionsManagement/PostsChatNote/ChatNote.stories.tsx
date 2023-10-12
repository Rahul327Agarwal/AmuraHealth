import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './ChatNote.types';
import ChatNote from './ChatNote';
export default {
  title: 'DistributionManagement/PostsChatNote/ChatNote',
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
  component: ChatNote,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <ChatNote {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  messagesList: [
    {
      senderId: 'Manidhar',
      message: 'Hi Good Morning!',
      receivedTime: new Date().toString(),
      privacy: '@me',
      isReply: false,
      repliedMessage: {
        senderId: 'Manidhar',
        message: 'Hi Good Morning!',
        receivedTime: new Date().toString(),
        privacy: '@me',
      },
      isAttachment: false,
      attachmentURL: 'https://www.google.com/blog.png',
      attachmentFileSize: '1024',
    },
    {
      senderId: 'Mano',
      message: 'Hi Good Morning!',
      receivedTime: new Date().toString(),
      privacy: '@me',
      isReply: true,
      repliedMessage: {
        senderId: 'Manidhar',
        message: 'Hi Good Morning!',
        receivedTime: new Date().toString(),
        privacy: '@me',
      },
      isAttachment: true,
      attachmentURL: 'https://www.google.com/blog.png',
      attachmentFileSize: '1024',
    },
    {
      senderId: 'Mano',
      message: 'Hi Good Morning!',
      receivedTime: new Date().toString(),
      privacy: '@me',
      isReply: true,
      repliedMessage: {
        senderId: 'Manidhar',
        message: 'Hi Good Morning!',
        receivedTime: new Date().toString(),
        privacy: '@me',
      },
      isAttachment: true,
      attachmentURL: 'https://www.google.com/blog.png',
      attachmentFileSize: '1024',
    },
    {
      senderId: 'Manidhar',
      message: 'Hi Good Morning!',
      receivedTime: new Date().toString(),
      privacy: '@me',
      isReply: true,
      repliedMessage: {
        senderId: 'Manidhar',
        message: 'Hi Good Morning!',
        receivedTime: new Date().toString(),
        privacy: '@me',
      },
      isAttachment: false,
      attachmentURL: 'https://www.google.com/blog.png',
      attachmentFileSize: '1024',
    },
  ],
  possibleTags: [],
  staffList: [
    {
      userId: 'Manidhar',
      userName: 'Manidhar',
    },
    {
      userId: 'Mano',
      userName: 'Mano',
    },
  ],
};
