import React from 'react';
import { Story, Meta } from '@storybook/react';
import ReportAddEdit  from './ReportAddEdit';
import { IProps } from './ReportAddEdit.types';

export default {
  title: 'PanelComponents/Reports/Report Add or Edit',
  component: ReportAddEdit,
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

const Template: Story<IProps> = (args) => <ReportAddEdit {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  editData: {
    reportId: '3124121',
    reportDate: new Date(),
    sampleDate: new Date(),
    labName: 'Micro Health Laboratories',
    labId: '123123s',
    biomarkers: [
      // { id: '11', name: 'ANA (Antinuclear Antibody) Test', unit: 'mEq', value: '1123' },
      // { id: '22', name: 'ANA (Antinuclear Antibody) Test', unit: 'mEq', value: '112' },
      // { id: '33', name: 'ANA (Antinuclear Antibody) Test', unit: 'mEq', value: '31' },
    ],
  },
};
