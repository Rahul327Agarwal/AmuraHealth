import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './ProfileCropper.types';
import ProfileCropper from './ProfileCropper';

export default {
  title: 'PanelComponents/Profile Management/ProfileCropper',
  component: ProfileCropper,
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

const TemplatePrimary: Story<IProps> = (args) => (
  <ProfileCropper onImageCropped={undefined} open={false} setOpenProfileCropper={undefined} {...args} />
);
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
