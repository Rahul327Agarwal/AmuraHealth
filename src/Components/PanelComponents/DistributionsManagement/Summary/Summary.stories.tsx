import { Meta, Story } from '@storybook/react';
import React from 'react';
import Summary from './Summary';
import { IProps } from './Summary.types';
export default {
  title: 'PanelComponets/DistributionManagement/Summary',
  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: '#FFFFFF' },
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
      ],
    },
  },
  component: Summary,
} as Meta;

const Template: Story<IProps> = (args) => <Summary {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  injectComponent: '',
  handleSelectSnippet: () => {},
  selectedTopic: 'description',
  authorName: 'John Brittas T',
  lastUpdatedDate: '22/07/2022',
  snippets: [
    { id: 'heading' },
    { id: 'description' },
    { id: 'thumbnail' },
    { id: 'attachment' },
    { id: 'response' },
    { id: 'distributionChannel' },
  ],
};
