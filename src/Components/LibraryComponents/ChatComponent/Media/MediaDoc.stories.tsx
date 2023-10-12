import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MediaPhotoProps } from './Media.types';
import MediaDoc from './MediaDoc';

export default {
  title: 'LibraryComponents/ChatComponent/Media/MediaDoc',
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
  component: MediaDoc,
} as Meta;

const TemplatePrimary: Story<MediaPhotoProps> = (args) => <MediaDoc {...args} />;
export const Primary = TemplatePrimary.bind({});

Primary.args = {
  src: 'https://images.pexels.com/photos/6389849/pexels-photo-6389849.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  fileName: 'pexels-photo-6389849.jpeg',
};
