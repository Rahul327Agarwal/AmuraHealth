import { Meta, Story } from '@storybook/react';
import React from 'react';
import ThreeDotActionMenu  from './ThreeDotActionMenu';
import { ThreeDotActionMenuProps } from './ThreeDotActionMenu.types';
export default {
  title: 'PanelComponents/Post Collections/ThreeDotActionMenu',
  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: '#FFFFFF' },
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
      ],
    },
  },
  component: ThreeDotActionMenu,
} as Meta;

const Template: Story<ThreeDotActionMenuProps> = (args) => <ThreeDotActionMenu {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  options: [
    {
      title: 'Hide',
      type: 'label',
      value: '',
      subMenu: [
        // { title: 'Title', value: 'TITLE', type: 'checkbox' },
        // { title: 'Description', value: 'DESCRIPTION', type: 'checkbox' },
      ],
    },
    // { title: 'Configure Branching', value: 'CONFIGURE_BRANCHING', type: 'label' },
    // { title: 'Delete', value: 'DELETE', type: 'label', disable: true },
  ],
  handleOnClick: (data: any, type: any) => {},
};
