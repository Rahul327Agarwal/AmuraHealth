import React, { useEffect, useRef, useState } from 'react';
import ErrorToaster from './../../../../Common/ErrorToaster';
import { IconButton } from '@mui/material';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import MessageHeader from '../../../PanelComponents/PostManagement/RightMessage/MessageHeader';
import AttachMedia from '../AttachMedia/AttachMedia';
import { isValidFiles, options } from './UploadFiles.function';
import { useStyles } from './UploadFiles.styles';
import { IProps } from './UploadFiles.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function UploadFiles(props: IProps) {
  const { customStyle, fileOptions, handleSave, headerTitle, headerTitleIcon, directShowCrop, viewCross } = props;
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();
  const inputRef = useRef<any>(null);
  const [selected, setSelected] = useState(options[0]);
  const [files, setFiles] = useState<any>([]);
  const [fileURL, setFileURL] = useState('');

  const onSelectFile = (event: any) => {
    const myFiles = event.target.files;
    const { errorObject, validFiles } = isValidFiles(myFiles, selected.id);
    if (errorObject.length) {
      ErrorToaster(errorObject[0].message, panelId, 'error');
    }

    if (validFiles && validFiles?.length > 0) {
      // if (selected.id === 'FILES') return setFiles([{ rawFile: validFiles[0], fileURL: '', type: selected.id }]);
      const reader = new FileReader();
      reader.readAsDataURL(validFiles[0]);
      reader.addEventListener('load', () => {
        const fileObject = {
          rawFile: validFiles[0],
          fileURL: reader.result,
          type: selected.id,
        };
        setFiles([fileObject]);
      });
    }
  };
  const handleUpload = (data: any) => {
    setSelected(data);
    setTimeout(() => inputRef.current.click());
  };

  const sendFileToInput = async (fileURL: string, files: any) => {
    const res: Response = await fetch(fileURL);
    const blob: Blob = await res.blob();
    var file = new File([blob], files?.rawFile?.name, {
      type: files?.type,
      lastModified: Date.now(),
    });
    handleSave(file);
  };
  useEffect(() => {
    if (files.length > 0) {
      if (selected.id === 'PHOTOS') {
        sendFileToInput(fileURL, files[0]);
      } else {
        handleSave(files[0].rawFile);
      }
    }
  }, [files, fileURL]);

  useEffect(() => {
    setFiles([]);
    setFileURL('');
  }, [props.headerTitle]);
  const handleMediaClose = () => setFiles([]);
  return (
    <div className={`${classes.mainContainer} ${customStyle}`}>
      {files.length === 0 ? (
        <>
          {headerTitle && <MessageHeader heading={headerTitle} iconType={{ type: headerTitleIcon }} />}
          <div className={classes.buttonContainer}>
            {options?.map((data, index) => {
              if (!fileOptions || (fileOptions && fileOptions.includes(data.id))) {
                return (
                  <div key={index} className={classes.buttonWrapper} onClick={() => handleUpload(data)}>
                    <IconButton className={classes.iconButton}>{data?.icon}</IconButton>
                    <span className={`${commonClasses.body15Regular} ${classes.iconText}`}>{data?.label}</span>
                  </div>
                );
              }
            })}
          </div>
          <input ref={inputRef} type="file" style={{ display: 'none' }} onChange={onSelectFile} accept={selected?.accept} />
        </>
      ) : (
        <AttachMedia
          files={files}
          handleClose={handleMediaClose}
          mediaType={selected.id}
          fileURL={fileURL}
          setFileURL={setFileURL}
          directShowCrop={directShowCrop}
          viewCross={viewCross}
        />
      )}
    </div>
  );
}
