import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import CheckBoxGroup  from './CheckBoxGroup';

export default {
  title: 'LibraryComponents/CheckBoxGroup',
  component: CheckBoxGroup,
  argTypes: { backgroundColor: { control: 'color' } },
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
} as ComponentMeta<typeof CheckBoxGroup>;

const Template: ComponentStory<typeof CheckBoxGroup> = (args) => <CheckBoxGroup {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  slectedAnswers: () => {},
  values: [
    { name: 'opt1', desc: 'tablet' },
    { name: 'opt2', desc: 'tablet2' },
    { name: 'opt3', desc: 'tablet3' },
    { name: 'opt4', desc: 'tablet4' },
  ],
};
