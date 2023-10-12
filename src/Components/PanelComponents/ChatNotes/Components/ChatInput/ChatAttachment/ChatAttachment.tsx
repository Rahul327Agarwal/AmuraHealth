import React, { useEffect, useState } from 'react';
import { useStyles } from './ChatAttachment.styles';
import { useCurrentPanel } from '../../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import ErrorToaster from '../../../../../../Common/ErrorToaster';
import { FileIcon, MusicIcon, PicturesIcon, VideoIcon } from '../../../../../SVGs/Common';
import { PMS_LOCALE } from '../../../../../../Utils';
import { UploadFilesViewX } from './UploadFilesViewX/UploadFilesViewX';
import { PickerFile } from './UploadFilesViewX/UploadFilesViewX.types';
import { UploadFilesViewXUtils } from './UploadFilesViewX/UploadFilesViewX.functions';
import { ChatInputState } from '../Input/ChatInput.state';
import { ChatFlyoutDrawer } from '../ChatFlyout/ChatFlyoutDrawer';
import { useAtom } from 'jotai';

export type IProps = {
  onClose: Function;
};

export function ChatAttachment(props: IProps) {
  const { onClose: handleClose } = props;

  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();

  const [chatAttachments, setChatAttachments] = useAtom(ChatInputState.attachmentsAtom);
  const [chatAttachmentsText, setChatAttachmentsText] = useAtom(ChatInputState.attachmentsTextAtom);
  const [selectedAttachmentIndex, setSelectedAttachmentIndex] = useAtom(ChatInputState.currentSelectedAttachmentIndexAtom);
  const [_, setSendButtonState] = useAtom(ChatInputState.inputSendButtonDisabledAtom);

  const [files, setFiles] = useState<PickerFile[]>([]);

  useEffect(() => {
    setChatAttachments(files);
  }, [files]);

  React.useEffect(() => {
    const closeFlyoutOnEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', closeFlyoutOnEscape);
    return () => window.removeEventListener('keydown', closeFlyoutOnEscape);
  }, []);

  function RenderPickerButton(props: { children: React.ReactNode; pickerType: string; label: string }) {
    const hiddenInputRef = React.useRef<HTMLInputElement>(null);
    return (
      <div className={classes.typesOfFiles}>
        <div>
          <input
            type="file"
            name="file"
            style={{ display: 'none' }}
            ref={hiddenInputRef}
            onChange={(event) => {
              if (Array.from(event.target.files).length > 10) {
                event.preventDefault();
                ErrorToaster('Cannot upload files more than 10', panelId, 'error');
                return;
              }
              let filestoAttach = [...Array.from(event.target.files)];
              const pickerFiles = filestoAttach.map((e) => UploadFilesViewXUtils.makePickerFile(e));
              setFiles(pickerFiles);
              hiddenInputRef.current.files = undefined;
            }}
            accept={props.pickerType}
            multiple={true}
          />
          <span
            className={`${classes.pointer} ${classes.svgIcon}`}
            onClick={() => {
              hiddenInputRef.current.click();
            }}
          >
            {props.children}
          </span>
        </div>
        <div className={classes.pointer} title={'Files'}>
          {PMS_LOCALE.translate(props.label)}
        </div>
      </div>
    );
  }

  const onClose = () => {
    setChatAttachments([]);
    setChatAttachmentsText([]);
    setSelectedAttachmentIndex(-1);
    handleClose();
  };

  return (
    <ChatFlyoutDrawer removeCloseIcon={files?.length > 0} onClose={onClose}>
      <div className={classes.wrapper}>
        {files?.length <= 0 && (
          <>
            {/* <div className={classes.header}>
            <span className={classes.crossIcon} onClick={closePopup}>
              <CrossIcon />
            </span>
          </div> */}
            <div className={classes.grid}>
              <RenderPickerButton
                label="Files"
                pickerType=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.txt"
              >
                <FileIcon />
              </RenderPickerButton>
              <RenderPickerButton
                label="Photos"
                pickerType="image/jpeg, image/png, image/x-png,image/gif,image/jpg, image/gif, .jpeg, .png, .gif"
              >
                <PicturesIcon />
              </RenderPickerButton>
              <RenderPickerButton label="Video" pickerType="video/*">
                <VideoIcon />
              </RenderPickerButton>
              <RenderPickerButton label="Audio" pickerType=".mp3,.wav,.ogg,.aac,.flac,.aiff">
                <MusicIcon />
              </RenderPickerButton>
            </div>
          </>
        )}
        {files?.length > 0 && (
          <UploadFilesViewX
            files={files}
            setFiles={setFiles}
            handleClose={onClose}
            onViewerStateChange={(state) => {
              if (state === 'cropper') {
                setSendButtonState(true);
              } else {
                setSendButtonState(false);
              }
            }}
            onSelectedIndexChange={(index) => {
              setSelectedAttachmentIndex(index);
            }}
            onDelete={(index) => {
              setChatAttachmentsText((p) => {
                return p.filter((e, i) => index !== i);
              });
            }}
          />
        )}
      </div>
    </ChatFlyoutDrawer>
  );
}
