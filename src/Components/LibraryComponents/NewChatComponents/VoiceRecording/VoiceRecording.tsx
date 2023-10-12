import React from 'react';
import { DeleteIcon } from '../../../SVGs/Common';
import AudioPlayer  from '../AudioPlayer/AudioPlayer';
import { formatMinutes, formatSeconds } from './VoiceRecording.functions';
import { useStyles } from './VoiceRecording.styles';
import { IProps } from './VoiceRecording.types';

export default function VoiceRecording(props: IProps) {
  const {
    recorderState: { recordingMinutes = 0, recordingSeconds = 0, initRecording = false, audio = '' } = {},
    handlers: { cancelRecording = () => {} } = {},
  } = props || {};

  const { classes } = useStyles();

  return initRecording && !Boolean(audio) ? (
    <div className={classes.recorderContainer}>
      <div className={classes.label}>Recording....</div>
      <div className={classes.rightButtons}>
        {/* TODO: <CancelOutlined className={classes.clearRecord} onClick={cancelRecording} /> */}
        <span className={classes.recordTime}>
          {/* TODO: <FiberManualRecord /> */}
          <span>
            <span>{formatMinutes(recordingMinutes)}</span>
            <span>:</span>
            <span>{formatSeconds(recordingSeconds)}</span>
          </span>
        </span>
      </div>
    </div>
  ) : (
    <div className={classes.audioContainer}>
      <span className={classes.delete} onClick={cancelRecording}>
        {<DeleteIcon />}
      </span>
      <AudioPlayer audioUrl={audio!} recordingMinutes={recordingMinutes} recordingSeconds={recordingSeconds} />
    </div>
  );
}
