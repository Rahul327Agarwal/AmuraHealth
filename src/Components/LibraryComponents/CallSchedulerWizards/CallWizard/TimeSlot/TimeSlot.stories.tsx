import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import TimeSlot  from './TimeSlot';

export default {
  title: 'LibraryComponents/TimeSlot',
  component: TimeSlot,
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
    timeSlot: new Date('2022-03-01T13:00:00.000Z'),
    participants: [
      { name: 'Mano', color: '#CC444B', id: 'Mano' },
      { name: 'Mani', color: '#252427', id: 'Mani' },
    ],
    isSelected: false,
  },
};

export const Primary = ({ ...args }) => {
  const [{ timeSlot, participants, isSelected }, updateArgs] = useArgs();
  const handleSelected = (e: any) => updateArgs({ isSelected: true });

  return (
    <div>
      <TimeSlot timeSlot={timeSlot} participants={participants} isSelected={isSelected} handleClick={handleSelected} {...args} />
    </div>
  );
};
