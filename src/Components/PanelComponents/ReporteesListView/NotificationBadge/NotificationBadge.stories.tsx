import React from 'react';
import { Story, Meta } from '@storybook/react';
import NotificationBadge from './NotificationBadge';
import { IProps } from './NotificationBadge.types';

export default {
  title: 'Reportees List view home/Notification Badge',
  component: NotificationBadge,
  parameters: {
    backgrounds: {
      defaulut: 'Light',
      values: [{ name: 'Light', value: '#FFFFFF' }],
    },
  },
} as Meta;
const TemPrimary: Story<IProps> = (args) => <NotificationBadge {...args} />;
export const Primary = TemPrimary.bind({});
Primary.args = {
  badgeBgColor: 'green',
  badgeTextColor: 'white',
  badgeContent: '',
};
