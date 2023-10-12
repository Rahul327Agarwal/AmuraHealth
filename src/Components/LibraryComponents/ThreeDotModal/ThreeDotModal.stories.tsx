import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ThreeDotModal  from './ThreeDotModal';

export default {
  title: 'LibraryComponents/ThreeDotModal',
  component: ThreeDotModal,
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
} as ComponentMeta<typeof ThreeDotModal>;

const Template: ComponentStory<typeof ThreeDotModal> = (args) => <ThreeDotModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isReverse: true,
  children: <>Hello</>,
};
