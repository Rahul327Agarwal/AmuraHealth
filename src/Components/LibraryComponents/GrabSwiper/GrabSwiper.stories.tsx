import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import GrabSwiper from './GrabSwiper';

export default {
  title: 'LibraryComponents/GrabSwiper',
  component: GrabSwiper,
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
} as ComponentMeta<typeof GrabSwiper>;

const Template: ComponentStory<typeof GrabSwiper> = (args) => <GrabSwiper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  gap: 10,
  isNavigation: false,
  onClick: () => {},
  navButtonSensitivity: 120,
  children: <div></div>,
};
