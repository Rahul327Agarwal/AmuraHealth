import { Meta, Story } from '@storybook/react';
import React from 'react';
import MediaPreview  from './MediaPreview';
import { IMediaPreviewProps } from './MediaPreview.types';

export default {
  title: 'LibraryComponents/MediaPreview',
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
  component: MediaPreview,
} as Meta;

const TemplatePrimary: Story<IMediaPreviewProps> = (args) => <MediaPreview {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  mediaType: 'thumbnail',
  // mediaType: "image",
  // mediaType: "video",
  // mediaType: "file",
  // mediaType: "audio",
  mediaURL: '',
};
