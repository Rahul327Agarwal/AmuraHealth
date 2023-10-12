import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'swiper/swiper-bundle.min.css';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import {
  CropIcon,
  CrossIcon,
  DeleteIconDark,
  FileIcon,
  LeftArrowIcon,
  MusicIcon,
  NoFileIcon,
  RightArrowIcon,
} from '../../SVGs/Common';
import MediaAudio from '../ChatComponent/Media/MediaAudio';
import VideoPlayerNewDesign from '../ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign';
import FileSelector from '../FileSelector/FileSelector';
import Button from '../MUIButton/MUIButton';
import { useStyles } from './BulkFileViewer.styles';
import { IFileDetails, IProps } from './BulkFileViewer.types';

export default function BulkFileViewer(props: IProps) {
  const {
    files,
    handleClose,
    handleCrop,
    handleDelete,
    handleDone,
    handleSelectMore,
    acceptedFileFormats,
    maximumSize,
    multiple,
    dontShowFileName,
  } = props;

  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  const [fileDetails, setFileDetails] = useState<IFileDetails[]>([]);

  const [totalPages, setTotalPages] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex ?? -1);
  const selectedFileDetails = selectedIndex < 0 ? undefined : fileDetails[selectedIndex];

  const fileThumbnailContainerRef = useRef(null);

  useEffect(() => {
    if (files.length >= 1) {
      setFileDetails(
        files.map((file, index) => {
          return {
            fileName: file.name,
            file: file,
            url: URL.createObjectURL(file),
            fileType: file?.type?.slice(0, 6),
          };
        })
      );
      setSelectedIndex(props.selectedIndex ?? 0);

      const childWidth = fileThumbnailContainerRef.current.firstChild.offsetWidth ?? 0;
      const movement = childWidth * selectedIndex - 5;
      fileThumbnailContainerRef.current.scrollLeft = movement;
    }
  }, [files]);

  const handleOnWheel = (e) => {
    e.preventDefault();
    const container = fileThumbnailContainerRef.current;
    const containerScrollPosition = fileThumbnailContainerRef.current.scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
    });
  };

  const onDocumentLoadSuccess = async (pdf) => {
    setTotalPages(pdf.numPages);
  };

  const getFileSize = (sizeInByte) => {
    const unitArray = ['Bytes', 'KB', 'MB'];
    let index = 0;
    while (Math.round(sizeInByte / 1024) >= 1) {
      sizeInByte = sizeInByte / 1024;
      index++;
    }
    return Math.round(sizeInByte) + '' + unitArray[index];
  };

  return (
    <div className={classes.mainContainer}>
      {
        <div className={classes.wrapper}>
          <div className={classes.functioniconsCon}>
            {/* Delete */}
            <span
              className={classes.funcIcon}
              onClick={() => {
                const newSelectedIndex = selectedIndex === 0 ? 0 : selectedIndex - 1;
                setSelectedIndex(newSelectedIndex);

                handleDelete(selectedIndex);
              }}
            >
              {<DeleteIconDark />}
            </span>

            {/* Crop (only on Image) */}
            {selectedFileDetails?.fileType === 'image/' && (
              <span
                className={classes.funcIcon}
                onClick={() => {
                  handleCrop(selectedIndex);
                }}
              >
                {<CropIcon />}
              </span>
            )}

            {/* Close */}
            <span className={classes.funcIcon} onClick={handleClose}>
              {<CrossIcon />}
            </span>
          </div>

          {/*  */}

          {files.length > 0 ? (
            <div className={classes.selectedFileCon}>
              {/* Pdf */}
              {selectedFileDetails?.fileType === 'applic' && (
                <div className={classes.pdfDivWrapper}>
                  <Document className={classes.pdfDiv} file={selectedFileDetails?.url} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={1} scale={1} renderTextLayer={false} />
                  </Document>
                  <div className={classes.pdfinfo}>
                    <div>{<FileIcon />}</div>
                    <div className={classes.pdfnamewrapper}>
                      <div className={`${classes.pdfname} ${commonClass.body15Medium}`}>{selectedFileDetails?.fileName}</div>
                      <div className={classes.nameWrapper}>
                        <div className={`${classes.pdfcount} ${commonClass.sm10Regular}`}>{totalPages} pages</div>
                        <div className={`${classes.pdfcount} ${commonClass.sm10Regular}`}>
                          {getFileSize(selectedFileDetails.file.size)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Image */}
              {selectedFileDetails?.fileType === 'image/' && (
                <img className={classes.filesView1} src={selectedFileDetails?.url} alt="images" />
              )}
              {/* Video */}
              {selectedFileDetails?.fileType === 'video/' && <VideoPlayerNewDesign src={selectedFileDetails?.url} />}

              {/* Audio */}
              {selectedFileDetails?.fileType === 'audio/' && <MediaAudio src={selectedFileDetails?.url} />}
              {/* Other */}
              {selectedFileDetails &&
                selectedFileDetails?.fileType !== 'audio/' &&
                selectedFileDetails?.fileType !== 'image/' &&
                selectedFileDetails?.fileType !== 'video/' &&
                selectedFileDetails?.fileType !== 'applic' && (
                  <div className={classes.wrap}>
                    <div className={classes.docView}>
                      <div className={classes.marginAuto}>
                        <div className={classes.noFileIcon}>{<NoFileIcon />}</div>
                        <div className={`${classes.noPreview} ${commonClass.sm10Regular}`}>
                          <span>{`No Preview available!`}</span>
                        </div>
                      </div>
                    </div>
                    <div className={classes.docWrapper}>
                      <div>{<FileIcon />}</div>
                      <span className={`${commonClass.body15Medium} ${classes.wrapText}`}>{selectedFileDetails?.fileName}</span>
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div className={classes.docView}>
              <div className={classes.marginAuto}>
                <div className={classes.noFileIcon}>{<NoFileIcon />}</div>
                <div className={`${classes.noPreview} ${commonClass.sm10Regular}`}>
                  <span>{`Nothing is Selected!`}</span>
                </div>
              </div>
            </div>
          )}

          <div className={classes.nameandCountCon}>
            {files.length >= 1 && (
              <span className={classes.fileNameText}>
                {!dontShowFileName ? (selectedFileDetails?.fileType === 'applic' ? ' ' : selectedFileDetails?.fileName) : ''}{' '}
              </span>
            )}
            <div className={classes.countContainer}>
              <div
                className={selectedIndex > 0 ? `${classes.navIconDiv}` : `${classes.navIconDiv} ${classes.hiddenDiv}`}
                onClick={(e) => {
                  e.persist();
                  setSelectedIndex(selectedIndex - 1);

                  const childWidth = fileThumbnailContainerRef.current.firstChild.offsetWidth ?? 0;
                  const movement = childWidth * (selectedIndex - 1) - 5;
                  fileThumbnailContainerRef.current.scrollLeft = movement;
                }}
              >
                {<LeftArrowIcon />}
              </div>
              <span className={classes.countStyle}>{files.length > 1 ? `${selectedIndex + 1} /${files.length}` : ''}</span>
              <div
                className={
                  selectedIndex < files.length - 1 ? `${classes.navIconDiv}` : `${classes.navIconDiv} ${classes.hiddenDiv}`
                }
                onClick={(e) => {
                  e.persist();
                  setSelectedIndex(selectedIndex + 1);
                  const childWidth = fileThumbnailContainerRef.current.firstChild.offsetWidth ?? 0;
                  const movement = childWidth * (selectedIndex + 1) + 5;
                  fileThumbnailContainerRef.current.scrollLeft = movement;
                }}
              >
                {<RightArrowIcon />}
              </div>
            </div>
          </div>
          <div className={classes.fileThumbnailContainer} ref={fileThumbnailContainerRef} onWheel={handleOnWheel}>
            {files.map((file, index) => {
              return (
                <div
                  id={`fileAttached-${index}`}
                  className={`${classes.iconDiv} ${
                    index === selectedIndex || (index === 0 && selectedIndex == -1) ? classes.iconDivActive : ''
                  }`}
                  onClick={(e) => {
                    setSelectedIndex(index);
                  }}
                >
                  {file?.type?.slice(0, 6) === 'video/' && (
                    <video
                      controls={false}
                      src={URL.createObjectURL(file)}
                      style={{
                        borderRadius: '5px',
                        width: '100%',
                        height: '100%',
                      }}
                    ></video>
                  )}
                  {file?.type?.slice(0, 6) === 'image/' && (
                    <img
                      className={`${classes.filesView} ${index === selectedIndex ? classes.filesViewActive : ''}`}
                      alt="imgages"
                      src={URL.createObjectURL(file)}
                    />
                  )}
                  {file?.type?.slice(0, 6) === 'audio/' && <span className={classes.IconWrapper}>{<MusicIcon />}</span>}
                  {file?.type?.slice(0, 6) !== 'video/' &&
                    file?.type?.slice(0, 6) !== 'audio/' &&
                    file?.type?.slice(0, 6) !== 'image/' && <span className={classes.IconWrapper}>{<FileIcon />}</span>}
                </div>
              );
            })}
          </div>
        </div>
      }
      {
        <div className={classes.cropFooter}>
          <Button className={`${commonClass.body15Medium} ${classes.Footercolor}`} onClick={handleDone}>
            Done
          </Button>
          {multiple && (
            <FileSelector
              acceptedFileFormats={acceptedFileFormats ?? ['.jpg']}
              handleSave={handleSelectMore}
              maximumSize={maximumSize}
              multiple
            >
              <Button className={`${commonClass.body15Medium} ${classes.Footercolor}`}>+ Select more</Button>
            </FileSelector>
          )}
        </div>
      }
    </div>
  );
}
