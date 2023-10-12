import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './Cropper.types';
import ImageCropper from './Cropper';

export default {
  title: 'Cropper',
  component: ImageCropper,
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
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <ImageCropper {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  //imageFile: 'https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  setImage: () => {},
  setCroppedImage: () => {},
  handleClose: () => {},
  hadleCrop: () => {},
};
