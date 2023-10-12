import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './IcontextWithBtnCon.types';
import IcontextWithBtnCon  from './IcontextWithBtnCon';
export default {
  title: 'LibraryComponents/New Chat Components/IcontextWithBtnCon',

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
  component: IcontextWithBtnCon,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <IcontextWithBtnCon {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  text: '08:00 am - Morning Lession',
  handleAnswer: (e: any) => {},
  buttonText: 'start lesson',
};
