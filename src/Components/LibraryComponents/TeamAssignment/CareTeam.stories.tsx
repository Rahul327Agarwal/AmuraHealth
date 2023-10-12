import React from 'react';
import { Story, Meta } from '@storybook/react';
import CareTeam from './CareTeam';
import { IProps } from './CareTeam.types';
export default {
  title: 'Team Assignment/CareTeam',
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
  component: CareTeam,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <CareTeam {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
