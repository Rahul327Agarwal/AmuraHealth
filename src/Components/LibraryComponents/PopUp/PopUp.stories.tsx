import React from 'react';
import PopUp from './PopUp';
import { useArgs } from '@storybook/preview-api';

export default {
  title: 'LibraryComponents/PopUp',
  component: PopUp,
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
  args: {
    variant: 'primary',
    header: 'Header',
    body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    isOpen: true,
    description: '',
    value: 'Amura',
    onChange: (e: any) => {
      console.log(e, 'Changed');
    },
    descriptionPlaceHolder: 'Enter the description',
    handleCancel: () => {
      console.log('handleCancel');
    },
    handleDescriptionChange: (e: any) => {
      console.log('handleDescriptionChange', e);
    },
    handleSave: () => {
      console.log('handleSave');
    },
    cancelButtonLabel: 'Cancel',
    saveButtonLabel: 'Save',
  },
};

export const Primary = ({ ...args }) => {
  const [
    { isOpen, descriptionPlaceHolder, description, handleDescriptionChange, saveButtonLabel, cancelButtonLabel, handleSave },
    updateArgs,
  ] = useArgs();
  const handleCancel = () => updateArgs({ isOpen: false });

  return (
    <div>
      <PopUp
        isOpen={isOpen}
        descriptionPlaceHolder={descriptionPlaceHolder}
        description={description}
        handleDescriptionChange={handleDescriptionChange}
        saveButtonLabel={saveButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        handleSave={handleSave}
        handleCancel={handleCancel}
        {...args}
      />
    </div>
  );
};
