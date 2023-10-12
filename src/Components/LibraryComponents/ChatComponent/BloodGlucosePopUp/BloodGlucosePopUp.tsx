import { useEffect, useRef, useState } from 'react';
import { isValidNumber } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { PMS_S3 } from '../../../../Utils';
import { SendIcon } from '../../../SVGs/Common';
import HistoryDataList from '../../HistoryData/HistoryDataList';
import InputField from '../../InputField/InputField';
import Button from '../../MUIButton/MUIButton';
import MUIDrawer from '../../MUIDrawer/MUIDrawer';
import MUISkeleton from '../../MUISkeleton/MUISkeleton';
import RadioButtonNew from '../../RadioButtonNew/RadioButtonNew';
import ErrorToaster from './../../../../Common/ErrorToaster';
import {
  convertGlucose,
  formatDecimalTillNthPlace,
  generateValuesForAllUnitsExceptCurrent,
  getProfileKeysHistoryData,
  uniformDataUnit,
} from './BloodGlucosePopUp.functions';
import { useStyles } from './BloodGlucosePopUp.styles';
import { FBG_UNIT_OPTIONS, IBgHistory, IProps } from './BloodGlucosePopUp.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useListenToChatSendEvent } from '../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatSend.hooks';
import { ChatFlyoutDrawer } from '../../../PanelComponents/ChatNotes/Components/ChatInput/ChatFlyout/ChatFlyoutDrawer';
import { ChatInputState } from '../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatInput.state';
import { useAtom } from 'jotai';

const INITIAL_INPUT_STATE = FBG_UNIT_OPTIONS.reduce((acc, unit) => {
  acc[unit.value] = '';
  return acc;
}, {});

export default function BloodGlucosePopUp(props: IProps) {
  const { selectedClient, sessions, onClose } = props;

  const commonClasses = useCommonStyles();
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [input, setInput] = useState(INITIAL_INPUT_STATE);
  const [unit, setUnit] = useState(FBG_UNIT_OPTIONS[0].value);
  const [error, setError] = useState('');
  const [historyData, setHistoryData] = useState<IBgHistory>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSendDisabled, setIsSendDisabled] = useAtom(ChatInputState.inputSendButtonDisabledAtom);
  const inputRef = useRef<any>();

  useEffect(() => {
    (async () => {
      let data = await getProfileKeysHistoryData(panelId, sessions, selectedClient, 'fbg', setIsLoading);
      const formattedHistoryData = uniformDataUnit(data, unit);
      setHistoryData((prev) => ({ ...prev, [unit]: formattedHistoryData }));
    })();
  }, [props]);

  // ?disable the send button according to input state
  useEffect(() => {
    if (input[unit].trim() && isSendDisabled) {
      setIsSendDisabled(false);
    }
    if (!input[unit].trim() && !isSendDisabled) {
      setIsSendDisabled(true);
    }
  }, [input]);

  const onInputChange = (e) => {
    const value = e.target.value.trim() ? e.target.value : e.target.value.trim();
    let validated = /^\d*\.?\d{0,1}$/.test(value);
    if (validated) setInput(generateValuesForAllUnitsExceptCurrent({ value, currentUnit: unit, allUnits: Object.keys(input) }));
    error && setError('');
  };
  const onUnitChange = (item) => {
    // modify the list we pass to the history data list
    if (!historyData[item.value]) {
      let updatedHistoryData = historyData[unit].map((data) => ({
        ...data,
        before: data.before
          ? formatDecimalTillNthPlace(Number(convertGlucose({ value: data.before, fromUnit: unit, toUnit: item.value })))
          : '',
        after: data.after
          ? formatDecimalTillNthPlace(Number(convertGlucose({ value: data.after, fromUnit: unit, toUnit: item.value })))
          : '',
      }));

      setHistoryData((prev) => ({ ...prev, [item.value]: updatedHistoryData }));
    }

    // removes the insignificant decimal trails after unit change in input field
    if (input[unit] && input[unit] !== '.') {
      setInput((prev) => ({ ...prev, [unit]: formatDecimalTillNthPlace(input[unit]).toString() }));
    }
    inputRef.current.focus();
    setUnit(item.value);
  };

  const handleSend = async () => {
    if (Number(input[unit]) <= 0 || !isValidNumber(String(Number(input[unit])))) {
      return setError('Enter a valid input');
    }
    if (input && Number(input[unit]) >= 1000) {
      return setError('Should be less than 1000');
    }
    setError('');
    try {
      setIsSendDisabled(true);
      const payload = {
        EventName: 'chat-categorizer',
        ContextType: '@fbg',
        userId: selectedClient.client_id,
        tenantId: selectedClient.tenant_id,
        updatedBy: sessions?.user?.id,
        keysToUpdate: {
          fbg: Number(input[unit]) + ' ' + unit,
        },
        url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
        token: sessions.id_token,
        method: 'POST',
      };
      const response = await PMS_S3.postData(payload);
      if (response.Error) ErrorToaster(response.Error, panelId, 'error');
    } catch (error) {
      ErrorToaster(error.message, panelId, 'error');
    } finally {
      onClose();
      setIsSendDisabled(false);
    }
    return true;
  };

  // const handleEnter = async (e) => {
  //   if (isSendDisabled) return;
  //   if (e.code === 'Enter' || e.code === 'NumpadEnter') await handleSend();
  // };

  useListenToChatSendEvent(async () => {
    const res = await handleSend();
    return res ? true : false;
  }, [handleSend]);

  return (
    <ChatFlyoutDrawer header={'Fasting Blood Sugar Level'} anchor={'bottom'} className={classes.drawerWrapper}>
      <div className={classes.inputHistoryWrapper}>
        <section className={classes.inputsWrapper}>
          <div className={classes.radioGroup}>
            {FBG_UNIT_OPTIONS.map((item) => (
              <div onClick={() => onUnitChange(item)}>
                <RadioButtonNew
                  key={item.value}
                  value={item.value}
                  isChecked={unit === item.value}
                  disabled={false}
                  label={item.label}
                />
              </div>
            ))}
          </div>
          <InputField
            inputRef={inputRef}
            helperText={error}
            label="Enter Fasting Blood Sugar Level"
            value={input[unit] || ''}
            onChange={onInputChange}
            // onKeyDown={handleEnter}
            autoFocus
          />
        </section>
        {isLoading && (
          <div className={classes.loaderContainer}>
            <MUISkeleton variant={'rectangular'} height={'40px'} />
          </div>
        )}
        {!isLoading && historyData[unit]?.length > 0 && <HistoryDataList unit={unit} data={historyData[unit]} type="fbg" />}
      </div>
      {/* <section className={classes.messageInputContainer}>
        <div className={`${classes.middleContainer} ${classes.padding}`}>
          <span className={`${commonClasses.body15Regular} ${classes.textInMessage}`}>@fbg</span>
        </div>
        <div className={classes.lastContainer}>
          <Button size="small" variant="contained" disabled={isSendDisabled} className={classes.sendButton} onClick={handleSend}>
            <SendIcon />
          </Button>
        </div>
      </section> */}
    </ChatFlyoutDrawer>
  );
}
