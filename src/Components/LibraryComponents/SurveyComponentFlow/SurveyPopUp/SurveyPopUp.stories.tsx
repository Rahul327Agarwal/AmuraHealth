import React from 'react';
import { Story, Meta } from '@storybook/react';
import SurveyPopUp from './SurveyPopUp';
import { IProps } from './SurveyPopUp.types';

export default {
  title: 'New Library Components/ChatComponent/SurveyPopUp',
  component: SurveyPopUp,
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

const TemplatePrimary: Story<IProps> = (args) => <SurveyPopUp {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  userDetails: [
    { userId: 'mani', userName: 'mani 123' },
    { userId: 'mano', userName: 'mano 123' },
    { userId: 'mani23', userName: 'mani 12323' },
    { userId: 'mano234', userName: 'mano 12re3' },
    { userId: 'mani234wer', userName: 'mani 1er23' },
    { userId: 'manoerweffsdf', userName: 'mano 1sdf23' },
    { userId: 'manisdfsdf', userName: 'mani 123sdf' },
    { userId: 'manosfsdf', userName: 'mano 123fdf' },
  ],
};
