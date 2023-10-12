import React, { useEffect, useState } from 'react';
import { isValidNumber, isValidNumberOrEmpty } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { PMS_S3 } from '../../../../Utils';
import { SendIcon } from '../../../SVGs/Common';
import HistoryDataList from '../../HistoryData/HistoryDataList';
import { IHistoryData } from '../../HistoryData/HistoryDataList.types';
import InputField from '../../InputField/InputField';
import Button from '../../MUIButton/MUIButton';
import MUIDrawer from '../../MUIDrawer/MUIDrawer';
import MUISkeleton from '../../MUISkeleton/MUISkeleton';
import { getProfileKeysHistoryData } from '../WeightPopUp/WeightPopUp.functions';
import { DUMMY_HISTORY_DATA } from '../WeightPopUp/WeightPopUp.types';
import ErrorToaster from './../../../../Common/ErrorToaster';
import { useStyles } from './BPPopUp.styles';
import { IProps } from './BPPopUp.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { ChatFlyoutDrawer } from '../../../PanelComponents/ChatNotes/Components/ChatInput/ChatFlyout/ChatFlyoutDrawer';
import { useListenToChatSendEvent } from '../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatSend.hooks';
import { ChatInputState } from '../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatInput.state';
import { useAtom } from 'jotai';

const initBpState = { mm: '', hg: '' };

export default function BPPopUp(props: IProps) {
  const { selectedClient, sessions, onClose } = props;

  const commonClasses = useCommonStyles();
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [bpState, setBpState] = useState(initBpState);
  const [bpError, setBpError] = useState(initBpState);
  const [historyData, setHistoryData] = useState<IHistoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disabledBtn, setDisabledBtn] = useAtom(ChatInputState.inputSendButtonDisabledAtom);

  useEffect(() => {
    (async () => {
      let gethiststoryData = await getProfileKeysHistoryData(panelId, sessions, selectedClient, 'bp', setIsLoading);
      setHistoryData(gethiststoryData);
    })();
  }, [props]);

  const onBPChange = (e) => {
    const { value, name } = e.target;
    const removingSpace = value.trim() ? value : '';
    //valid number checking without any special characters and decimal. it can allow empty also
    let regExpression = /^(?:[0-9]+)?$/;
    if (regExpression.test(removingSpace)) {
      setBpState((pre) => ({ ...pre, [name]: removingSpace }));
      bpError[name] && setBpError((pre) => ({ ...pre, [name]: '' }));
    }
  };
  const handleSend = async () => {
    let isValid = true;
    if (Number(bpState?.mm) <= 0 || !isValidNumber(bpState?.mm)) {
      setBpError((pre) => ({ ...pre, mm: 'Enter a valid input' }));
      isValid = false;
    }
    if (Number(bpState?.hg) <= 0 || !isValidNumber(bpState?.hg)) {
      setBpError((pre) => ({ ...pre, hg: 'Enter a valid input' }));
      isValid = false;
    }
    if (bpState?.hg && Number(bpState?.hg) >= 1000) {
      setBpError((pre) => ({ ...pre, hg: 'Should be less than 1000' }));
      isValid = false;
    }
    if (bpState?.mm && Number(bpState?.mm) >= 1000) {
      setBpError((pre) => ({ ...pre, mm: 'Should be less than 1000' }));
      isValid = false;
    }
    if (!isValid) return;
    setBpError(initBpState);
    try {
      setDisabledBtn(true);
      const payload = {
        EventName: 'chat-categorizer',
        ContextType: '@bp',
        userId: selectedClient.client_id,
        tenantId: selectedClient.tenant_id,
        updatedBy: sessions?.user?.id,
        keysToUpdate: {
          bp: Number(bpState.mm) + '-' + Number(bpState.hg) + ' ' + 'mmHg',
        },
        url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
        token: sessions.id_token,
        method: 'POST',
      };
      console.log('blood Pressure paylod Request', payload);
      const response = await PMS_S3.postData(payload);
      if (response.Error) ErrorToaster(response.Error, panelId, 'error');
    } catch (error) {
      ErrorToaster(error.message, panelId, 'error');
    } finally {
      setDisabledBtn(false);
      onClose();
    }
    return true;
  };

  // const handleEnter = async (e) => {
  //   if (disabledBtn) return;
  //   if (e.code === 'Enter' || e.code === 'NumpadEnter') await handleSend();
  // };

  useListenToChatSendEvent(async () => {
    const res = await handleSend();
    return res ? true : false;
  }, [handleSend]);

  return (
    <ChatFlyoutDrawer open header={'Blood Pressure'} anchor={'bottom'} className={classes.drawerWrapper}>
      <div className={classes.inputBodyWrapper}>
        <section className={classes.inputsWrapper}>
          <InputField
            helperText={bpError.mm}
            label="Enter SYS(mmHg)"
            name="mm"
            value={bpState.mm}
            onChange={onBPChange}
            autoFocus
            // onKeyDown={handleEnter}
          />
          <InputField
            helperText={bpError.hg}
            label="Enter DIA(mmHg)"
            name="hg"
            value={bpState.hg}
            onChange={onBPChange}
            // onKeyDown={handleEnter}
          />
        </section>
        {isLoading && (
          <div className={classes.loaderContainer}>
            <MUISkeleton variant={'rectangular'} height={'40px'} />
          </div>
        )}
        {!isLoading && historyData?.length > 0 && <HistoryDataList data={historyData} type="bp" />}
      </div>
      {/* <section className={classes.messageInputContainer}>
        <div className={`${classes.middleContainer} ${classes.padding}`}>
          <span className={`${commonClasses.body15Regular} ${classes.textInMessage}`}>@bp</span>
        </div>
        <div className={classes.lastContainer}>
          <Button
            size="small"
            variant="contained"
            className={classes.sendButton}
            onClick={handleSend}
            disabled={disabledBtn || bpState?.hg.length == 0 || bpState?.mm.length == 0}
            onChange={onBPChange}
          >
            <SendIcon />
          </Button>
        </div>
      </section> */}
    </ChatFlyoutDrawer>
  );
}
