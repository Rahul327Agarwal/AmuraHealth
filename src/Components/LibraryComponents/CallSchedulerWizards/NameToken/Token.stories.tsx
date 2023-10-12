import React from 'react';
import { Story, Meta } from '@storybook/react';
import Token  from './NameToken';
import { IProps } from './Token.types';

export default {
  title: 'LibraryComponents/Name Token',
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
  userId: '123456456',
  label: 'user name',
  roleId: '23546592512',
  roleName: 'role name',
  isDot: true,
  dotColor: 'green',
};
