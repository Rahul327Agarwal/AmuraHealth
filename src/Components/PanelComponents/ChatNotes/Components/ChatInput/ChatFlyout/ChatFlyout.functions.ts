import { ChatFlyoutCommonProps, ChatFlyoutsKey, chatFlyoutComponentMap } from './ChatFlyoutComponentMap';

export function getChatFlyoutComponent(flyout?: ChatFlyoutsKey): React.FunctionComponent<ChatFlyoutCommonProps> {
  if (!flyout) return undefined;
  const flyoutCompo = chatFlyoutComponentMap[flyout];
  return flyoutCompo?.component as React.FunctionComponent<ChatFlyoutCommonProps>;
}
