import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './BtnsltQusCon.types';
import BtnsltQusCon  from './BtnsltQusCon';
export default {
  title: 'LibraryComponents/New Chat Components/BtnsltQusCon',

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
  component: BtnsltQusCon,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <BtnsltQusCon {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  text: '08:00 am - Morning Lession',
  handleAnswer: (e: any) => {},
  buttonText: 'Done',
};
