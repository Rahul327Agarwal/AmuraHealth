import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CachedAvatar } from './CachedAvatar';

export default {
  title: 'LibraryComponents/CachedAvatar',
  component: CachedAvatar,
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
} as ComponentMeta<typeof CachedAvatar>;
const Template: ComponentStory<typeof CachedAvatar> = (args) => <CachedAvatar {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  src: '/avatar.png',
  children:'kl'
};
