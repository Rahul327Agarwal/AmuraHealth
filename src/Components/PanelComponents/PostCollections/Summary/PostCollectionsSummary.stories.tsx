import { Meta, Story } from '@storybook/react';
import React from 'react';
import PostCollectionsSummary  from './PostCollectionsSummary';
import { IProps } from './PostCollectionsSummary.types';
export default {
  title: 'PanelComponents/Post Collections/Summary',
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
  component: PostCollectionsSummary,
} as Meta;

const Template: Story<IProps> = (args) => <PostCollectionsSummary {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
