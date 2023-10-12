export interface IProps {
  maxHeight?: string | number;
  minHeight?: string | number;
  children?: JSX.Element | JSX.Element[];
  apiRef?: (api: ChatScrollAreaApi) => void;
  loadOldMessagesThreshold: number;
  onLoadOldMessages: Function;
  sessions: any;
  setShowScrollDownIcon: Function;
  setLastScrollDistanceToBottomRef: Function;
  lastScrollDistanceToBottomRef: any;
  previousScrollTop: any;
  setPreviousScrollTop: Function;
}

export interface ChatScrollAreaApi {
  scrollToBottom: (behavior?: ScrollBehavior) => void;
  scrollTo: (top: number) => void;
  scrollTop: () => number;
  scrollHeight: () => number;
  clientHeight: () => number;
  scrolledToBottom: () => boolean;
  scrolledToLoadThreshold: () => boolean; // Check if we are scrolled to threshold where we need to load messages
  showScrollDownIcon: () => boolean;
}
