import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './NormalMsgInput.types';
import NormalMsgInput  from './NormalMsgInput';
export default {
  title: 'LibraryComponents/ChatComponent/NormalMsgInput',

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
  component: NormalMsgInput,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <NormalMsgInput {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
