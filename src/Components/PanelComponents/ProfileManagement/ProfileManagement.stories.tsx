import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProfileManagement  from './ProfileManagement';
import { IProfileProps } from './ProfileManagement.types';

export default {
  title: 'PanelComponents/Profile Management/Primary',
  component: ProfileManagement,
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
} as Meta;

const TemplatePrimary: Story<IProfileProps> = (args) => <ProfileManagement {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
