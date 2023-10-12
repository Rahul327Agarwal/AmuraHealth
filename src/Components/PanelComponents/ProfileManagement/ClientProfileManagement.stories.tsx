import React from 'react';
import { Story, Meta } from '@storybook/react';
import ProfileManagement from './ClientProfileManagement';

export default {
  title: 'PanelComponents/Profile Management/ClientProfileManagement',
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

const TemplatePrimary: Story<any> = (args) => <ProfileManagement {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
