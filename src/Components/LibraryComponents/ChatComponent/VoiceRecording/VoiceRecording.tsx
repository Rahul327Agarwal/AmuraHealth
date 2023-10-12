import { IconButton } from '@mui/material';
import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { DeleteIcon, SpeakRedIcon } from '../../../SVGs/Common';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { formatMinutes, formatSeconds } from './VoiceRecording.functions';
import { useStyles } from './VoiceRecording.styles';
import { IProps } from './VoiceRecording.types';

export default function VoiceRecording(props: IProps) {
  const {
    recorderState: { recordingMinutes = 0, recordingSeconds = 0, initRecording = false, audio = '' } = {},
    handlers: { cancelRecording = () => {} } = {},
  } = props || {};

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const recordingTime = `${formatMinutes(recordingMinutes)}:${formatSeconds(recordingSeconds)}`;

  return initRecording && !Boolean(audio) ? (
    <div className={classes.audioContainer}>
      <IconButton onClick={cancelRecording}>{<SpeakRedIcon />}</IconButton>
      <div className={`${commonClasses.body15Regular} ${classes.textStyle}`}> {recordingTime}</div>
    </div>
  ) : (
    <div className={classes.audioContainer}>
      <IconButton onClick={cancelRecording}>{<DeleteIcon />}</IconButton>
      <AudioPlayer audioUrl={audio!} recordingMinutes={recordingMinutes} recordingSeconds={recordingSeconds} isSmall />
    </div>
  );
}
