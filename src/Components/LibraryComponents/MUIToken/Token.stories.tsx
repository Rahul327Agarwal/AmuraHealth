import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Token from './MUIToken';
import { IProps } from './Token.types';

export default {
  title: 'LibraryComponents/Token',
  component: Token,
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
} as ComponentMeta<typeof Token>;

const TemplatePrimary: ComponentStory<typeof Token> = (args) => <Token {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  label: 'Chip Outlined',
  onDelete: () => {},
};
