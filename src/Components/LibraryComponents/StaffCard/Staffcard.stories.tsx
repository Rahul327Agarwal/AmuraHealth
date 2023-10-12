import React from 'react';
import { Story, Meta } from '@storybook/react';
import Staffcard  from './StaffCard';
import { IProps } from './Staffcard.types';
export default {
  title: 'LibraryComponents/Staffcard',
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
  component: Staffcard,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <Staffcard {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  userId: 'ec7f0583-4cef-408d-a999-f30820883419',
  profileName: 'Theresa Webb',
  // userInfo: { Name: "", username: "Theresa Webb", FirstName: "Theresa", LastName: "Webb" },
  userProfile: 'Physician',
  ratingValue: '4.3',
  lastSeen: '04:00 PM',
  // roleId: "Doctor"
};
