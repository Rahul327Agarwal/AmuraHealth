import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ThreeDotMenu  from './ThreeDotMenu';
import { ConfigurationIcon, PeoplesIcon } from '../../SVGs/Common';

export default {
  title: 'LibraryComponents/ThreeDotMenu',
  component: ThreeDotMenu,
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
} as ComponentMeta<typeof ThreeDotMenu>;

const Template: ComponentStory<typeof ThreeDotMenu> = (args) => <ThreeDotMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  options: [
    { label: 'Configuration', value: 'configuration', icon: <ConfigurationIcon /> },
    { label: 'People', value: 'people', icon: <PeoplesIcon /> },
  ],
  handleClick: () => {},
  isReverse: true,
  isDivider: true,
};
