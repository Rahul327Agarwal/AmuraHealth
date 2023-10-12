export type VirtualChatMessage = {
  _id: string;
  isOurMessage: boolean;
};

export interface VirtualChatProps<T extends VirtualChatMessage> {
  messages: T[];
  renderFn: (message: T, index: number) => JSX.Element;
  isFetching: boolean;
  onFetchMore: () => Promise<void>;
  messageBodyRef: React.MutableRefObject<HTMLDivElement>;
}
