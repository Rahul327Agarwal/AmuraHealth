import { Meta, Story } from '@storybook/react';
import React from 'react';
import StaffCard from './StaffCard';
import { IProps } from './StaffCard.types';
export default {
  title: 'Bulk Assignment/StaffCard1',
  component: StaffCard,
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

const Template: Story<IProps> = (args) => <StaffCard {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  cardId: 'Cody Fisher',
  displayName: 'Cody Fisher',
  subLabel: '2 Roles, 6 Cards',
  profilePicURL: '',
  onSelect: (cardId: string) => {},
  isSelected: false,
  selectType: 'checkbox',
  isSmallCard: false,
  errorMessage: 'Failed (1)',
};
