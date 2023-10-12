import React from 'react';
import { Story, Meta } from '@storybook/react';
import BiomarkerCard  from './BiomarkerCard';
import { IProps } from './BiomarkerCard.types';

export default {
  title: 'PanelComponents/Reports/Components/BiomarkerCard1',
  component: BiomarkerCard,
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

const Template: Story<IProps> = (args) => <BiomarkerCard {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
