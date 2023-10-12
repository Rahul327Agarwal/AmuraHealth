import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MediaAudioProps } from './Media.types';
import MediaAudio from './MediaAudio';

export default {
  title: 'LibraryComponents/ChatComponent/Media/MediaAudio',
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
  component: MediaAudio,
} as Meta;

const TemplatePrimary: Story<MediaAudioProps> = (args) => <MediaAudio {...args} />;
export const Primary = TemplatePrimary.bind({});

Primary.args = {
  src: 'aa',
  fileName: 'filename.ext',
  whiteTheme: true,
};
