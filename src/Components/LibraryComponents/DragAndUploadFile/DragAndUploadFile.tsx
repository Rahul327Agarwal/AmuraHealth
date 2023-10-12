import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { CircleCameraIcon, CirclePictureIcon, UploadIcon } from './DragAndUploadFile.svg';
import { isValidSize, isValidType } from './DragAndUploadFile.function';
import { useStyles } from './DragAndUploadFile.styles';
import { IProps } from './DragAndUploadFile.types';
import PreviewImage from './PreviewImage';

export default function UploadAndCrop(props: IProps) {
  const { maxFileSizeKb, files, setFiles, fileOptions, multiple, acceptedFiles } = props;
  const { classes } = useStyles();
  const inputRef = React.useRef(null);

  const handleCamera = () => {};
  const handleUpload = () => inputRef.current.click();

  const handleFileChange = (file) => {
    const addStatus = [...file]?.map((data) => {
      let status = '';
      if (isValidSize(data.size, maxFileSizeKb) && isValidType(data.type, acceptedFiles)) {
        status = 'OK';
      } else {
        status = 'ERROR';
      }
      return { file: data, status };
    });
    setFiles((pre) => {
      const allValue = [...pre, ...addStatus].filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.file.name === value.file.name && t.file.size === value.file.size)
      );
      return [...allValue];
    });
  };

  const acceptType = acceptedFiles.map((type) => type.split('/')[1]);

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.buttonContainer}>
          {fileOptions.includes('CAMERA') && (
            <div className={classes.buttonWrapper} onClick={handleCamera}>
              <i>
                <CircleCameraIcon />
              </i>
              <span className={classes.iconText}>Camera</span>
            </div>
          )}
          {fileOptions.includes('PHOTOS') && (
            <div className={classes.buttonWrapper} onClick={handleUpload}>
              <i>
                <CirclePictureIcon />
              </i>
              <span className={classes.iconText}>Photos</span>
            </div>
          )}
        </div>
        <div className={classes.dragAndDrop}>
          <FileUploader
            handleChange={handleFileChange}
            accept={acceptType}
            name="file"
            fileOrFiles={files}
            hoverTitle=""
            multiple={multiple}
          >
            <div className={classes.dragDropContainer}>
              <p>Drag and Drop the files here</p>
              <span>
                <UploadIcon />
              </span>
            </div>
          </FileUploader>
        </div>
        <div className={classes.filePreview}>
          <PreviewImage files={files} setFiles={setFiles} />
        </div>
        <input
          type="file"
          accept={acceptedFiles.join(', ')}
          style={{ display: 'none' }}
          ref={inputRef}
          onChange={(e) => handleFileChange(e?.target?.files)}
          multiple={multiple}
        />
      </div>
    </>
  );
}
