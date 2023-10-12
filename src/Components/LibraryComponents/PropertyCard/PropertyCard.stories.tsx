import React from 'react';
import { Story, Meta } from '@storybook/react';
import PropertyCard  from './PropertyCard';
import { IProps } from './PropertyCard.types';
export default {
  title: 'LibraryComponents/PropertyCard',
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
  component: PropertyCard,
} as Meta;

const Template: Story<IProps> = (args) => <PropertyCard {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  //   contentHeading: 'Language matching',
  //   hoverContent: `Can staff speak/write in the language
  //     preferred by the patient.`,
  //   contentText: 'English, Hindi',
  //   progressBar: [
  //     { progressValue: '50', progreesColor: '#0096C7' },
  //     { progressValue: '21', progreesColor: '#F3752B' },
  //     { progressValue: '7', progreesColor: '#FF3B30' },
  //   ],
};
