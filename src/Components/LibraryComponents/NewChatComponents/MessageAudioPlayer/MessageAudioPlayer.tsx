import React, { useRef, useState } from 'react';
import { PauseIcon, PlayIcon } from '../../../SVGs/Common';

import { getTimeCodeFromNum } from '../VoiceRecording/VoiceRecording.functions';
import { CustomizedSlider, useStyles } from './AudioPlayer.styles';
import { IProps } from './AudioPlayer.types';

export default function MessageAudioPlayer(props: IProps) {
  const { audioUrl, recordingMinutes, recordingSeconds } = props;
  const { classes } = useStyles();
  const audio = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const onLoadedMetadata = () => {
    if (audio.current.duration === Infinity || !audio.current.duration) {
      const duration = recordingSeconds + recordingMinutes * 60;
      setAudioDuration(duration);
    } else {
      setAudioDuration(audio.current.duration);
    }
  };

  const play = () => {
    setIsPaused(false);
    audio.current.play();
  };

  const pause = () => {
    setIsPaused(true);
    audio.current.pause();
  };

  const onTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
    setSeekValue((audio.current.currentTime / audioDuration) * 100);
  };

  const onEnded = () => {
    setIsPaused(true);
    audio.current.currentTime = 0;
    setCurrentTime(0);
    setSeekValue(0);
  };

  const handleSeekAudio = (_: any, value: any) => {
    const seekto = audioDuration * (+value / 100);
    audio.current.currentTime = seekto;
    setSeekValue(value);
  };

  return (
    <div className={classes.audioPlayer}>
      <audio src={audioUrl} ref={audio} onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadedMetadata} onEnded={onEnded}></audio>
      <span className={classes.playpause} onClick={isPaused ? play : pause}>
        {isPaused ? <PlayIcon /> : <PauseIcon />}
      </span>
      <div className={classes.container}>
        <CustomizedSlider value={seekValue} min={0} step={1} max={100} onChange={handleSeekAudio} />
        <div className={classes.timeWrapper}>
          <span className={classes.timespan}>{getTimeCodeFromNum(String(currentTime))}</span>
        </div>
      </div>
    </div>
  );
}