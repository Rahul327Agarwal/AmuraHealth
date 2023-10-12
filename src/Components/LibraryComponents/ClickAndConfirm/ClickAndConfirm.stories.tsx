import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IProps } from './ClickAndConfirm.types';
import ClickAndConfirm from './ClickAndConfirm';
export default {
  title: 'LibraryComponents/ClickAndConfirm',

  parameters: {
    backgrounds: {
      default: 'Panel',
      values: [
        { name: 'Dark', value: '#000000' },
        { name: 'Panel', value: '#1B1B1B' },
        { name: 'Light', value: '#FFFFFF' },
      ],
    },
  },
  component: ClickAndConfirm,
} as Meta;

const TemplatePrimary: Story<IProps> = (args) => <ClickAndConfirm {...args} />;
export const Primary = TemplatePrimary.bind({});
Primary.args = {
  // clickableElement: 'this',
  confirmationHeader: 'Amura Health',
  confirmationMessage: 'are sure you want to delete this',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  onConfirm: () => {
    console.log('Clicked');
  },
  onCancel: () => {
    console.log('cancelled');
  },
};
