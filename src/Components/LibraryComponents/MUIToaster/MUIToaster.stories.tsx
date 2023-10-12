import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import MUIToaster  from './MUIToaster';

export default {
  title: 'LibraryComponents/MUIToaster',
  component: MUIToaster,
  argTypes: { backgroundColor: { control: 'color' } },
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
} as ComponentMeta<typeof MUIToaster>;

const Template: ComponentStory<typeof MUIToaster> = (args) => <MUIToaster {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'success',
  message: 'Report updated Successfully ',
};
