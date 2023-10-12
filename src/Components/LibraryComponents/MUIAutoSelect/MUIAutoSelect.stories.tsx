import { ComponentMeta, ComponentStory } from '@storybook/react';
import MUIAutoSelect  from './MUIAutoSelect';
import React from 'react';

export default {
  title: 'LibraryComponents/MUIAutoSelect',
  component: MUIAutoSelect,
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
} as ComponentMeta<typeof MUIAutoSelect>;

const Template: ComponentStory<typeof MUIAutoSelect> = (args) => <MUIAutoSelect {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  options: [
    { label: 'The Shawshank Redemption', value: 'The Shawshank Redemption', subLabel: 'Senior Physician' },
    { label: 'The Godfather', value: 'The Godfather', subLabel: 'Senior Physician' },
    { label: 'The Godfather: Part II', value: 'The Godfather: Part II', subLabel: 'Senior Physician' },
    { label: 'The Dark Knight', value: 'The Dark Knight', subLabel: 'Senior Physician' },
    { label: '12 Angry Men', value: '12 Angry Men', subLabel: 'Senior Physician' },
    { label: "Schindler's List", value: "Schindler's List", subLabel: 'Senior Physician' },
  ],
  InputProps: { label: 'Organizer / Paticipant', placeholder: 'Organizer / Paticipant' },
  onChange: () => {},
  // value: [],
  OptionMenuProps: {
    // reverseCheckbox: true,
    variant: 'checkbox',
    // inlineLabel: true,
  },
  multiple: true,
  open: true,
  disableCloseOnSelect: true,
};
