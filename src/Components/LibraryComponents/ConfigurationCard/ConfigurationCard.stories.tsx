import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ConfigurationCard  from './ConfigurationCard';

export default {
  title: 'LibraryComponents/ConfigurationCard',
  component: ConfigurationCard,
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
} as ComponentMeta<typeof ConfigurationCard>;

const Template: ComponentStory<typeof ConfigurationCard> = (args) => <ConfigurationCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  imgUrl: '',
  cardTitle: 'Biomarkers',
  cardCaption: 'Biomarkers are blood markers.',
  recordTitle: '1200 records',
  time: '14:30',
  //   label: "Primary",
  //   variant: "primary",
  //   handleClick: () => {
  //   },
};
