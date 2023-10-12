export interface IProps {
  handleSave: (file: any) => void;
  rerenderFlag: any;
  setRerenderFlag: (flag: any) => void;
  files: any;
  multiple: any;
  onClose?: Function;
  setDisableSend?: any;
  selectedFile?: any[];
  pastedClipboardFile?: boolean;
  setPastedClipboardFile?: Function;
  focusMessageInput?: Function;
  openReply?: boolean;
}
