import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ImageCropper  from './ImageCropper';

export default {
  title: 'LibraryComponents/ImageCropper',
  component: ImageCropper,
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
} as ComponentMeta<typeof ImageCropper>;

const Template: ComponentStory<typeof ImageCropper> = (args) => <ImageCropper {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  image: 'https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  // image: "https://images.pexels.com/photos/3599576/pexels-photo-3599576.jpeg",
  setImage: () => {},
  setCroppedImage: () => {},
  handleClose: () => {},
};
