import React from 'react';
import { Story, Meta } from '@storybook/react';
import ReportEditHistory  from './ReportEditHistory';
import { IReportViewHome } from '../ReportView/ReportView.types';

export default {
  title: 'PanelComponents/Reports/ReportEditHistory',
  component: ReportEditHistory,
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

const Template: Story<IReportViewHome> = (args) => <ReportEditHistory {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
