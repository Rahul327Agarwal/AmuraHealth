import { Meta, Story } from '@storybook/react';
import React from 'react';
import Preview  from './Preview';
import { IProps } from './Preview.types';
export default {
  title: 'PanelComponents/Post Management/Preview',
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
  component: Preview,
} as Meta;

const Template: Story<IProps> = (args) => <Preview {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
