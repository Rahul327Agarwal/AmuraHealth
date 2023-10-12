import React from 'react';
import { Story, Meta } from '@storybook/react';
import Link  from './Link';
import { IProps } from './Link.types';

export default {
  title: 'Registration/Components/Link',
  component: Link,
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

const TemplatePrimary: Story<IProps> = (args) => <Link {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  handleClick: (e: any) => {
    window.open('https://www.google.co.in', '_blank');
  },
  label: 'Google',
};
