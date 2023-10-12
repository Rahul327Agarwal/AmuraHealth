import React from 'react';
import { Story, Meta } from '@storybook/react';
import WeightPopUp  from './WeightPopUp';
import { IProps } from './WeightPopUp.types';

export default {
  title: 'LibraryComponents/ChatComponent/WeightPopUp',
  component: WeightPopUp,
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

const TemplatePrimary: Story<IProps> = (args) => <WeightPopUp {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
