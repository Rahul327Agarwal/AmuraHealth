export interface IProps {
  isOpen: boolean;
  variant?: "primary" | "withinput";
  header?: string;
  body?: string;
  descriptionPlaceHolder?: string;
  description?: string;
  handleDescriptionChange?: Function;
  saveButtonLabel: string;
  cancelButtonLabel: string;
  handleSave: Function;
  handleCancel: Function;
  disableSaveButton?: boolean;
  panelWidth?: string;
  buttonStyles?:boolean;
}
