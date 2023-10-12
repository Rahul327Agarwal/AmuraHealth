export interface IProps {
  mainCardData: any;
  parentprop: any;
  handleOnCardClick: Function;
  handleDeactivate: Function;
  selectedCard: Array<string>;
  mainCardUser: string;
  handleNoteEdit: (data?: any) => void;
}
