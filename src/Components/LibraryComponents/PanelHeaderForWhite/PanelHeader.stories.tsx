import { ComponentMeta, ComponentStory } from '@storybook/react';
import PanelHeaderForWhite  from './PanelHeaderForWhite';

export default {
  title: 'LibraryComponents/PanelHeaderForWhite',
  component: PanelHeaderForWhite,
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
} as ComponentMeta<typeof PanelHeaderForWhite>;

const Template: ComponentStory<typeof PanelHeaderForWhite> = (args) => <PanelHeaderForWhite {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
