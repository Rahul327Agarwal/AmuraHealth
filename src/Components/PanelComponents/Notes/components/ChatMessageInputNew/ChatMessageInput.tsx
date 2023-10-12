import React, { useEffect, useRef, useState } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { SendIcon } from '../../../../SVGs/Common';
import useRecorder from '../VoiceRecordingNew/VoiceRecording.hooks';
import { UseRecorder } from '../VoiceRecordingNew/VoiceRecording.types';
// import VoiceRecording from '../VoiceRecording/VoiceRecording';
// import useRecorder from '../VoiceRecording/VoiceRecording.hooks';
// import { UseRecorder } from '../VoiceRecording/VoiceRecording.types';
import { useStyles } from './ChatMessageInput.styles';
import { IProps } from './ChatMessageInput.types';

export default function ChatMessageInput(props: IProps) {
  const {
    customStyle,
    startAdornment,
    inputComponent,
    endAdornment,
    placeholder,
    inputType,
    onChange,
    value,
    onKeyDown,
    isRadius,
    handleSend,
    ...rest
  } = props;

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { initRecording } = recorderState;
  const { startRecording, saveRecording } = handlers;
  const { audio } = recorderState;
  const isAutoRef = useRef(null);
  useEffect(() => {
    isAutoRef.current.focus({
      preventScroll: true,
    });
  });

  return (
    <>
      {startAdornment}
      <div className={`${classes.root} ${customStyle}`}>
        <div className={classes.inputWrapper}>
          {inputComponent || (
            <input
              ref={isAutoRef}
              className={`${classes.textInput} ${commonClasses.body15Regular}`}
              onChange={onChange}
              value={value}
              type={inputType}
              placeholder={placeholder}
              onKeyDown={onKeyDown}
              autoFocus
              {...rest}
            />
          )}
        </div>
        <div className={`${value && value?.length > 0 ? classes.sendIcon : classes.disableSend}`} onClick={handleSend}>
          {<SendIcon />}
        </div>
      </div>
    </>
  );
}
