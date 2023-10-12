import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useUserSession } from '../../../../../DisplayFramework/State/Slices/Auth';
import { useSelectedClient } from '../../../../../DisplayFramework/State/Slices/DisplayFramework';
import ChatSelect from '../../../../LibraryComponents/MUIChatSelect/MUIChatSelect';
import { useChatOpenedFlyout, useSetChatOpenedFlyout } from '../ChatInput/ChatFlyout/ChatFlyout.state';
import { surveySendMsgAPI } from './SurveyComp.functions';

const SurveySelectPopUp = () => {
  const setChatFlyout = useSetChatOpenedFlyout();
  const { props: flyoutProps } = useChatOpenedFlyout();
  const { id: panelId } = useCurrentPanel();
  const selectedClient = useSelectedClient();
  const session = useUserSession();

  const onSubmitResponse = async (selectedRes: any[]) => {
    const responseData = (selectedRes && (Array.isArray(selectedRes) ? selectedRes : [selectedRes])) || [];

    if (!responseData.length) return;

    const response = await surveySendMsgAPI(panelId, selectedClient, session, flyoutProps?.messageData, responseData, true);

    if (!response?.Error) {
      setChatFlyout({});
    }
  };

  return (
    <ChatSelect
      open
      options={flyoutProps?.options || []}
      values={''}
      setValues={onSubmitResponse}
      onSelectClose={() => setChatFlyout({})}
      optionsType={flyoutProps?.optionsType || 'radio'}
      headerTitle={flyoutProps?.headerTitle || ''}
      position={'bottom'}
      maxHeight={300}
      noSendAPI
    />
  );
};

export default SurveySelectPopUp;
