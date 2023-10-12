export type DLCustomActionMap = {
  homeModuleClick: {};
  'my-list-card': {
    cardId: string;
  };
  'chat-message': {
    messageId: string;
  };
};

export type CustomActionIdentifier = keyof DLCustomActionMap;
