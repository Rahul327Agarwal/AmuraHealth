import { StandardTextFieldProps } from '@mui/material';
import { IMessage } from '../../../LibraryComponents/ChatComponent/ChatComponents.types';
import { ITag } from '../../../LibraryComponents/ChatComponent/MessageInput/MessageInput.types';

export interface IProps {
  messagesList: IMessage[];
  possibleTags: ITag[];
  staffList: Array<any>;
  selectedClient: any;
  sessions: any;
  registerEvent: any;
  unRegisterEvent: any;
  childEventTrigger: any;
  injectComponent: any;
  panel: any;
  type: any;
  botData: any;
}
export class chatVariables {
  public static showScrollDownIcon = false;
  public static scrollPosition = 0;
  public static networkConnection = null;
  public static chatConnection = true;
  public static subscription = null;
  static unsentMessages: any[];
}

type targetScreen =
  | 'REDO'
  | 'CALENDER'
  | 'TIME_INPUT'
  | 'VOTE_INPUT'
  | 'PERCENTAGE_INPUT'
  | 'SELECT_TIME_INPUT'
  | 'TIME_INTERVAL'
  | 'OFFSET_EVENT';
export interface IChatSelectType {
  open: boolean;
  options?: Array<any>;
  optionsType: 'checkbox' | 'label' | 'radio';
  headerTitle: string;
  branching?: Array<string>;
  trigger?: Array<{ id: string; target: targetScreen }>;
  message?: string;
  debounceAPI?: boolean;
}

export interface IDrawerState {
  open: boolean;
  screen: targetScreen;
  payload?: any;
}

export interface IChatNoteInputProps {
  snippetId: string;
  headerText: string;
  handleSend: Function;
  InputProps: StandardTextFieldProps;
  isPercent?: boolean;
}
export interface ITimeSelectInputProps {
  snippetId: string;
  headerText: string;
  handleProceed: Function;
}

export interface ITimeIntervalInputProps {
  snippetId: string;
  headerText: string;
  handleProceed: Function;
}
export interface ITimeOffsetEventInputProps {
  snippetId: string;
  headerText: string;
  handleProceed: Function;
}
