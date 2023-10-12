import React from 'react';
import { Story, Meta } from '@storybook/react';
import MUIBlockTabs  from './MUIBlockTabs';
import { IProps } from './MUIBlockTabs.types';
import { EditIcon } from '../../SVGs/Common';

export default {
  title: 'LibraryComponents/MUIBlockTabs',
  component: MUIBlockTabs,
  parameters: {
    backgrounds: {
      default: 'Gray',
      values: [
        { name: 'Gray', value: '#F8F8F8' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
} as Meta;

const Template: Story<IProps> = (args) => <MUIBlockTabs {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  tabOptions: [
    { tabName: 'All', tabId: 'All', isRedDot: true, isBlueDot: true, isBlackDot: true },
    { tabName: 'About tab', tabId: 'About tab', isRedDot: !true, isBlueDot: true, isBlackDot: true },
    { tabName: 'Contact tab Contact tab Contact tab', tabId: 'Contact tab', isRedDot: !true, isBlueDot: true, isBlackDot: !true },
    { tabName: 'Status only', tabId: 'Status only', isRedDot: true, isBlueDot: !true, isBlackDot: true },
    { tabName: 'other', tabId: 'other', isRedDot: true, isBlueDot: true, isBlackDot: true },
  ],
  activeTab: 'All',
  handleThreeDot: () => {},
  threeDotOption: [{ label: 'Edit Tab', value: 'EDIT_TAB', icon: <EditIcon /> }],
  onTabChange: () => {},
};
