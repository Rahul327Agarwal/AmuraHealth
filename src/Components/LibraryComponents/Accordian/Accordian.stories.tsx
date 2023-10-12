import { ComponentMeta, ComponentStory } from '@storybook/react';
import Accordian  from './Accordian';
import React from 'react';

export default {
  title: 'LibraryComponents/Accordian',
  component: Accordian,
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
} as ComponentMeta<typeof Accordian>;

const Template: ComponentStory<typeof Accordian> = (args) => <Accordian {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  accordianTitle: 'Accordion 1',
  children: (
    <span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
    </span>
  ),
};
