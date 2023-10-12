import { Meta, Story } from '@storybook/react';
import React from 'react';
import PanelFooter  from './PanelFooter';
import { IProps } from './PanelFooter.types';
export default {
  title: 'LibraryComponents/PanelFooter',
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
  component: PanelFooter,
} as Meta;

const Template: Story<IProps> = (args) => <PanelFooter {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
