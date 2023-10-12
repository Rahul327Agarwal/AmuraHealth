import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './RightMessage.types';
import RightMessage  from './RightMessage';
export default {
  title: 'PanelComponents/Post Collections/RightMessage',
  parameters: {
    backgrounds: {
      default: 'lightGray',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
        { name: 'lightGray', value: '#F5F5F5' },
      ],
    },
  },
  component: RightMessage,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <RightMessage {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  message: {
    message: 'Health of happiness',
    msgSent: '09.34 AM',
  },
};
