import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './VoiceRecording.types';
import VoiceRecording  from './VoiceRecording';
export default {
  title: 'LibraryComponents/New Chat Components/VoiceRecording',

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
  component: VoiceRecording,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <VoiceRecording {...args} />;
export const Primary = TemplatePrimary.bind({});
