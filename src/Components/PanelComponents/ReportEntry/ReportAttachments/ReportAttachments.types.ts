export interface IProps {
  open: boolean;
  deleteFile(name: any): void;
  handleOpen: (event: any) => void;
  reportId: string;
  fileList: Array<any>;
  editReport: boolean;
  sessions: any;
}
