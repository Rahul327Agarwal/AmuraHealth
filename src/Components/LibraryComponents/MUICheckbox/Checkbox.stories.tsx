import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Checkbox from './MUICheckbox';
import { IProps } from './Checkbox.types';

export default {
  title: 'LibraryComponents/Checkbox',
  component: Checkbox,
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
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  checked: true,
};
