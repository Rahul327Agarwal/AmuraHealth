import React from 'react';
import { Story, Meta } from '@storybook/react';
import BookingAvaibility from './BookingAvaibility';
import { IProps } from './CallWizard.types';

export default {
  title: 'LibraryComponents/BookingAvaibility',
  component: BookingAvaibility,
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

const TemplatePrimary: Story<IProps> = (args) => <BookingAvaibility {...(args as any)} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {};
