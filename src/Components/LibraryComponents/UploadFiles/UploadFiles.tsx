import { CircularProgress, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { v4 } from 'uuid';
import ErrorToaster from '../../../Common/ErrorToaster';
import { PlusIcon } from '../../SVGs/Common';
import BulkFileViewer from '../BulkFileViewer/BulkFileViewer';
import Cropper from '../Cropper/Cropper';
import FileSelector from '../FileSelector/FileSelector';
import MUIDrawer from '../MUIDrawer/MUIDrawer';
import { defaulttype } from './UploadFiles.function';
import { useStyles } from './UploadFiles.styles';
import { EditIcon } from './UploadFiles.svg';
import { IProps } from './UploadFiles.types';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const UploadFiles = (props: IProps) => {
  const { ParentuploadFiles, maxFileSizeMb, acceptedFiles, multiple, onUpload, fileLimit } = props;

  const { classes } = useStyles();

  const [btnname, setBtnname] = useState('Upload file');

  /** Source Files (NON CROPPED PERMANENT) initial uploaded image*/
  const [sourceFiles, setSourceFiles] = useState<File[]>([]);
  /** Final Files (CROPPED AND DONE) */
  const [files, setFiles] = useState<File[]>([]);
  /** Files Currently Opened in BulkFileViewer (TEMP) files you see in the bottom */
  const [openedFiles, setOpenedFiles] = useState<File[]>([]);
  /** Files Cropped but Not Finalized (TEMP). The files you see in the cropper drawer */
  const [tempFiles, setTempFiles] = useState<File[]>([]);

  const [isLoading, setLoading] = useState(false);

  // Keeps track of Origianl Edited Files (DELETE, CROPPED)
  const [editedFileName, setEditedFileName] = useState<string[]>([]);
  const [showBulkViewer, setShowBulkViewer] = useState(false);
  const [fileSelected, setFileSelected] = React.useState(-1);
  const [showCropper, setShowCropper] = useState(false);
  const [reRender, setRerender] = useState(new Date().getTime());
  const [fileURLS, setFileURLS] = useState([]);
  const dropzoneRef = useRef(null);
  const acceptType = acceptedFiles?.map((type) => type);
  const { id: panelId } = useCurrentPanel();

  // Sets the incoming Files for Recipe or Preparation
  useEffect(() => {
    setFiles(ParentuploadFiles);
    setSourceFiles(ParentuploadFiles);
    let newFileURLS = ParentuploadFiles.map((file) => URL.createObjectURL(file));
    setFileURLS(newFileURLS);
  }, [ParentuploadFiles]);

  const handleFileChange = (newFiles: File[]) => {
    let allFiles = [...sourceFiles, ...newFiles];

    setOpenedFiles(allFiles);
    setTempFiles([...files, ...newFiles]);
    setFileSelected(newFiles.length ? 0 : -1);
    setShowBulkViewer(true);
  };

  const handlesize = () => {
    maxFileSizeMb
      ? ErrorToaster(`Max Allowed file size is ${maxFileSizeMb} Mb`, panelId, 'error')
      : ErrorToaster('Max Allowed file size is 10 Mb', panelId, 'error');
  };

  useEffect(() => {
    setBtnname(files?.length > 0 ? 'Upload more' : 'Upload file');
  }, [files.length]);

  const handleEdit = (file: File, index: number) => {
    handleFileChange([]);
    setFileSelected(index);
    setShowBulkViewer(true);
  };

  const handleDone = (shouldCloseViewer?: boolean, overrideTempFiles?: File[], overrrideOpenedFiles?: File[]) => {
    if (tempFiles.length > fileLimit) {
      ErrorToaster(`You can only add at maximum of ${fileLimit} atttachments`, panelId, 'error');
      return;
    }
    setFiles(overrideTempFiles ?? tempFiles);
    onUpload(overrideTempFiles ?? tempFiles);
    setSourceFiles(overrrideOpenedFiles ?? openedFiles);
    const shouldClose = shouldCloseViewer !== undefined ? shouldCloseViewer : true;

    if (shouldClose) {
      setShowBulkViewer(false);
      setOpenedFiles([]);
      setTempFiles([]);
    }
  };

  //
  return (
    <div key={reRender}>
      <div className={btnname == 'Upload more' ? classes.flexrow : classes.initialstyle}>
        {files.length > 0 && (
          <div className={classes.imagediv}>
            {isLoading && (
              <>
                <CircularProgress className={classes.loader} />
              </>
            )}

            {files.map((file, index) => {
              // const url = URL.createObjectURL(file);
              if (file.type.split('/').pop() === 'pdf') {
                return (
                  <div className={classes.container} onClick={() => handleEdit(file, index)}>
                    <Document className={classes.pdfDiv} file={fileURLS[index]}>
                      <Page pageNumber={1} scale={1} renderTextLayer={false} />
                    </Document>
                    <div className={classes.middle}>{<EditIcon />}</div>
                  </div>
                );
              }
              return (
                <div className={classes.container} onClick={() => handleEdit(file, index)}>
                  <img className={classes.img} src={fileURLS[index]} alt="image" />
                  <div className={classes.middle}>{<EditIcon />}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* {!(imageUrl?.length > 0 && !multiple && noView) && ( */}
        {(files.length < 1 || multiple) && (!fileLimit || files.length < fileLimit) && (
          <FileSelector
            handleSave={(files) => {
              if (files.length > 0) {
                const fileArray = Array.from(files) as File[];
                // changeFileName
                const newFileArray = fileArray.map((file) => {
                  // const fileNameUUID = v4();
                  const newFileName = file.name; //`${fileNameUUID}.${file.name.split('.').pop()}`;
                  const newFile = new File([file], newFileName, {
                    type: file.type,
                  });
                  return newFile;
                });
                handleFileChange(newFileArray);
              }
            }}
            acceptedFileFormats={(acceptedFiles ? acceptType : defaulttype).map((type) => `.${type}`)}
            // name="file"
            multiple={multiple}
            // filesLimit={multiple ? 9999 : 1}
            maximumSize={(maxFileSizeMb ? maxFileSizeMb : 10) * 1024}
            // onSizeError={() => handlesize()}
            onError={(error) => {
              handlesize();
            }}
            // fileOrFiles="null"
          >
            <IconButton
              className={btnname === 'Upload file' ? classes.directionRow : classes.flexcolumn}
              ref={dropzoneRef}
              disabled={isLoading || (fileLimit && files.length >= fileLimit)}
            >
              <div>{<PlusIcon />}</div>
              <h1 className={classes.uploadbtn}>{btnname}</h1>
            </IconButton>
          </FileSelector>
        )}
        {showBulkViewer && (
          <MUIDrawer
            anchor="bottom"
            open={showBulkViewer}
            headerTitle={''}
            handleClose={() => {
              setOpenedFiles([]);
              setTempFiles([]);
            }}
            disableCross
            className={classes.muiDrawerStyle}
            closeNestedFlyout={() => {
              setShowCropper(false);
              setRerender(new Date().getTime());
            }}
          >
            {!showCropper && (
              <BulkFileViewer
                files={tempFiles}
                dontShowFileName={true}
                handleClose={() => {
                  setOpenedFiles([]);
                  setTempFiles([]);
                  setShowBulkViewer(false);
                  setRerender(new Date().getTime());
                }}
                handleCrop={(index) => {
                  setFileSelected(index);
                  setShowCropper(true);
                }}
                handleDelete={(index) => {
                  const oldFile = openedFiles[index];
                  const newEditedFileNames = [...editedFileName, oldFile.name];
                  setEditedFileName(newEditedFileNames);

                  const filteredFiles = [...openedFiles];
                  filteredFiles.splice(index, 1);

                  const newTempFiles = [...tempFiles];
                  newTempFiles.splice(index, 1);

                  const newIndex = index === 0 ? 0 : index - 1;

                  setOpenedFiles(filteredFiles);
                  setTempFiles(newTempFiles);
                  setFileSelected(newIndex);

                  if (newTempFiles.length <= 0) {
                    handleDone(true, newTempFiles, filteredFiles);
                  } else {
                    handleDone(false, newTempFiles, filteredFiles);
                  }
                }}
                selectedIndex={fileSelected}
                handleDone={handleDone}
                handleSelectMore={(newFiles) => {
                  setOpenedFiles([...openedFiles, ...newFiles]);
                  setTempFiles([...tempFiles, ...newFiles]);
                  setFileSelected(tempFiles.length + newFiles.length - 1);
                }}
                acceptedFileFormats={(acceptedFiles ? acceptType : defaulttype).map((type) => `.${type}`)}
                maximumSize={maxFileSizeMb ? maxFileSizeMb * 1024 : 10 * 1024}
                multiple={multiple}
              />
            )}

            {showCropper && (
              <Cropper
                originalFile={openedFiles[fileSelected]}
                handleClose={() => {
                  setShowCropper(false);
                  setRerender(new Date().getTime());
                }}
                handleCrop={(newCroppedFile) => {
                  // isFileActuallyChanged
                  const oldFile = openedFiles[fileSelected];
                  const isFileActuallyChanged = oldFile.name !== newCroppedFile.name || oldFile.size !== newCroppedFile.size;
                  if (isFileActuallyChanged) {
                    setEditedFileName((p) => [...p, oldFile.name]);
                  }
                  const newFiles = [...tempFiles];
                  newFiles[fileSelected] = newCroppedFile;
                  setTempFiles(newFiles);
                  setShowCropper(false);
                }}
                viewCross={true}
                isSlide={true}
              />
            )}
          </MUIDrawer>
        )}
      </div>
    </div>
  );
};
export default UploadFiles;
