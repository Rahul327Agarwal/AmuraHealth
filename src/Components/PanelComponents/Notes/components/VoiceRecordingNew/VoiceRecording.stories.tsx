import { Meta, Story } from '@storybook/react';
import React from 'react';
import VoiceRecording  from './VoiceRecordingNew';
import { IProps } from './VoiceRecording.types';
export default {
  title: 'Library Components/Chat Components/VoiceRecording',

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
