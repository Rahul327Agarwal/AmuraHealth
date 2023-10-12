import { ComponentMeta, ComponentStory } from '@storybook/react';
import ViewTypeDrawer  from './ViewTypeDrawer';
import React from 'react';

export default {
  title: 'PanelComponents/SchedulerCalendar/Components/ViewTypeDrawer',
  component: ViewTypeDrawer,
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
} as ComponentMeta<typeof ViewTypeDrawer>;

const Template: ComponentStory<typeof ViewTypeDrawer> = (args) => <ViewTypeDrawer {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
