import { Meta, Story } from '@storybook/react';
import React from 'react';
import Preview  from './postPreview1';
import { IProps } from './Preview.types';
export default {
  title: 'PanelComponents/Post Collections/Preview/PostPreview1',
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
