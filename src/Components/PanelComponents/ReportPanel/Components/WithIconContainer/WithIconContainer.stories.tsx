import React from 'react';
import { Story, Meta } from '@storybook/react';
import WithIconContainer  from './WithIconContainer';
import { IProps } from './WithIconContainer.types';

export default {
  title: 'PanelComponents/Reports/Components/WithIconContainer',
  component: WithIconContainer,
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

const Template: Story<IProps> = (args) => <WithIconContainer {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
