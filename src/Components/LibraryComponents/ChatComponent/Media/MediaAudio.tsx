import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { getAttachmentAPI } from '../../../PanelComponents/Notes/Notes.functions';
import { MusicIcon } from '../../../SVGs/Common';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { useStyles } from './Media.styles';
import { MediaAudioProps } from './Media.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const MediaAudio = (props: MediaAudioProps) => {
  const { src, fileName, sessions, dontDownloadOnClick, EnableClickAwayListener, ...restProps } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const { id: panelId } = useCurrentPanel();

  return (
    <div className={classes.mediaBox}>
      <div
        className={classes.musicIconBox}
        onClick={() => {
          if (!dontDownloadOnClick) {
            getAttachmentAPI(panelId, src, sessions);
          }
        }}
      >
        <MusicIcon />
      </div>
      <div className={classes.audioPlayerBox}>
        <AudioPlayer
          audioUrl={src}
          recordingMinutes={0}
          recordingSeconds={0}
          isSmall
          EnableClickAwayListener={EnableClickAwayListener}
        />
      </div>
      {fileName && (
        <div className={classes.fileNameWrapper}>
          <span className={`${commonClasses.body17Regular} ${classes.fileNameColor}`}>{fileName}</span>
          <span className={`${commonClasses.body17Regular} ${classes.fileIcon}`}>
            <MusicIcon />
          </span>
        </div>
      )}
    </div>
  );
};

export default MediaAudio;
