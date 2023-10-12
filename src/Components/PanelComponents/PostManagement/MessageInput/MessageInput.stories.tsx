import React from 'react';
import { Story, Meta } from '@storybook/react';
import MessageInput  from './MessageInput';
import { IProps } from './MessageInput.types';

export default {
  title: 'PanelComponents/Post Management/MessageInput',
  component: MessageInput,
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

const TemplatePrimary: Story<IProps> = (args) => <MessageInput {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
