import React from 'react';
// import ButtonGroup from "../../Common/ChatComponents/ButtonGroup";
// import CheckBoxGroup from "../../Common/ChatComponents/CheckBoxGroup";
// import ConfirmButton from "../../Common/ChatComponents/ConfirmButton";
// import InputSlider from "../../Common/ChatComponents/InputSlider";
// import RadioButtonGroup from "../../Common/ChatComponents/RadioButtonGroup";
import { useStyles } from '../Chat.styles';
import { IProps } from './SurveyComponents.types';

// TODO: Remove this once the components are imported
const ButtonGroup: any = {};
const CheckBoxGroup: any = {};
const ConfirmButton: any = {};
const InputSlider: any = {};
const RadioButtonGroup: any = {};

export default function SurveyComponents(props: IProps) {
  const { message, index, messageType, showConfirm, selectedOption, disableConfirm, handleSurveyInput, confirmSelection } = props;
  const { classes } = useStyles();
  return (
    <div>
      <hr className={classes.hrMargin}></hr>
      <div className={classes.paddingDivCenter}></div>
      {messageType === 'ACTION_BUTTON' ? (
        <ButtonGroup
          disabled={!showConfirm}
          options={message.Options}
          input={selectedOption}
          handleSelected={(value: any) => {
            handleSurveyInput(value, message.MessageId, message.Options);
          }}
        />
      ) : null}
      {messageType === 'ACTION_MULTI_CHOICE' ? (
        <CheckBoxGroup
          input={selectedOption}
          disabled={!showConfirm}
          options={message.Options}
          handleSelected={(value: any) => {
            handleSurveyInput(value, message.MessageId);
          }}
        />
      ) : null}
      {messageType === 'ACTION_SELECT' ? (
        <RadioButtonGroup
          disabled={!showConfirm}
          options={message.Options}
          input={selectedOption}
          handleSelected={(value: any) => {
            handleSurveyInput(value, message.MessageId);
          }}
        />
      ) : null}
      {messageType === 'SLIDER_SELECT' ? (
        <InputSlider
          disabled={!showConfirm}
          minValue={message.Options[0].MinValue}
          maxValue={message.Options[0].MaxValue}
          input={selectedOption}
          handleSelected={(value: any) => {
            handleSurveyInput(value, message.MessageId);
          }}
        />
      ) : null}
      {showConfirm ? (
        <ConfirmButton
          disable={disableConfirm}
          onClick={() => {
            confirmSelection();
          }}
          label={'Confirm'}
        />
      ) : null}
    </div>
  );
}
