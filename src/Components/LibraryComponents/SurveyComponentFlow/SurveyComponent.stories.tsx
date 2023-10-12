import { Meta, Story } from '@storybook/react';
import React from 'react';
import SurveyComponent from './SurveyComponentFlow';
export default {
  title: 'Survey component',
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
  component: SurveyComponent,
} as Meta;

const Template: Story = (args) => <SurveyComponent {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  title: 'survey tile ',
  question: 'sample question ',
  type: 'multi',
};
