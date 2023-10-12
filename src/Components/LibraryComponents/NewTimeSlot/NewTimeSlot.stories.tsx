import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import NewTimeSlot from './NewTimeSlot';

export default {
  title: 'LibraryComponents/NewTimeSlot',
  component: NewTimeSlot,
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
  args: {
    timeSlot: new Date('2022-03-01T12:00:00.000Z'),
    participants: [
      { name: 'Mano', color: '#FF9110', id: 'Mano' },
      { name: 'Mani', color: '#CEEF00', id: 'Mani' },
    ],
    isSelected: false,
  },
};

export const Primary = ({ ...args }) => {
  const [{ timeSlot, participants, isSelected }, updateArgs] = useArgs();
  const handleSelected = (e: any) => updateArgs({ isSelected: true });

  return (
    <div>
      <NewTimeSlot
        slotDetails={undefined}
        timeSlot={timeSlot}
        participants={participants}
        isSelected={isSelected}
        handleClick={handleSelected}
        {...args}
      />
    </div>
  );
};
