import React from 'react';
import { Story, Meta } from '@storybook/react';
import MUITooltip  from './MUITooltip';
import { IProps } from './MUITooltip.types';

export default {
  title: 'LibraryComponents/MUITooltip',
  component: MUITooltip,
  parameters: {
    backgrounds: {
      default: 'Panel',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <MUITooltip {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
