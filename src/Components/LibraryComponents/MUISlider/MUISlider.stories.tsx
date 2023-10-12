import React from 'react';
import { Story, Meta } from '@storybook/react';
import MUISlider  from './MUISlider';
import { IProps } from './MUISlider.types';

export default {
  title: 'LibraryComponents/MUISlider',
  component: MUISlider,
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
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <MUISlider {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
