import { ClickAwayListener } from '@mui/material';
import { memo, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { setVoiceState } from '../../../../DisplayFramework/State/Slices/VoiceSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { getTimeCodeFromNum } from '../VoiceRecording/VoiceRecording.functions';
import { CustomizedSlider, useStyles } from './VideoPlayerNewDesign.styles';
import { PauseIcon, PlayIcon, VideoIcon } from './VideoPlayerNewDesign.svg';
import { IProps } from './VideoPlayerNewDesign.types';

// todo: rename it as videoPlayer instead of videoPlayernewdesign
const VideoPlayerNewDesign = (props: IProps) => {
  const { classes } = useStyles(props);
  const { src, fileName, sessions, messageId, stopPlaying } = props;
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);
  const [isMuted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progessObj, setProgressObj] = useState({ playedSeconds: 0 });
  let playedSecondsObj = progessObj?.playedSeconds;
  const voiceSlice = useSelector((state: IRootState) => state.voiceSlice.voiceState);

  const handlePlaybackEnd = () => {
    setPlaying(false);
    playerRef.current.seekTo(0, 'seconds');
  };

  const pause = () => {
    if (!isPlaying) return;
    setPlaying(false);
  };

  useEffect(() => {
    if (messageId !== voiceSlice) {
      setPlaying(false);
    }
  }, [voiceSlice]);
  const play = () => {
    if(stopPlaying)return
    dispatch(setVoiceState(messageId));
    setPlaying(true);
  };
  return (
    <ClickAwayListener disableReactTree onClickAway={pause}>
      <div className={classes.mainwrapper}>
        <div className={classes.videoContainer}>
          <ReactPlayer
            ref={playerRef}
            progressInterval={1000}
            playing={isPlaying}
            muted={isMuted}
            url={src}
            className="player"
            width="100%"
            onEnded={handlePlaybackEnd}
            playIcon={
              <span className={classes.playpause} onClick={() => (isPlaying ? setPlaying((prev) => !prev) : play())}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </span>
            }
            height="inherit"
            onDuration={(d) => setDuration(d)}
            onProgress={(o) => setProgressObj(o)}
          />
          <span className={classes.playpause} onClick={() => (isPlaying ? setPlaying(!isPlaying) : play())}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </span>
        </div>

        {/* <div className={classes.audioPlayer}>
          
          <div className={`${classes.container}`}>
            <CustomizedSlider
              max={Math.ceil(duration)}
              defaultValue={0}
              value={Math.ceil(playedSecondsObj)}
              onChange={(_, value: any) => {
                setProgressObj({ playedSeconds: value });
                (playerRef.current as any).seekTo(parseFloat(value), 'seconds');
              }}
              min={0}
            />
            <div className={classes.timeWrapper}>
              <span className={`${commonClasses.caption12Regular} ${classes.timespan}`}>
                {getTimeCodeFromNum(String(playedSecondsObj))}
              </span>
              <span className={`${commonClasses.caption12Regular} ${classes.timespan}`}>
                {getTimeCodeFromNum(String(duration))}
              </span>
            </div>
          </div>
        </div> */}
        {fileName && (
          <div className={classes.fileNameWrapper}>
            <span className={`${commonClasses.body17Regular} ${classes.fileNameColor}`} title={fileName}>
              {fileName}
            </span>
            <span className={`${commonClasses.body17Regular} ${classes.fileIcon}`}>
              <VideoIcon />
            </span>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};
export default memo(VideoPlayerNewDesign);
