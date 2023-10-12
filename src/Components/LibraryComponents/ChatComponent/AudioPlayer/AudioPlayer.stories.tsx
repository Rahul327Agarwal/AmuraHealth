import { Meta, Story } from '@storybook/react';
import React from 'react';
import { IProps } from './AudioPlayer.types';
import AudioPlayer from './AudioPlayer';
export default {
  title: 'LibraryComponents/ChatComponent/AudioPlayer',
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
  component: AudioPlayer,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <AudioPlayer {...args} />;
export const Primary = TemplatePrimary.bind({});
