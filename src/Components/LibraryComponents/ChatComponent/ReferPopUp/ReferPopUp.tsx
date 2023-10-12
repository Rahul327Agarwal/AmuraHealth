import { debounce } from '@mui/material';
import { matchIsValidTel } from 'mui-tel-input';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useUserSession } from '../../../../DisplayFramework/State/Slices/Auth';
import { useSelectedClient } from '../../../../DisplayFramework/State/Slices/DisplayFramework';
import PhoneInputField from '../../../Registration/Components/InputField/PhoneInputField/PhoneInputField';
import { SendIcon } from '../../../SVGs/Common';
import InputField from '../../InputField/InputField';
import MUIButton from '../../MUIButton/MUIButton';
import MUIDrawer from '../../MUIDrawer/MUIDrawer';
import {
  INITIAL_DETAILS,
  INITIAL_ERROR_OBJECT,
  getFormattedNumber,
  handleInputChange,
  handleSubmit,
} from './ReferPopUp.functions';
import { useStyles } from './ReferPopUp.styles';
import { CheckedBoxIcon, TwoUserIcon, UncheckedBoxIcon } from './ReferPopUp.svg';
import { IProps } from './ReferPopUp.types';
import { ChatFlyoutDrawer } from '../../../PanelComponents/ChatNotes/Components/ChatInput/ChatFlyout/ChatFlyoutDrawer';
import { useListenToChatSendEvent } from '../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatSend.hooks';
import { ChatInputState } from '../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatInput.state';
import { wrapWithTagString } from '../../../PanelComponents/ChatNotes/Components/ChatInput/MessageInput/MessageInput.functions';
import { useAtom, useSetAtom } from 'jotai';

const ReferPopUp = (props: IProps) => {
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [errors, setErrors] = useState(INITIAL_ERROR_OBJECT);
  const [isSenddBtnDisabled, setIsSenddBtnDisabled] = useAtom(ChatInputState.inputSendButtonDisabledAtom);

  const [displayString, setDisplayString] = useState('');
  const { onClose } = props;
  const focusRef = useRef<any>();
  const selectedClient = useSelectedClient();
  const sessions = useUserSession();
  const setTextInput = useSetAtom(ChatInputState.inputValueAtom);

  const { classes } = useStyles({ isMobileError: !!errors.mobile });
  const commonClasses = useCommonStyles();

  const checkIfSubmittable = () => {
    const { mobile, firstName, healthObjective } = details;
    if (mobile && firstName && healthObjective) {
      setIsSenddBtnDisabled(false);
    } else {
      setIsSenddBtnDisabled(true);
    }
  };

  const debounceFormCheck = useCallback(debounce(checkIfSubmittable, 300), [
    details.mobile,
    details.firstName,
    details.healthObjective,
  ]);

  useEffect(() => {
    debounceFormCheck();
  }, [details.mobile, details.firstName, details.healthObjective]);

  // ? to focus on the last line when the user
  useEffect(() => {
    setDisplayString(
      `${details.mobile && getFormattedNumber(details.mobile) + ','} ${details.whatsApp ? 'Whatsapp,' : ''} ${
        details.firstName.trim() && details.firstName.trim() + ','
      } ${details.healthObjective.trim() && details.healthObjective.trim() + ','} ${
        details.lastName.trim() && details.lastName.trim() + ','
      } ${details.email.trim() && details.email.trim() + ','} ${details.additional?.trim() && details.additional.trim()}  `
    );

    if (focusRef?.current) focusRef?.current?.scrollIntoView();
  }, [details]);

  useEffect(() => {
    setTextInput(`${wrapWithTagString('@refer')}${displayString}`);
  }, [displayString]);

  useListenToChatSendEvent(async () => {
    // if (isSenddBtnDisabled) return false;
    const res = await handleSubmit({ details, setErrors, selectedClient, sessions, onClose });
    return res ? true : false;
  }, [details, selectedClient, sessions, isSenddBtnDisabled, setErrors, handleSubmit, onClose]);

  return (
    <ChatFlyoutDrawer
      open={true}
      header={'Refer Someone'}
      anchor={'bottom'}
      // onClose={onClose}
      className={classes.drawerWrapper}
      children={
        <div className={classes.drawerContentWrapper}>
          <div className={classes.fieldsWrapper}>
            {/* ....the phone input and whatsapp check .....*/}
            <div className={classes.phoneWrapper}>
              <div className={classes.mobile}>
                <PhoneInputField
                  focusBorder="#000000"
                  hoverBorder="#1B1B1B"
                  fontColor="#000000"
                  label={``}
                  value={details.mobile}
                  handleOnChange={(e: string) => {
                    const isValidNum = matchIsValidTel(e);
                    setDetails((prev) => ({ ...prev, mobile: e }));
                  }}
                  showError={!!errors.mobile}
                  errorText={errors.mobile}
                />
              </div>
              <div className={classes.whatsappContainer}>
                <div
                  className={classes.checkbox}
                  onClick={() => {
                    setDetails((prev) => ({ ...prev, whatsApp: !prev.whatsApp }));
                  }}
                >
                  {details.whatsApp ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}
                </div>
                <div className={commonClasses.body17Regular}>Whatsapp</div>
              </div>
            </div>

            {/* .......the First name ..............*/}
            <InputField
              label="First Name"
              value={details?.firstName}
              name="firstName"
              onChange={(e) => handleInputChange({ e, errors, setErrors, setDetails })}
              helperText={errors.firstName}
              multiline
              maxRows={2}
            />
            {/* .......health objective............ */}
            <InputField
              label="Health Objective"
              value={details?.healthObjective}
              name="healthObjective"
              onChange={(e) => handleInputChange({ e, errors, setErrors, setDetails })}
              helperText={errors.healthObjective}
              multiline
              maxRows={5}
            />
            {/* .......last name............ */}
            <InputField
              label="Last Name (Optional)"
              value={details?.lastName}
              name="lastName"
              onChange={(e) => handleInputChange({ e, errors, setErrors, setDetails })}
              maxRows={2}
              multiline
            />
            {/* .......email............ */}
            <InputField
              label="Email (Optional)"
              value={details?.email}
              name="email"
              onChange={(e) => handleInputChange({ e, errors, setErrors, setDetails })}
              helperText={errors.email}
            />
            {/* .......anything else............ */}
            <InputField
              label="Anything else (Optional)"
              value={details?.additional}
              name="additional"
              onChange={(e) => handleInputChange({ e, errors, setErrors, setDetails })}
              multiline
              maxRows={5}
            />
          </div>
          {/* .......the send and input section................... */}
          {/* <div className={classes.messageInputContainer}>
            
            <div className={`${classes.middleContainer} `}>
              <div className={`${classes.iputTextContainer} ${commonClasses.body15Regular}`} placeholder={'Type comment'}>
                <span className={classes.refer}>@refer</span>
                {displayString}
                <span ref={focusRef}></span>
              </div>
            </div>
            <div>
              <div className={isSenddBtnDisabled && classes.disabledSendIcon}>
                <MUIButton
                  size="small"
                  variant="contained"
                  className={!isSenddBtnDisabled ? classes.sendButton : classes.disabledSendIcon}
                  disabled={isSenddBtnDisabled}
                  onClick={() => handleSubmit({ details, setErrors, selectedClient, sessions, onClose })}
                >
                  <SendIcon />
                </MUIButton>
              </div>
            </div>
          </div> */}
        </div>
      }
    />
  );
};

export default React.memo(ReferPopUp);
