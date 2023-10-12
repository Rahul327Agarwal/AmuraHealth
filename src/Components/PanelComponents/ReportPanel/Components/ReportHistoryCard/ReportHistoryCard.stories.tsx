import React from 'react';
import { Story, Meta } from '@storybook/react';
import ReportHistoryCard  from './ReportHistoryCard';
import { IProps } from './ReportHistoryCard.types';

export default {
  title: 'PanelComponents/Reports/Components/ReportHistoryCard',
  component: ReportHistoryCard,
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

const Template: Story<IProps> = (args) => <ReportHistoryCard {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  unitId: '111',
  updatedBy: '948aee3d-6712-48a9-a03b-c926f5f99915',
  action: 'UPDATE',
  label: 'cholestrol',
  updatedOn: '2022-11-16T12:38:40.449Z',
  value: '200',
};
