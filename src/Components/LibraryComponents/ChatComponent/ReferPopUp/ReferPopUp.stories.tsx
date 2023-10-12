import { Meta, Story } from '@storybook/react';
import React from 'react';
import ReferPopUp from './ReferPopUp';
import { IProps } from './ReferPopUp.types';

export default {
  title: 'LibraryComponents/ChatComponent/ReferPopUp',
  component: ReferPopUp,
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

const TemplatePrimary: Story<IProps> = (args) => <ReferPopUp {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  handleClose: () => {},
};
