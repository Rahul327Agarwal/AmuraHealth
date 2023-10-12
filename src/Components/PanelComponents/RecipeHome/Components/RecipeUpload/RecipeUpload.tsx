import { IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import ErrorToaster from '../../../../../Common/ErrorToaster';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import BulkFileViewer from '../../../../LibraryComponents/BulkFileViewer/BulkFileViewer';
import Cropper from '../../../../LibraryComponents/Cropper/Cropper';
import FileSelector from '../../../../LibraryComponents/FileSelector/FileSelector';
import MUIDrawer from '../../../../LibraryComponents/MUIDrawer/MUIDrawer';
import { PlusIcon } from '../../../../SVGs/Common';
import { useRecipeFiles } from '../RecipesBuilder/RecipesBuilder.state';
import { defaulttype } from './RecipeUpload.function';
import { useStyles } from './RecipeUpload.styles';
import { EditIcon } from './RecipeUpload.svg';
import { IProps } from './RecipeUpload.types';

const RecipeUpload = (props: IProps) => {
  const { maxFileSizeMb, acceptedFiles, multiple, setImageupload, preparationData, recipeData, preparationStepNo } = props;

  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();

  /** Global State */
  const [recipeFiles, setRecipeFiles] = useRecipeFiles();

  const [btnname, setBtnname] = useState('Upload file');

  /** Source Files (NON CROPPED PERMANENT) */
  const [sourceFiles, setSourceFiles] = useState<File[]>([]);
  /** Final Files (CROPPED AND DONE) */
  const [files, setFiles] = useState<File[]>([]);
  /** Files Currently Oppened in BulkFileViewer (TEMP) */
  const [openedFiles, setOpenedFiles] = useState<File[]>([]);
  /** Files Cropped but Not Finalized (TEMP) */
  const [tempFiles, setTempFiles] = useState<File[]>([]);

  // Keeps track of Origianl Edited Files (DELETE, CROPPED)
  const [editedFileName, setEditedFileName] = useState<string[]>([]);

  const [showBulkViewer, setShowBulkViewer] = useState(false);

  const [fileSelected, setFileSelected] = React.useState(-1);
  const [showCropper, setShowCropper] = useState(false);
  const [reRender, setRerender] = useState(new Date().getTime());
  const dropzoneRef = useRef(null);

  // Sets the incoming Files for Recipe or Preparation
  useEffect(() => {
    if (recipeData) {
      // RECIPE DATA
      setFiles(recipeFiles.recipeFiles);
      setSourceFiles(recipeFiles.sourceRecipeFiles);

      //
    } else if (preparationData) {
      // PREPARATION DATA

      const prepFile = recipeFiles.preparationFiles[preparationStepNo.toString()];
      const sourcePrepFile = recipeFiles.sourcePreparationFiles[preparationStepNo.toString()];

      if (prepFile) {
        setFiles([prepFile]);
      } else {
        setFiles([]);
      }
      if (sourcePrepFile) {
        setSourceFiles([sourcePrepFile]);
      } else {
        setSourceFiles([]);
      }
    }
  }, [recipeFiles, preparationStepNo]);

  const handleFileChange = (newFiles: File[]) => {
    setOpenedFiles([...sourceFiles, ...openedFiles, ...newFiles]);
    setTempFiles([...files, ...newFiles]);
    setFileSelected(newFiles.length ? 0 : -1);

    setShowBulkViewer(true);
  };

  const acceptType = acceptedFiles?.map((type) => type);
  const handlesize = () => {
    maxFileSizeMb
      ? ErrorToaster(`Max Allowed file size is ${maxFileSizeMb} Mb`, panelId, 'warning')
      : ErrorToaster('Max Allowed file size is 10 Mb', panelId, 'warning');
  };

  useEffect(() => {
    setBtnname(files?.length > 0 ? 'Upload more' : 'Upload file');
  }, [files.length]);

  const handleEdit = (file: File, index: number) => {
    handleFileChange([]);
    setFileSelected(index);

    setShowBulkViewer(true);
  };

  /**
   *
   * @param overrideTempFiles If provided, will be used instead of tempFiles
   * @param overrrideOpenedFiles
   * @param overrideEditedFiles
   */
  const handleDone = (
    shouldCloseViewer?: boolean,
    overrideTempFiles?: File[],
    overrrideOpenedFiles?: File[],
    overrideEditedFiles?: string[]
  ) => {
    setFiles(overrideTempFiles ?? tempFiles);
    setSourceFiles(overrrideOpenedFiles ?? openedFiles);

    if (shouldCloseViewer) {
      setShowBulkViewer(false);
      setOpenedFiles([]);
      setTempFiles([]);
    }

    // Set Data to parent

    // Final Files to Send to Parent State
    const filesToUpload = [...(overrideTempFiles ?? tempFiles)];
    const _openedFiles = [...(overrrideOpenedFiles ?? openedFiles)];

    setImageupload?.(filesToUpload.length > 0 ? 1 : 0);

    // PREPARATION DATA
    if (preparationData) {
      const originalEditedFiles = [recipeFiles.originalPreparationFilesURLs[preparationStepNo]].filter((url) => {
        if (!url) return false;
        const fileName = url.split('/').pop();
        const isEdited = overrideEditedFiles ?? editedFileName.includes(fileName);
        return isEdited;
      });

      setRecipeFiles((p) => ({
        ...p,
        preparationFiles: {
          ...p.preparationFiles,
          [preparationStepNo]: filesToUpload[0],
        },
        sourcePreparationFiles: {
          ...p.sourcePreparationFiles,
          [preparationStepNo]: _openedFiles[0],
        },
        editedOrignalPreparationFileURLs: {
          ...p.editedOrignalPreparationFileURLs,
          [preparationStepNo]: originalEditedFiles[0],
        },
      }));

      //
    } else if (recipeData) {
      // RECIPES DATA

      const originalEditedFiles = recipeFiles.originalRecipeFilesURLs.filter((url) => {
        const fileName = url.split('/').pop();
        const isEdited = editedFileName.includes(fileName);
        return isEdited;
      });

      setRecipeFiles((p) => ({
        ...p,
        recipeFiles: filesToUpload,
        sourceRecipeFiles: _openedFiles,
        editedOrignalFileURLs: originalEditedFiles,
      }));
    }
  };

  //
  return (
    <div key={reRender}>
      <div className={btnname == 'Upload more' ? classes.flexrow : classes.initialstyle}>
        {files.length > 0 && (
          <div className={classes.imagediv}>
            {files.map((file, index) => {
              const url = URL.createObjectURL(file);
              return (
                <div key={url} className={classes.container} onClick={() => handleEdit(file, index)}>
                  <img className={classes.img} src={url} alt="receipe image" />
                  <div className={classes.middle}>{<EditIcon />}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* {!(imageUrl?.length > 0 && !multiple && noView) && ( */}
        {(files.length < 1 || multiple) && (
          <FileSelector
            handleSave={(files) => {
              if (files.length > 0) {
                const fileArray = Array.from(files);
                // changeFileName
                const newFileArray = fileArray.map((file) => {
                  const fileNameUUID = v4();
                  const newFileName = `${fileNameUUID}.${file.name.split('.').pop()}`;
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
            maximumSize={(maxFileSizeMb || 10) * 1024}
            // onSizeError={() => handlesize()}
            onError={(error) => {
              handlesize();
            }}
            // fileOrFiles="null"
          >
            <IconButton className={classes.flexcolumn} ref={dropzoneRef}>
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
                  //
                  const oldFile = openedFiles[index];
                  const newEditedFileNames = [...editedFileName, oldFile.name];
                  setEditedFileName(newEditedFileNames);
                  //
                  setImageupload?.(0);

                  const filteredFiles = [...openedFiles];
                  filteredFiles.splice(index, 1);

                  const newTempFiles = [...tempFiles];
                  newTempFiles.splice(index, 1);

                  const newIndex = index == 0 ? 0 : index - 1;

                  setOpenedFiles(filteredFiles);
                  setTempFiles(newTempFiles);
                  setFileSelected(newIndex);

                  let newSourceFiles = (
                    preparationData
                      ? recipeFiles.sourcePreparationFiles[preparationStepNo]
                        ? [recipeFiles.sourcePreparationFiles[preparationStepNo]]
                        : []
                      : recipeFiles.sourceRecipeFiles
                  ).filter((actFile: File) => {
                    return oldFile.name !== actFile.name;
                  });
                  let newFiles = (
                    preparationData
                      ? recipeFiles.preparationFiles[preparationStepNo]
                        ? [recipeFiles.preparationFiles[preparationStepNo]]
                        : []
                      : recipeFiles.recipeFiles
                  ).filter((actFile: File) => {
                    return oldFile.name !== actFile.name;
                  });

                  if (newTempFiles.length <= 0) {
                    handleDone(true, newFiles, newSourceFiles, newEditedFileNames);
                  } else {
                    handleDone(false, newFiles, newSourceFiles, newEditedFileNames);
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
export default RecipeUpload;
