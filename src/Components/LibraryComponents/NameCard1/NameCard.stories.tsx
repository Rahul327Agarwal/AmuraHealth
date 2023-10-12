import React from 'react';
import { Story, Meta } from '@storybook/react';
import NameCard from './NameCard1';
import { IProps } from './NameCard.types';
import { AmuraIcon, PlusIcon, PostCollections, PostIcon, QuestionIcon } from './NameCard.svg';

export default {
  title: 'LibraryComponents/NewNameCard',
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
  component: NameCard,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <NameCard {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  id: '12345',
  profilePicURL: '',
  profilePic: <PostIcon />,
  tenentIcon: <AmuraIcon />,
  title: 'Health of happiness',
  hasBlueDot: true,
  hasBlackDot: true,
  endActionButton: <PlusIcon />,
  caption: 'Edit',
  iconTray: [<PostCollections />, <QuestionIcon />],
  content: '7 Posts',
  // SLA: {
  //   StartTime: "1",
  //   EndTime: "10",
  //   Title: "Time",
  //   CreatedTime: "0",
  // },
  isExtend: false,
  openClient: () => {},
  customStyle: 'string',
  isSelected: false,
  isClientSelected: false,
  // isBorderRadius: false,
  // isEmergency: false,
};
