import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './PostChatNote.types';
import PostChatNote  from './PostChatNote';
export default {
  title: 'PanelComponents/Post Management/Chat Note',
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
  component: PostChatNote,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <PostChatNote {...args} />;
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
        messageId: '123',
      },
      isAttachment: false,
      attachmentURL: 'https://www.google.com/blog.png',
      attachmentFileSize: 1024,
      messageId: '123',
    },
    {
      senderId: 'Mano',
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
      messageId: '123',
      attachmentFileSize: 1024,
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
        messageId: '123',
        privacy: '@me',
      },
      isAttachment: true,
      attachmentURL: 'https://www.google.com/blog.png',
      messageId: '123',
      attachmentFileSize: 1024,
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
        messageId: '123',
        privacy: '@me',
      },
      isAttachment: false,
      attachmentURL: 'https://www.google.com/blog.png',
      messageId: '123',
      attachmentFileSize: 1024,
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
