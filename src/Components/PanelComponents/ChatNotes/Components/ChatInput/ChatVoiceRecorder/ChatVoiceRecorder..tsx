import React, { useRef, useState } from 'react';
import AudioPlayer from './../../../../../LibraryComponents/ChatComponent/AudioPlayer/AudioPlayer';
import { ChatVoiceRecorderFns } from './ChatVoiceRecorder.functions';
import { CustomizedSlider, useStyles } from './ChatVoiceRecorder.styles';
import { IProps } from './ChatVoiceRecorder.types';
import { DeleteIconDark, PauseIcon, SpeakRedIcon } from '../../../../../SVGs/Common';

export function ChatVoiceRecorder(props: IProps) {
  const {
    recorderState: { recordingMinutes = 0, recordingSeconds = 0, initRecording = false, audio = '' } = {},
    handlers: { cancelRecording = () => {}, resumeRecording = () => {}, pauseRecording = () => {} } = {},
  } = props || {};
  const { classes } = useStyles();
  const [isPaused, setIsPaused] = useState(false);
  const pausedAudio = useRef(null);
  const resume = () => {
    setIsPaused(false);
    resumeRecording();
  };

  const pause = () => {
    setIsPaused(true);
    pauseRecording();
  };

  return (
    <div className={classes.recorderContainer}>
      <div className={classes.deleteIcon} onClick={cancelRecording}>
        {<DeleteIconDark />}
      </div>
      <div>
        <span
          className={`${isPaused ? classes.pointer : ''} ${isPaused ? classes.SpeakIcon : ''}`}
          onClick={() => {
            if (isPaused) {
              resume();
            }
          }}
        >
          {<SpeakRedIcon />}
        </span>
      </div>
      <div className={classes.recordTime}>
        {isPaused ? (
          <span className={classes.container}>
            <AudioPlayer
              audioUrl={audio!}
              recordingMinutes={recordingMinutes}
              recordingSeconds={recordingSeconds}
              hidePlaybackControl={true}
            />
          </span>
        ) : (
          <span>
            <span
              className={`${classes.pointer} ${classes.playpause}`}
              onClick={() => {
                if (!isPaused) {
                  pause();
                }
              }}
            >
              {isPaused ? null : <PauseIcon />}
            </span>
            <span>{ChatVoiceRecorderFns.formatMinutes(recordingMinutes)}</span>
            <span>:</span>
            <span>{ChatVoiceRecorderFns.formatSeconds(recordingSeconds)}</span>
          </span>
        )}
      </div>
    </div>
  );
}
