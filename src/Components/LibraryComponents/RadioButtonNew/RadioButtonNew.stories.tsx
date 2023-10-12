import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './RadioButtonNew.types';
import RadioButtonNew  from './RadioButtonNew';
export default {
  title: 'LibraryComponents/RadioButtonNew',

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
  component: RadioButtonNew,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <RadioButtonNew {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  value: 'true',
  label: 'Amura',
  handleCheck: (e: any) => {},
};
