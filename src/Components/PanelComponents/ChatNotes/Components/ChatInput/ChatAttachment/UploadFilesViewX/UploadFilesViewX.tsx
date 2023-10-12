import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Document, Page } from 'react-pdf';
import { useStyles } from './UploadFilesViewX.styles';

import {
  CropIcon,
  CrossIcon,
  DeleteIcon,
  DeleteIconDark,
  FileIcon,
  LeftArrowIcon,
  MusicIcon,
  NoFileIcon,
  RightArrowIcon,
} from '../../../../../../SVGs/Common';
import { IProps } from './UploadFilesViewX.types';
import { useCommonStyles } from '../../../../../../../Common/Theme/CommonStyles';
import ImageCropper from '../../../../../../LibraryComponents/ImageCropper/ImageCropper';
import MediaAudio from '../../../../../../LibraryComponents/ChatComponent/Media/MediaAudio';
import VideoPlayerNewDesign from '../../../../../../LibraryComponents/ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign';
import { UploadFilesViewXUtils } from './UploadFilesViewX.functions';
import { clamp } from 'lodash';

export function UploadFilesViewX(props: IProps) {
  const { classes } = useStyles();
  const { files, setFiles, onViewerStateChange, onSelectedIndexChange } = props;

  const commonClass = useCommonStyles();

  const [isCropperActive, setIsCropperActive] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  const [pdfTotalPages, setPDFTotalPages] = useState(0);

  const fileThumbnailContainerRef = useRef(null);

  const selectedFile = files?.[selectedFileIndex];

  useEffect(() => {
    onViewerStateChange?.(isCropperActive ? 'cropper' : 'viewer');
  }, [isCropperActive]);

  useEffect(() => {
    onSelectedIndexChange?.(selectedFileIndex);
  }, [selectedFileIndex]);

  const handleOnWheel = (e) => {
    e.preventDefault();
    const container = fileThumbnailContainerRef.current;
    const containerScrollPosition = fileThumbnailContainerRef.current.scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
    });
  };

  const onDelete = () => {
    const newFiles = files.filter((file, index) => selectedFileIndex !== index);
    setFiles(newFiles);

    const newIndex = clamp(selectedFileIndex, 0, newFiles.length - 1);
    setSelectedFileIndex(newIndex);

    if (newFiles.length === 0) {
      props.handleClose?.();
    }

    props?.onDelete(selectedFileIndex);
  };

  const handleClose = () => {
    setFiles([]);
    props.handleClose?.();
  };

  return (
    <div className={classes.mainContainer}>
      {isCropperActive && (
        <ImageCropper
          crossIconAbsolute
          image={selectedFile?.sourceFileURL}
          setImage={() => {}}
          setCroppedImage={async (fileURL) => {
            const file = await UploadFilesViewXUtils.getFileFromLocalURL(fileURL, selectedFile?.fileName, selectedFile?.fileType);
            const newFiles = [...files];
            newFiles[selectedFileIndex].file = file;
            newFiles[selectedFileIndex].fileURL = fileURL;
            newFiles[selectedFileIndex].fileSize = file.size;
            setFiles(newFiles);
          }}
          handleClose={() => {
            setIsCropperActive(false);
          }}
          viewCross={true}
          isSlide={true}
        />
      )}

      {!isCropperActive && (
        <div className={classes.wrapper}>
          <div className={classes.functioniconsCon}>
            <span className={classes.funcIcon} onClick={onDelete}>
              <DeleteIconDark />
            </span>

            {selectedFile?.fileTypeCategory === 'image' && (
              <span
                className={classes.funcIcon}
                onClick={() => {
                  setIsCropperActive(true);
                }}
              >
                <CropIcon />
              </span>
            )}
            <span className={classes.funcIcon} onClick={handleClose}>
              <CrossIcon />
            </span>
          </div>

          <div className={classes.selectedFileCon}>
            {selectedFile?.fileTypeCategory === 'audio' && <MediaAudio src={selectedFile?.fileURL} />}

            {selectedFile?.fileTypeCategory === 'unknown' && (
              <div className={classes.wrap}>
                <div className={classes.docView}>
                  <div className={classes.marginAuto}>
                    <div className={classes.noFileIcon}>
                      <NoFileIcon />
                    </div>
                    <div className={`${classes.noPreview} ${commonClass.sm10Regular}`}>
                      <span>{`No Preview available!`}</span>
                    </div>
                  </div>
                </div>
                <div className={classes.docWrapper}>
                  <div>
                    <FileIcon />
                  </div>
                  <span className={`${commonClass.body15Medium} ${classes.wrapText}`}>{selectedFile?.fileName}</span>
                </div>
              </div>
            )}

            {selectedFile?.fileTypeCategory === 'image' && (
              <img className={classes.filesView} src={selectedFile?.fileURL} alt="imgages" />
            )}

            {/* Pdf */}

            {selectedFile?.fileTypeCategory === 'pdf' && (
              <div className={classes.pdfDivWrapper}>
                <Document
                  className={classes.pdfDiv}
                  file={selectedFile?.fileURL}
                  onLoadSuccess={(pdf) => {
                    setPDFTotalPages(pdf.numPages);
                  }}
                >
                  <Page pageNumber={1} scale={1} renderTextLayer={false} />
                </Document>
                <div className={classes.pdfinfo}>
                  <div>{<FileIcon />}</div>
                  <div className={classes.pdfnamewrapper}>
                    <div className={`${classes.pdfname} ${commonClass.body15Medium}`}>{selectedFile?.fileName}</div>
                    <div className={classes.nameWrapper}>
                      <div className={`${classes.pdfcount} ${commonClass.sm10Regular}`}>{pdfTotalPages} pages</div>
                      <div className={`${classes.pdfcount} ${commonClass.sm10Regular}`}>
                        {UploadFilesViewXUtils.formatFileSize(selectedFile?.fileSize ?? 0)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedFile?.fileTypeCategory === 'video' && <VideoPlayerNewDesign src={selectedFile?.fileURL} />}
          </div>

          <div className={classes.nameandCountCon}>
            <span className={classes.fileNameText}>
              {selectedFile?.fileTypeCategory === 'pdf' ? ' ' : selectedFile?.fileName}{' '}
            </span>
            <div className={classes.countContainer}>
              <div
                className={selectedFileIndex > 0 ? `${classes.navIconDiv}` : `${classes.navIconDiv} ${classes.hiddenDiv}`}
                onClick={(e) => {
                  e.persist();
                  const newIndex = clamp(selectedFileIndex - 1, 0, files.length - 1);
                  setSelectedFileIndex(newIndex);

                  const childWidth = fileThumbnailContainerRef.current.firstChild.offsetWidth ?? 0;
                  const movement = childWidth * newIndex - 5;
                  fileThumbnailContainerRef.current.scrollLeft = movement;
                }}
              >
                {' '}
                <LeftArrowIcon />{' '}
              </div>
              <span className={classes.countStyle}>
                {selectedFileIndex + 1} / {files.length}
              </span>
              <div
                className={
                  selectedFileIndex < files.length - 1 ? `${classes.navIconDiv}` : `${classes.navIconDiv} ${classes.hiddenDiv}`
                }
                onClick={(e) => {
                  e.persist();
                  const newIndex = clamp(selectedFileIndex + 1, 0, files.length - 1);
                  setSelectedFileIndex(newIndex);

                  const childWidth = fileThumbnailContainerRef.current.firstChild.offsetWidth ?? 0;
                  const movement = childWidth * newIndex + 5;
                  fileThumbnailContainerRef.current.scrollLeft = movement;
                }}
              >
                {' '}
                <RightArrowIcon />{' '}
              </div>
            </div>
          </div>

          {/*  */}

          <div className={classes.fileThumbnailContainer} ref={fileThumbnailContainerRef} onWheel={handleOnWheel}>
            {files.map((file, index) => {
              return (
                <div
                  id={`fileAttached-${index}`}
                  className={`${classes.iconDiv} ${
                    index === selectedFileIndex || (index === 0 && selectedFileIndex == -1) ? classes.iconDivActive : ''
                  }`}
                  onClick={(e) => {
                    setSelectedFileIndex(index);
                  }}
                >
                  {file.fileTypeCategory === 'video' && (
                    <video
                      controls={false}
                      src={file.fileURL}
                      style={{
                        borderRadius: '5px',
                        width: '100%',
                        height: '100%',
                      }}
                    ></video>
                  )}
                  {file.fileTypeCategory === 'image' && (
                    <img
                      className={`${classes.filesView} ${index === selectedFileIndex ? classes.filesViewActive : ''}`}
                      alt="imgages"
                      src={file.fileURL}
                    />
                  )}
                  {file.fileTypeCategory === 'audio' && (
                    <span className={classes.IconWrapper}>
                      <MusicIcon />
                    </span>
                  )}
                  {file.fileTypeCategory === 'pdf' || file.fileTypeCategory === 'unknown' ? (
                    <span className={classes.IconWrapper}>
                      <FileIcon />
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
