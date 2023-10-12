import { memo, useEffect, useRef, useState } from 'react';
import { isValidNumber } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { PMS_S3 } from '../../../../Utils';
import { SendIcon } from '../../../SVGs/Common';
import HistoryDataList from '../../HistoryData/HistoryDataList';
import { IFormattedHistoryData } from '../../HistoryData/HistoryDataList.types';
import InputField from '../../InputField/InputField';
import Button from '../../MUIButton/MUIButton';
import MUIDrawer from '../../MUIDrawer/MUIDrawer';
import MUISkeleton from '../../MUISkeleton/MUISkeleton';
import RadioButtonNew from '../../RadioButtonNew/RadioButtonNew';
import ErrorToaster from './../../../../Common/ErrorToaster';
import {
  dataConveriosnAndDataCehck,
  generateValuesForAllUnitsExceptCurrent,
  getProfileKeysHistoryData,
} from './WeightPopUp.functions';
import { useStyles } from './WeightPopUp.styles';
import { IProps, WEIGHT_UNIT_OPTIONS } from './WeightPopUp.types';
import { ChatFlyoutDrawer } from '../../../PanelComponents/ChatNotes/Components/ChatInput/ChatFlyout/ChatFlyoutDrawer';
import { useListenToChatSendEvent } from '../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatSend.hooks';
import { ChatInputState } from '../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatInput.state';
import { useAtom } from 'jotai';

const INITIAL_INPUT_STATE = WEIGHT_UNIT_OPTIONS.reduce((acc, unit) => {
  acc[unit.value] = '';
  return acc;
}, {});
function WeightPopUp(props: IProps) {
  const { selectedClient, sessions, onClose } = props;

  const commonClasses = useCommonStyles();
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [weight, setWeight] = useState(INITIAL_INPUT_STATE); //{kg:'',lbs:''}
  const [unit, setUnit] = useState(WEIGHT_UNIT_OPTIONS[0].value);
  const [weightError, setWeightError] = useState('');
  const [, setSendDisableState] = useAtom(ChatInputState.inputSendButtonDisabledAtom);
  const [historyData, setHistoryData] = useState<{ kgs: IFormattedHistoryData[]; lbs: IFormattedHistoryData[] }>({
    kgs: [],
    lbs: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const inputFocus = useRef(null);
  useEffect(() => {
    (async () => {
      let gethiststoryData = await getProfileKeysHistoryData(panelId, sessions, selectedClient, 'weight', setIsLoading);
      let convertedData = await dataConveriosnAndDataCehck(gethiststoryData, WEIGHT_UNIT_OPTIONS);
      setHistoryData(convertedData);
    })();
  }, [props]);

  const onWeightChange = (e) => {
    if (isNaN(e.target.value)) return;
    const value = e.target.value.trim() ? e.target.value : e.target.value.trim();
    let finalwieght = unit === 'kgs' ? /^\d*\.?\d{0,1}$/.test(value) : /^\d*\.?\d{0,2}$/.test(value);
    if (finalwieght) setWeight(generateValuesForAllUnitsExceptCurrent(value, Object.keys(weight), unit));
    weightError && setWeightError('');
  };
  const onUnitChange = (item) => {
    inputFocus.current.focus();
    setUnit(item.value);
  };

  useEffect(() => {
    setSendDisableState(disabledBtn || weight[unit].length === 0);
  }, [disabledBtn, weight]);

  const handleSend = async () => {
    if (Number(weight[unit]) <= 0 || !isValidNumber(String(Number(weight[unit])))) {
      return setWeightError('Enter a valid input');
    }
    if (weight[unit] && Number(weight[unit]) >= 1000) {
      return setWeightError('Should be less than 1000');
    }
    setWeightError('');
    try {
      setDisabledBtn(true);
      const payload = {
        EventName: 'chat-categorizer',
        ContextType: '@wt',
        userId: selectedClient.client_id,
        tenantId: selectedClient.tenant_id,
        updatedBy: sessions?.user?.id,
        keysToUpdate: {
          weight: Number(weight[unit]) + ' ' + unit,
        },
        url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
        token: sessions.id_token,
        method: 'POST',
      };
      console.log('weight paylod Request', payload);
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
    <ChatFlyoutDrawer header={'Weight'} className={classes.drawerWrapper}>
      <div className={classes.inputHistoryWrapper}>
        <section className={classes.inputsWrapper}>
          <div className={classes.radioGroup}>
            {WEIGHT_UNIT_OPTIONS.map((item) => (
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
            inputRef={inputFocus}
            helperText={weightError}
            label="Weight"
            value={weight[unit]}
            onChange={onWeightChange}
            autoFocus
            // onKeyDown={handleEnter}
          />
        </section>
        {isLoading && (
          <div className={classes.loaderContainer}>
            <MUISkeleton variant={'rectangular'} height={'40px'} />
          </div>
        )}
        {!isLoading && historyData[unit]?.length > 0 && (
          <HistoryDataList unit={unit} data={historyData[unit]} type="weight" numberOfFractionalDigits={unit == 'kgs' ? 1 : 2} />
        )}
      </div>
      {/* <section className={classes.messageInputContainer}>
        <div className={`${classes.middleContainer} ${classes.padding}`}>
          <span className={`${commonClasses.body15Regular} ${classes.textInMessage}`}>@wt</span>
        </div>
        <div className={classes.lastContainer}>
          <Button
            size="small"
            variant="contained"
            className={classes.sendButton}
            onClick={handleSend}
            disabled={disabledBtn || weight[unit].length == 0}
          >
            <SendIcon />
          </Button>
        </div>
      </section> */}
    </ChatFlyoutDrawer>
  );
}

export default memo(WeightPopUp);
