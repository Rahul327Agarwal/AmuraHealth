export interface IProps {
   clickableElement: React.ReactElement;
   disabled?: boolean | null | undefined;
   confirmationHeader?: string;
   confirmationMessage: string;
   confirmLabel?: string;
   cancelLabel?: string;
   onConfirm: Function;
   onCancel: Function;
   showRedButton?: boolean;
  }