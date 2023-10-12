import React from 'react';
import { Story, Meta } from '@storybook/react';
import ConfirmWithReasonDrawer  from './ConfirmWithReasonDrawer';
import { IProps } from './ConfirmWithReasonDrawer.types';

export default {
  title: 'PanelComponents/Reports/Components/ConfirmWithReasonDrawer',
  component: ConfirmWithReasonDrawer,
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

const Template: Story<IProps> = (args) => <ConfirmWithReasonDrawer {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
