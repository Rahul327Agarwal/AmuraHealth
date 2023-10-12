import React from 'react';
import TextWithAvathar  from './TextWithAvathar';
import { Story, Meta } from '@storybook/react';
import { IProps } from './TextWithAvathar.types';
export default {
  title: 'LibraryComponents/TextWithAvathar',
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
  component: TextWithAvathar,
} as Meta;
const TemplatePrimary: Story<IProps> = (args) => <TextWithAvathar {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  color: 'green',
  name: 'Amura',
  id: 'amura',
};
