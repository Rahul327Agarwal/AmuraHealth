import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button  from './Button';
import { IProps } from './Button.types';

export default {
  title: 'Registration/Components/Button',
  component: Button,
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

const TemplatePrimary: Story<IProps> = (args) => <Button {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  label: 'Primary',
  variant: 'primary',
  handleClick: () => {},
};

const TemplateSecondary: Story<IProps> = (args) => <Button {...args} />;
export const Secondary = TemplateSecondary.bind({});
Secondary.args = {
  label: 'Secondary',
  variant: 'secondary',
  handleClick: () => {},
};

const TemplateTertiary: Story<IProps> = (args) => <Button {...args} />;
export const Tertiary = TemplateTertiary.bind({});
Tertiary.args = {
  label: 'Tertiary',
  variant: 'tertiary',
  handleClick: () => {},
};
