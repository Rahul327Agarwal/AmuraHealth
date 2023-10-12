export interface IProps {
  caller?: string;
  data?: any;
  handleOnCardClick?: Function;
  index?: number;
  expand?: boolean;
  showEditIcon?: boolean;
  handleDeactivate?: Function;
  userName: string;
  handleNoteEdit: (data?: any) => void;
}
