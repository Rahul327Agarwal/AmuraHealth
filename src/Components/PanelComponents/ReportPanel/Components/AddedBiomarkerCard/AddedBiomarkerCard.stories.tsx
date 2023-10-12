import React from 'react';
import { Story, Meta } from '@storybook/react';
import AddedBiomarkerCard  from './AddedBiomarkerCard';
import { IProps } from './AddedBiomarkerCard.types';

export default {
  title: 'PanelComponents/Reports/Components/AddedBiomarkerCard',
  component: AddedBiomarkerCard,
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

const Template: Story<IProps> = (args) => <AddedBiomarkerCard {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
