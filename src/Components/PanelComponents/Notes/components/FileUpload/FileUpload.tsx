import React, { useEffect, useState } from 'react';
import { PMS_LOCALE } from '../../../../../Utils';
import UploadFilesViewNew from '../../../../LibraryComponents/NewChatComponents/UploadFilesNew/UploadFilesViewNew/UploadFilesViewNew';
import { CrossIcon, FileIcon, MusicIcon, PicturesIcon, VideoIcon } from '../../../../SVGs/Common';
import ErrorToaster from './../../../../../Common/ErrorToaster';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useStyles } from './FileUpload.styles';
import { IProps } from './FileUpload.types';

export default function FileUpload(props: IProps) {
  const { multiple, onClose: handleClose, focusMessageInput, setRerenderFlag, openReply } = props;
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [files, setFiles] = React.useState<any>(props.files || []);
  const [_key, setKey] = React.useState(new Date().getTime());
  const [sourceFiles, setSourceFiles] = useState(props.files || []);
  const hiddenImageInput = React.useRef(null);

  const ref = React.useRef<HTMLDivElement>(null);

  const handleClick = (event) => {
    hiddenImageInput.current.click();
  };
  const hiddenDocInput = React.useRef(null);
  const handleClickDoc = (event) => {
    hiddenDocInput.current.click();
  };
  const hiddenVideoInput = React.useRef(null);
  const handleClickVideo = (event) => {
    hiddenVideoInput.current.click();
  };
  const hiddenAudioInput = React.useRef(null);
  const handleClickAudio = (event) => {
    hiddenAudioInput.current.click();
  };
  const closePopup = () => {
    handleClose();
  };

  React.useEffect(() => {
    if (props.rerenderFlag !== 0) {
      setKey(new Date().getTime());
    }
  }, [props.rerenderFlag]);

  // ? close popup when escape btn is pressed
  React.useEffect(() => {
    const closeFlyoutOnEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', closeFlyoutOnEscape);
    return () => window.removeEventListener('keydown', closeFlyoutOnEscape);
  }, []);

  useEffect(() => {
    setRerenderFlag?.(new Date().getTime());
  }, [files]);

  return (
    <div className={classes.wrapper} ref={ref}>
      {files?.length <= 0 && (
        <>
          {/* <div className={classes.header}>
            <span className={classes.crossIcon} onClick={closePopup}>
              <CrossIcon />
            </span>
          </div> */}
          <div className={classes.grid}>
            <div className={classes.typesOfFiles}>
              <div>
                <input
                  type="file"
                  name="file"
                  style={{ display: 'none' }}
                  ref={hiddenDocInput}
                  onChange={(event) => {
                    if (Array.from(event.target.files).length > 10) {
                      event.preventDefault();
                      ErrorToaster('Cannot upload files more than 10', panelId, 'error');
                      console.log(`Cannot upload files more than 10`);
                      return;
                    }
                    let filestoAttach = [...files, ...Array.from(event.target.files)];
                    setFiles(filestoAttach);
                    let backpFiles = [...(files.length !== 0 ? sourceFiles : []), ...Array.from(event.target.files)];
                    setSourceFiles(backpFiles);
                    props.handleSave(filestoAttach);
                  }}
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.txt"
                  multiple={multiple}
                />
                <span className={`${classes.pointer} ${classes.svgIcon}`} onClick={handleClickDoc}>
                  <FileIcon />{' '}
                </span>
              </div>
              <div className={classes.pointer} title={'Files'}>
                {PMS_LOCALE.translate('Files')}
              </div>
            </div>
            <div className={classes.typesOfFiles}>
              <div>
                <input
                  type="file"
                  name="file"
                  style={{ display: 'none' }}
                  ref={hiddenImageInput}
                  onChange={(event) => {
                    if (Array.from(event.target.files).length > 10) {
                      event.preventDefault();
                      return;
                    }
                    let filestoAttach = [...files, ...Array.from(event.target.files)];
                    setFiles(filestoAttach);
                    let backpFiles = [...(files.length !== 0 ? sourceFiles : []), ...Array.from(event.target.files)];
                    setSourceFiles(backpFiles);
                    props.handleSave(filestoAttach);
                  }}
                  accept="image/jpeg, image/png, image/x-png,image/gif,image/jpg, image/gif, .jpeg, .png, .gif"
                  multiple={multiple}
                />

                <span className={`${classes.pointer} ${classes.svgIcon}`} onClick={handleClick}>
                  <PicturesIcon />{' '}
                </span>
              </div>
              <div className={classes.pointer} title={'Photos'}>
                {PMS_LOCALE.translate('Photos')}
              </div>
            </div>

            <div className={classes.typesOfFiles}>
              <div>
                <input
                  type="file"
                  name="file"
                  style={{ display: 'none' }}
                  ref={hiddenVideoInput}
                  onChange={(event) => {
                    if (Array.from(event.target.files).length > 10) {
                      event.preventDefault();
                      ErrorToaster('Cannot upload files more than 10', panelId, 'error');
                      return;
                    }
                    let filestoAttach = [...files, ...Array.from(event.target.files)];
                    setFiles(filestoAttach);
                    let backpFiles = [...(files.length !== 0 ? sourceFiles : []), ...Array.from(event.target.files)];
                    setSourceFiles(backpFiles);
                    props.handleSave(filestoAttach);
                  }}
                  accept="video/*"
                  multiple={multiple}
                />
                <span className={`${classes.pointer} ${classes.svgIcon}`} onClick={handleClickVideo}>
                  <VideoIcon />{' '}
                </span>
              </div>
              <div className={classes.pointer} title={'Video'}>
                {PMS_LOCALE.translate('Video')}
              </div>
            </div>

            <div className={classes.typesOfFiles}>
              <div>
                <input
                  type="file"
                  name="file"
                  style={{ display: 'none' }}
                  ref={hiddenAudioInput}
                  onChange={(event) => {
                    if (Array.from(event.target.files).length > 10) {
                      event.preventDefault();
                      ErrorToaster('Cannot upload files more than 10', panelId, 'error');
                      return;
                    }
                    let filestoAttach = [...files, ...Array.from(event.target.files)];
                    setFiles(filestoAttach);
                    let backpFiles = [...(files.length !== 0 ? sourceFiles : []), ...Array.from(event.target.files)];
                    setSourceFiles(backpFiles);
                    props.handleSave(filestoAttach);
                  }}
                  accept=".mp3,.wav,.ogg,.aac,.flac,.aiff"
                  multiple={multiple}
                />
                <span className={`${classes.pointer} ${classes.svgIcon}`} onClick={handleClickAudio}>
                  <MusicIcon />{' '}
                </span>
              </div>
              <div className={classes.pointer} title={'Audio'}>
                {PMS_LOCALE.translate('Audio')}
              </div>
            </div>
          </div>
        </>
      )}
      {files?.length > 0 && (
        <UploadFilesViewNew
          focusMessageInput={focusMessageInput}
          files={files}
          sourceFiles={sourceFiles}
          setSourceFiles={setSourceFiles}
          setFiles={(modifiedFiles) => {
            setFiles(modifiedFiles);
            props.handleSave(modifiedFiles);
          }}
          setDisableSend={props.setDisableSend}
          handleClose={() => {
            handleClose();
          }}
          openReply={openReply}
        />
      )}
    </div>
  );
}
