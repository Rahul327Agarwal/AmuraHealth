import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ModalBox  from './ModalBox';

export default {
  title: 'LibraryComponents/ModalBox',
  component: ModalBox,
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
} as ComponentMeta<typeof ModalBox>;

const Template: ComponentStory<typeof ModalBox> = (args) => <ModalBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  open: true,
  modalTitle: 'Text modal header',
  children: 'Some Children Content... Some Children Content... ',
  handleClose: () => {},
  buttonConfig: [
    { text: 'Cancel', variant: 'text', onClick: () => {} },
    { text: 'Ok', variant: 'contained', onClick: () => {} },
  ],
};
