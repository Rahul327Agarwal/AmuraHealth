import React from 'react';
import { Story, Meta } from '@storybook/react';
import BPPopUp  from './BPPopUp';
import { IProps } from './BPPopUp.types';

export default {
  title: 'LibraryComponents/ChatComponent/BPPopUp',
  component: BPPopUp,
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

const TemplatePrimary: Story<IProps> = (args) => <BPPopUp {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
