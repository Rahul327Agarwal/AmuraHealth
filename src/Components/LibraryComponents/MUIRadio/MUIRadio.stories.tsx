import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Radio from './MUIRadio';
import { IProps } from './MUIRadio.types';

export default {
  title: 'LibraryComponents/Radio',
  component: Radio,
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
} as ComponentMeta<typeof Radio>;

const TemplatePrimary: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  checked: true,
};
