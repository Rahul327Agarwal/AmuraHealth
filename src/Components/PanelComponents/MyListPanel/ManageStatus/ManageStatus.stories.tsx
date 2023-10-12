import { ComponentMeta, ComponentStory } from '@storybook/react';
import MessageStatus from './ManageStatus';
import React from 'react';

export default {
  title: 'PanelComponents/MyListHome/MessageStatus',
  component: MessageStatus,
  argTypes: { backgroundColor: { control: 'color' } },
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
} as ComponentMeta<typeof MessageStatus>;

const Template: ComponentStory<typeof MessageStatus> = (args) => <MessageStatus {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
