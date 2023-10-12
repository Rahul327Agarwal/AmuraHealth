import React from 'react';
import { Story, Meta } from '@storybook/react';
import RolesBrowse from './RolesBrowseNew';
import { IProps } from './RolesBrowse.types';

export default {
  title: 'PanelCompoenents/RolesBrowse',
  component: RolesBrowse,
  parameters: {
    backgrounds: {
      default: 'Panel',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <RolesBrowse {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  // roles: [
  //   {
  //     roleName: 'Amura',
  //     roleId: 'Amura',
  //     reportsTo: 'AMURA , APOLLO , SATURN , CHENNAI',
  //     reportees: 'AMURA , APOLLO , SATURN , CHENNAI',
  //     shiftSegments: [],
  //   },
  // ],
};
