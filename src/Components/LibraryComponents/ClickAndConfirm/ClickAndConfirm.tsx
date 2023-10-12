import PopUp from '../PopUp/PopUp';
import React from 'react';
import { IProps } from './ClickAndConfirm.types';

export default function ClickAndConfirm(props: IProps) {
  const {
    clickableElement,
    disabled,
    confirmationHeader,
    confirmationMessage,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
    showRedButton,
  } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <span
        onClick={() => {
          if (!disabled) setIsOpen(true);
        }}
      >
        {clickableElement}
      </span>
      <PopUp
        variant={'primary'}
        buttonStyles={showRedButton}
        isOpen={isOpen}
        header={confirmationHeader}
        body={confirmationMessage}
        saveButtonLabel={confirmLabel!}
        cancelButtonLabel={cancelLabel!}
        handleSave={() => {
          onConfirm();
        }}
        handleCancel={() => {
          setIsOpen(false);
          onCancel();
        }}
      />
    </div>
  );
}
