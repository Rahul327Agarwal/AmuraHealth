import { IComponentMessage } from '../Chat.types';

export interface IProps {
  message: IComponentMessage;
  index: number;
  messageType: string;
  showConfirm: boolean;
  selectedOption: any;
  disableConfirm: any;
  handleSurveyInput: Function;
  confirmSelection: Function;
}
