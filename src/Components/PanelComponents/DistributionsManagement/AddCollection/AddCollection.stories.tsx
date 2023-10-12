import { Meta, Story } from '@storybook/react';
import React from 'react';
import AddCollection  from './AddCollection';
import { AddCollectionProps } from './AddCollection.types';

export default {
  title: 'PanelComponents/Distributions Management/AddCollection',
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
  component: AddCollection,
} as Meta;

const Template: Story<AddCollectionProps> = (args) => <AddCollection {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  // panel: { height: '1000px' },
};
