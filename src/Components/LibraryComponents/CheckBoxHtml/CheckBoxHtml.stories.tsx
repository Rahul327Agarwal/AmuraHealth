import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import CheckBoxHtml  from './CheckBoxHtml';

export default {
  title: 'LibraryComponents/CheckBoxHtml',
  component: CheckBoxHtml,
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
} as ComponentMeta<typeof CheckBoxHtml>;

const Template: ComponentStory<typeof CheckBoxHtml> = (args) => <CheckBoxHtml {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Amura',
  sublabel: 'healthcare',
  handleCheck: () => {},
  handleAnswer: () => {},
};
