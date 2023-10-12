import React from 'react';
import { Story, Meta } from '@storybook/react';
import Reports  from './ReportView';
import { IReportViewHome } from './ReportView.types';

export default {
  title: 'PanelComponents/Reports/ReportView',
  component: Reports,
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

const Template: Story<IReportViewHome> = (args) => <Reports {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
