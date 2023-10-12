import React from 'react';
import { Story, Meta } from '@storybook/react';
import ReporteesCardGrid from './ReporteesCardGrid';
import { IProps } from './ReporteesCardGrid.types';

export default {
  title: 'Reportees List view home/Reportees Card Grid',
  component: ReporteesCardGrid,
  parameters: {
    backgrounds: {
      defaulut: 'Light',
      values: [{ name: 'Light', value: '#FFFFFF' }],
    },
  },
} as Meta;
const TemPrimary: Story<IProps> = (args) => <ReporteesCardGrid {...args} />;
export const Primary = TemPrimary.bind({});
Primary.args = {
  staffId: '123',
  staffName: 'mano',
  roleId: '0',
  level: 1,
  firstChild: true,
  lastChild: false,
  hasChildren: false,
  parentIsLastChild: false,
  parentLastChildIndex: [],
  uniqueKey: 'tester_role###mano_0',
};
