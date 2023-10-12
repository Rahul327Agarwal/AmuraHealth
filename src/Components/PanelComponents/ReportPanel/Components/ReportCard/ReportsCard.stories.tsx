import React from 'react';
import { Story, Meta } from '@storybook/react';
import ReportsCard  from './ReportCard';
import { IProps } from './ReportsCard.types';

export default {
  title: 'PanelComponents/Reports/Components/ReportsCard',
  component: ReportsCard,
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

const Template: Story<IProps> = (args) => <ReportsCard {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  // Reportsdata: {
  //   reportId: '',
  //   labName: 'Micro Health Laboratories',
  //   reportDate: '12/08/2022',
  //   createdBy: 'Mr. Ranjith Kumar',
  //   createdOn: '',
  //   isSelected: true,
  //   isDeactivate: false,
  //   reason: '',
  // },
  // icons: [
  //   { value: 'download', label: 'Download', icon: pageDownloadIcon },
  //   { value: 'edit', label: 'Edit', icon: pageEditIcon },
  //   { value: 'viewEditHistory', label: 'View edit History', icon: pageHistoryIcon },
  //   { value: 'deactivate', label: 'Deactivate', icon: pageCloseIcon },
  // ],
};
