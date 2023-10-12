import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MediaVideoProps } from './Media.types';
import MediaVideo from './MediaVideo';

export default {
  title: 'LibraryComponents/ChatComponent/Media/MediaVideo',
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
  component: MediaVideo,
} as Meta;

const TemplatePrimary: Story<MediaVideoProps> = (args) => <MediaVideo {...args} />;
export const Primary = TemplatePrimary.bind({});

Primary.args = {
  src: 'aa',
  fileName: 'filename.ext',
};
