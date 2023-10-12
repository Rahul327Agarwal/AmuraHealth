import React from 'react';
import { Story, Meta } from '@storybook/react';
import Token  from './MUIProfileToken';
import { IProps } from './MUIProfileToken.types';

export default {
  title: 'LibraryComponents/MUIProfileToken',
  component: Token,
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

const TemplatePrimary: Story<IProps> = (args) => <Token {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  // label: 'Chip Outlined',
  onDelete: () => {},
  userId: '',
  userName: 'Mano',
  subLabel: 'Doctor',
  // onDeleteToken: () => {},
};
