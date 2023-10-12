import { Meta, Story } from '@storybook/react';
import React from 'react';
import PostCollection  from './prePreview';
import { IProps } from './Preview.types';
export default {
  title: 'PanelComponents/Post Collections/Preview/PostPreview/Primary',
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
  component: PostCollection,
} as Meta;

const Template: Story<IProps> = (args) => <PostCollection {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  // heading:"Immunity Importance",
  // previewData:{
  //  titile:"Description",
  //  description:"Lorem ipsum dolor sit amet, consectetur adipis cing elit. Sollicitudin viverra"
  // }
};
