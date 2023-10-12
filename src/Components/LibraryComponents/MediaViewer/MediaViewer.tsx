import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useFetchUserName } from '../../../Common/Common.hooks';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { usePanelsContainerSizeInfo } from '../../../DisplayFramework/DisplayFramework.hooks';
import { useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { useUserSession } from '../../../DisplayFramework/State/Slices/Auth';
import { IRootState } from '../../../DisplayFramework/State/store';
import { BackArrowIcon } from '../../SVGs/Common';
import ThreeDotMenu from '../ThreeDotMenu/ThreeDotMenu';
import { ZoomableImage } from './Components/ZoomableImage';
import { DOWNLOAD, THREE_DOT_OPTIONS, formatTime } from './MediaViewer.functions';
import { MUIVideoSlider, useStyles } from './MediaViewer.styles';
import { PauseVideoIcon, PlayVideoIcon } from './MediaViewer.svg';
import { IProps } from './MediaViewer.types';

const buttonVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};
let defaultAnimationOrigin = { top: '50%', left: '50%', bottom: '50%', right: '50%' };

let clickCount = 0;

const MediaViewer = (props: IProps) => {
  const { user: loggedInUser } = useUserSession();
  const { containerWidth, numOfPanelsCanFit } = usePanelsContainerSizeInfo();
  const { fetchUserName } = useFetchUserName();
  const goBack = useDFGoBack();
  const imgRef = React.useRef() as React.MutableRefObject<HTMLImageElement>;
  const textRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const videoRef = React.useRef() as React.MutableRefObject<HTMLVideoElement>;
  const containerRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const commonClasses = useCommonStyles();
  let clickTimoutRef = React.useRef(null); // double tap zoom feature
  const imageContainerRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const playbackToggleTimerRef = React.useRef<any>();
  const [showReadMore, setShowReadMore] = React.useState(false);
  const [isTextExpanded, setIsTextExpanded] = React.useState(false);
  const [isZoomActive, setIsZoomActive] = React.useState(false);
  const [mediaPlaybackState, setMediaPlaybackState] = React.useState({
    isPlaying: false,
    showPlayPauseIcons: false, // the icon on the video player
    progress: 0, // how much of the media is played in percentage
  });
  const zoomInformation = React.useRef({
    isZoomActive: false,
    transformOrigin: '0% 0%',
  });
  const [areDetailsHidden, setAreDetailsHidden] = React.useState(false);
  const { userNames } = useSelector((state: IRootState) => state.cache);
  const { classes } = useStyles({
    isTextExpanded,
    areDetailsHidden,
    progress: mediaPlaybackState.progress,
    type: props.type,
    isZoomActive,
  });

  useEffect(() => {
    fetchUserName(props.senderId);
  }, [props.senderId]);

  const toggleHeaderAndFooter = useCallback(() => {
    setAreDetailsHidden((prev) => !prev);
  }, [areDetailsHidden]);

  const getZoomPosition = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (!imageContainerRef.current || !imgRef.current) return;
    const { left, top, width, height, bottom } = imageContainerRef?.current?.getBoundingClientRect();
    const imgSize = imgRef.current!.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const isOutofBoundsImg = imgSize.height > height;

    let correctedY = 0.5;

    if (zoomInformation.current!.isZoomActive && isOutofBoundsImg) {
      correctedY = y;
    }

    return `${x * 100}% ${correctedY * 100}%`;
  };

  useEffect(() => {
    if (videoRef?.current?.play) {
      videoRef.current.play();
    }
  }, []);

  const toggleZoom = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    if (!imgRef.current) return;

    const toggle = () => {
      if (zoomInformation?.current?.isZoomActive) {
        zoomInformation.current.isZoomActive = false;
        imgRef.current.style.scale = '1';
        setIsZoomActive(false);
        setAreDetailsHidden(false);
      } else {
        zoomInformation.current.isZoomActive = true;
        imgRef.current.style.scale = '2';
        imgRef.current.style.transformOrigin = getZoomPosition(e) || '';
        setIsZoomActive(true);
        setAreDetailsHidden(true);
      }
    };

    if (numOfPanelsCanFit > 1) {
      toggle();
      return;
    }

    if (clickCount >= 1) {
      toggle();
      if (clickTimoutRef.current) clickCount = 0;
    } else {
      clickCount = 1;
      clickTimoutRef.current = setTimeout(() => {
        if (clickCount >= 1) clickCount = 0;
      }, 300);
    }
  };

  const toggleVideoPlayback = useCallback(
    (e) => {
      e.stopPropagation();
      if (playbackToggleTimerRef.current) clearTimeout(playbackToggleTimerRef.current);
      setMediaPlaybackState((prev) => ({
        ...prev,
        isPlaying: !prev.isPlaying,
        showPlayPauseIcons: true,
      }));

      videoRef?.current?.paused ? videoRef.current.play() : videoRef.current.pause();
    },
    [mediaPlaybackState]
  );

  // the mouse enter and leave decides when to show and hide the play/pause icon
  const handleMouseEnter = () => {
    if (playbackToggleTimerRef.current) clearTimeout(playbackToggleTimerRef.current);
    if (!mediaPlaybackState.showPlayPauseIcons) setMediaPlaybackState((prev) => ({ ...prev, showPlayPauseIcons: true }));
  };
  const handleMouseLeave = () => {
    if (mediaPlaybackState.showPlayPauseIcons) {
      playbackToggleTimerRef.current = setTimeout(() => {
        setMediaPlaybackState((prev) => ({ ...prev, showPlayPauseIcons: false }));
      }, 1000);
    }
  };

  const handleReply = useCallback((data) => {
    props.handleOptions(data);
    if (data !== DOWNLOAD) props.onClose ? props.onClose() : goBack();
  }, []);

  const mediaViewerVariants = {
    hidden: props.openFrom ?? defaultAnimationOrigin, // openFrom decides where the animation begins
    visible: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      ...props.openFrom,
    },
  };

  React.useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.keyCode === 27) {
        props.onClose();
      }
    };
    setTimeout(() => {
      if (textRef.current) {
        setShowReadMore(textRef.current.scrollHeight > textRef.current.clientHeight);
      }
    }, 300);
    document.addEventListener('keydown', handleEscapeKey);

    const handleTimeUpdate = () => {
      let totalTime = videoRef?.current?.duration;
      let currentTime = videoRef?.current?.currentTime;
      let progress = (currentTime / totalTime) * 100;
      setMediaPlaybackState((prev) => ({
        ...prev,
        progress,
        showPlayPauseIcons: progress === 100 ? true : prev.showPlayPauseIcons,
        isPlaying: progress === 100 ? false : prev.isPlaying,
      }));
    };

    videoRef?.current?.addEventListener('timeupdate', handleTimeUpdate);

    const handlePointerDown = () => (isMouseDown = true);
    const handlePointerUp = () => {
      if (isMouseDown) isMouseDown = false;
    };
    let isMouseDown = false;

    // clear listeners
    return () => {
      if (playbackToggleTimerRef.current) clearTimeout(playbackToggleTimerRef.current);
      videoRef?.current?.removeEventListener('timeupdate', handleTimeUpdate);
      document.removeEventListener('keydown', handleEscapeKey);
      if (clickTimoutRef.current) clearTimeout(clickTimoutRef.current);
    };
  }, []);

  // image event listeners
  React.useEffect(() => {
    // if (imageContainerRef?.current) imageContainerRef.current.style.cursor = 'zoom-in';
    const onPointerMove = (e) => {
      if (!zoomInformation?.current?.isZoomActive) return;
      imgRef.current.style.transformOrigin = getZoomPosition(e) || '';
    };
    imgRef?.current?.addEventListener('pointermove', onPointerMove);
    return () => {
      imgRef?.current?.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <motion.section
      className={`${classes.container}`}
      variants={mediaViewerVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
      key={props.url}
      ref={containerRef}
    >
      <div className={`${classes.innerWrapper}`}>
        <header className={`${classes.header} ${classes.absoluteOpaque}`}>
          <BackArrowIcon
            className={`${classes.backIcon}`}
            onClick={(e) => {
              setAreDetailsHidden(true);
              props.onClose ? props.onClose() : goBack();
            }}
          />
          <section className={`${classes.metaData}`}>
            <p className={`${classes.title} ${commonClasses.body17Medium}`}>
              {loggedInUser.id === props.senderId ? 'You' : userNames[props.senderId] ?? props.senderId}
            </p>
            <p className={`${commonClasses.caption12Regular} ${classes.date}`}>
              {moment(props.receivedTime).format('YY/MM/DD h:mm A')}
            </p>
          </section>

          <div className={`${classes.threeDot}`}>
            <ThreeDotMenu options={THREE_DOT_OPTIONS} handleClick={handleReply} usePopOver />
          </div>
        </header>

        {/* .................................the media ..................... */}
        <div className={`${classes.mediaWrapper}`} onClick={toggleHeaderAndFooter}>
          {props.type === 'image' && (
            <>
              {isMobile || isTablet ? (
                <ZoomableImage>
                  <img src={props.url} alt={''} />
                </ZoomableImage>
              ) : (
                <>
                  <div ref={imageContainerRef} className={`${classes.imageWrapper}`}>
                    <img src={props.url} alt={''} onClick={toggleZoom} ref={imgRef} />
                  </div>
                </>
              )}
            </>
          )}
          {props.type === 'video' && (
            <>
              <video
                className={`${classes.videoFrame}`}
                src={props.url}
                preload="auto"
                style={{ width: '100%' }}
                ref={videoRef}
                onClick={toggleVideoPlayback}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              ></video>
              <AnimatePresence>
                {mediaPlaybackState.showPlayPauseIcons && (
                  <motion.article
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onMouseEnter={handleMouseEnter}
                    className={`${classes.playPause}`}
                    onClick={toggleVideoPlayback}
                  >
                    {!mediaPlaybackState.isPlaying || mediaPlaybackState.progress === 100 ? (
                      <PlayVideoIcon />
                    ) : (
                      <PauseVideoIcon />
                    )}
                  </motion.article>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {/* ..........the footer with details and text....................... */}
        {true && (
          <footer className={`${classes.absoluteOpaque} ${classes.footer}`}>
            <div className={`${classes.textWrapper}`} ref={textRef} onClick={() => isTextExpanded && setIsTextExpanded(false)}>
              <span className={`${commonClasses.body15Regular}`} dangerouslySetInnerHTML={{ __html: props.text || '' }}></span>
            </div>
            {!isTextExpanded && (
              <span className={`${commonClasses.body15Medium} ${classes.readMore}`} onClick={() => setIsTextExpanded(true)}>
                {showReadMore && 'read more'}
              </span>
            )}

            {/* the progress details */}
            {props.type === 'video' && (
              <div className={`${classes.videoDetails} ${props.text && classes.mt16}`}>
                <div className={`${commonClasses.caption12Regular} ${classes.time}`}>
                  {videoRef?.current?.currentTime ? formatTime(videoRef?.current?.currentTime) : '0:00'}
                </div>
                {/* the progress bar */}
                <MUIVideoSlider
                  min={0}
                  max={1}
                  step={0.01}
                  value={mediaPlaybackState.progress / 100}
                  onChange={(e, v) => {
                    console.log('Asdasd');
                    videoRef.current.currentTime = Number(v) * videoRef.current.duration;
                    setMediaPlaybackState((prev) => ({
                      ...prev,
                      progress: Number(v) * 100,
                    }));
                  }}
                />

                {/* total duration */}
                <div className={`${commonClasses.caption12Regular} ${classes.time}`}>
                  {videoRef?.current?.duration ? formatTime(videoRef?.current?.duration) : '0:00'}
                </div>
              </div>
            )}
          </footer>
        )}
      </div>
    </motion.section>
  );
};

export default React.memo(MediaViewer);
