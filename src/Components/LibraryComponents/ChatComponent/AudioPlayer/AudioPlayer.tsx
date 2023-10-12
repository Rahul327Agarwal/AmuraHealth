import { Button, ClickAwayListener } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { setVoiceState } from '../../../../DisplayFramework/State/Slices/VoiceSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { PauseIcon, PlayIcon } from '../../../SVGs/Common';
import { getTimeCodeFromNum } from '../VoiceRecording/VoiceRecording.functions';
import { changePlaybackSpeed } from './AudioPlayer.functions';
import { CustomizedSlider, useStyles } from './AudioPlayer.styles';
import { IProps } from './AudioPlayer.types';

function AudioPlayer(props: IProps) {
  const { audioUrl, recordingMinutes, recordingSeconds, audioName, messageId, voiceNote, hidePlaybackControl } = props;
  const voiceSlice = useSelector((state: IRootState) => state.voiceSlice.voiceState);

  const dispatch = useDispatch();
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const audio = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  const onLoadedMetadata = () => {
    if (audio.current.duration === Infinity || !audio.current.duration) {
      const duration = recordingSeconds + recordingMinutes * 60;
      setAudioDuration(duration);
    } else {
      setAudioDuration(audio.current.duration);
    }
  };
  useEffect(() => {
    if (voiceNote) {
      if (messageId !== voiceSlice) {
        pause();
      }
    }
  }, [voiceSlice]);

  useEffect(() => {
    audio.current.playbackRate = playbackRate;
  }, [playbackRate]);

  const play = () => {
    dispatch(setVoiceState(messageId));
    setIsPaused(false);
    audio.current.play();
  };

  const pause = () => {
    if (isPaused) return;
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

  const handleSeekAudio = (_, value) => {
    const seekto = audioDuration * (+value / 100);
    audio.current.currentTime = seekto;
    setSeekValue(value);
  };

  const handleSpeed = () => {
    setPlaybackRate(changePlaybackSpeed(playbackRate));
  };

  return (
    <ClickAwayListener disableReactTree onClickAway={pause}>
      <div className={classes.audioPlayer}>
        <audio
          src={audioUrl}
          ref={audio}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
        ></audio>
        <span className={classes.playpause} onClick={isPaused ? play : pause}>
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </span>
        <div className={classes.container}>
          {audioName ? <div title={audioName} className={`${commonClasses.caption12Medium} ${classes.audioName}`}>{audioName} </div> : null}
          <CustomizedSlider value={seekValue} min={0} step={1} max={100} onChange={handleSeekAudio} />
          <div className={classes.timeWrapper}>
            <span className={`${commonClasses.caption12Regular} ${classes.timespan}`}>
              {getTimeCodeFromNum(String(currentTime))}
            </span>
            <div className="">
              {!hidePlaybackControl && (
                <span
                  onClick={handleSpeed}
                  className={`${classes.playbackSpeedBtn} ${commonClasses.caption12Regular}`}
                >{`${playbackRate}x`}</span>
              )}
              <span className={`${commonClasses.caption12Regular} ${classes.timespan}`}>
                {getTimeCodeFromNum(String(audioDuration))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(AudioPlayer);
