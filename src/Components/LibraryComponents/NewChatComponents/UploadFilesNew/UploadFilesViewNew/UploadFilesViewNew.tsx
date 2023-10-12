import { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useDispatch, useSelector } from 'react-redux';
import MediaAudio from '../../../ChatComponent/Media/MediaAudio';
import ImageCropper from '../../../ImageCropper/ImageCropper';
import { useStyles } from './UploadFilesViewNew.styles';
import { IProps } from './UploadFilesViewNew.types.';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { setIndexData, setMessageInputData } from '../../../../../DisplayFramework/State/Slices/MessageInput';
import { IRootState } from '../../../../../DisplayFramework/State/store';
import {
  CropIcon,
  CrossIcon,
  DeleteIconDark,
  FileIcon,
  LeftArrowIcon,
  MusicIcon,
  NoFileIcon,
  RightArrowIcon,
} from '../../../../SVGs/Common';
import VideoPlayerNewDesign from '../../../ChatComponent/VideoPlayerNewDesign/VideoPlayerNewDesign';

export default function UploadFilesViewNew(props: IProps) {
  const { classes } = useStyles();
  const MessageInputSelector = useSelector((state: IRootState) => state.MessageInput.MessageInputData);

  const dispatch = useDispatch();

  const { files, setFiles, sourceFiles, focusMessageInput } = props;
  const commonClass = useCommonStyles();
  const [isCropper, setIsCropper] = useState(false);
  const [fileSelected, setFileSelected] = useState(0);
  const [filesURL, setFilesURL] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  const currentIndex = useSelector((state: IRootState) => state.MessageInput.currentIndex);
  const [selectedFileDetails, setSelectedFileDetails] = useState<any>({
    name: files?.length > 0 ? files[currentIndex].name : '',
    url: files?.length > 0 ? URL.createObjectURL(files[currentIndex]) : '',
    indexis: currentIndex,
    fileTypeis: files[currentIndex]?.type?.slice(0, 6),
    file: files[currentIndex],
  });
  const fileThumbnailContainerRef = useRef(null);

  useEffect(() => {
    if (files.length >= 1) {
      setSelectedFileDetails({
        name: files?.length > 0 ? files[0].name : '',
        url: URL.createObjectURL(files[0]),
        indexis: 0,
        fileTypeis: files[0]?.type?.slice(0, 6),
        file: files[0],
      });
      let tempURLArray = [];
      files.forEach((_, index) => {
        tempURLArray.push(URL.createObjectURL(files[index]));
      });
      setFilesURL([...tempURLArray]);
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

  const convertURLToFile = async (fileURL: string, files: any) => {
    const res: Response = await fetch(fileURL);
    const blob: Blob = await res.blob();
    const file = new File([blob], files?.name, {
      type: files?.type,
      lastModified: Date.now(),
    });
    return file;
  };

  const updateImageFile = async (fileUrl, existingFiles, selectedIndex) => {
    try {
      let modifiedFile = await convertURLToFile(fileUrl, existingFiles[selectedIndex]);
      let tempFiles = existingFiles;
      tempFiles[selectedIndex] = modifiedFile;
      return tempFiles;
    } catch (e) {
      console.log('Error in update cropped image', e);
      return existingFiles;
    }
  };

  const handleShowCroppper = () => {
    setIsCropper(true);
    props.setDisableSend(true);
  };

  const handleCropperClose = () => {
    setIsCropper(false);
    props.setDisableSend(false);
  };
  const onDelete = () => {
    setFiles(files.filter((data, ind) => (fileSelected == -1 ? ind != 0 : ind != fileSelected)));

    let tempData = JSON.parse(JSON.stringify(MessageInputSelector));
    const newFile = tempData.filter((value, index) => index != (fileSelected == -1 ? 0 : fileSelected));
    dispatch(setMessageInputData(newFile));

    const newIndex = currentIndex - 1 === -1 ? 0 : currentIndex - 1;
    setFileSelected(newIndex);
    setSelectedFileDetails({
      name: files[newIndex].name,
      url: URL.createObjectURL(files[newIndex]),
      indexis: newIndex,
      fileTypeis: files[newIndex]?.type?.slice(0, 6),
      file: files[newIndex],
    });
    dispatch(setIndexData(newIndex));
    if (props.openReply && files.length < 2) props.handleClose();
  };

  const handleClose = () => {
    dispatch(setMessageInputData([]));
    setSelectedFileDetails([]);
    setFiles([]);
    if (props.handleClose) {
      props.handleClose();
    }
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
  const onDocumentLoadSuccess = async (pdf) => {
    setTotalPages(pdf.numPages);
  };

  const getCroppedFileImage = () => {
    if (fileSelected > -1) {
      const selectedFileName = files[fileSelected].name;
      const selectedFileDetails = sourceFiles.find(({ name }) => name === selectedFileName);
      return URL.createObjectURL(selectedFileDetails);
    } else {
      return URL.createObjectURL(sourceFiles[0]);
    }
  };
  return (
    <div className={classes.mainContainer}>
      {isCropper && (
        <ImageCropper
          image={getCroppedFileImage()}
          setImage={() => {}}
          setCroppedImage={async (fileURL) => {
            let selectedIndex = fileSelected === -1 ? 0 : fileSelected;
            let modifiedFiles = await updateImageFile(fileURL, files, selectedIndex);
            setSelectedFileDetails({
              name: modifiedFiles[selectedIndex].name,
              url: URL.createObjectURL(modifiedFiles[selectedIndex]),
              indexis: selectedIndex,
              fileTypeis: modifiedFiles[selectedIndex]?.type?.slice(0, 6),
            });
            setFiles(modifiedFiles);
          }}
          handleClose={handleCropperClose}
          viewCross={true}
          isSlide={true}
        />
      )}

      {!isCropper && (
        <div className={classes.wrapper}>
          <div className={classes.functioniconsCon}>
            <span className={classes.funcIcon} onClick={onDelete}>
              <DeleteIconDark />
            </span>

            {selectedFileDetails.fileTypeis === 'image/' && (
              <span className={classes.funcIcon} onClick={handleShowCroppper}>
                <CropIcon />
              </span>
            )}
            <span className={classes.funcIcon} onClick={handleClose}>
              <CrossIcon />
            </span>
          </div>
          <div className={classes.selectedFileCon}>
            {selectedFileDetails.fileTypeis === 'audio/' && <MediaAudio src={selectedFileDetails.url} />}
            {selectedFileDetails.fileTypeis !== 'audio/' &&
              selectedFileDetails.fileTypeis !== 'image/' &&
              selectedFileDetails.fileTypeis !== 'applic' &&
              selectedFileDetails.fileTypeis !== 'video/' && (
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
                    <span className={`${commonClass.body15Medium} ${classes.wrapText}`}>{selectedFileDetails.name}</span>
                  </div>
                </div>
              )}
            {selectedFileDetails.fileTypeis === 'image/' && (
              <img className={classes.filesView} src={URL.createObjectURL(files[currentIndex])} alt="imgages" />
            )}
            {/* Pdf */}
            {selectedFileDetails?.fileTypeis === 'applic' && (
              <div className={classes.pdfDivWrapper}>
                <Document className={classes.pdfDiv} file={selectedFileDetails?.url} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={1} scale={1} renderTextLayer={false} />
                </Document>
                <div className={classes.pdfinfo}>
                  <div>{<FileIcon />}</div>
                  <div className={classes.pdfnamewrapper}>
                    <div className={`${classes.pdfname} ${commonClass.body15Medium}`}>{selectedFileDetails?.name}</div>
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
            {selectedFileDetails.fileTypeis === 'video/' && <VideoPlayerNewDesign src={filesURL[currentIndex]} />}
          </div>

          <div className={classes.nameandCountCon}>
            <span className={classes.fileNameText}>
              {selectedFileDetails.fileTypeis === 'applic' ? ' ' : selectedFileDetails.name}{' '}
            </span>
            <div className={classes.countContainer}>
              <div
                className={currentIndex > 0 ? `${classes.navIconDiv}` : `${classes.navIconDiv} ${classes.hiddenDiv}`}
                onClick={(e) => {
                  e.persist();
                  dispatch(setIndexData(currentIndex - 1));
                  setFileSelected(currentIndex - 1);
                  setSelectedFileDetails({
                    name: files[currentIndex - 1].name,
                    url: filesURL[currentIndex - 1],
                    indexis: currentIndex - 1,
                    fileTypeis: files[currentIndex - 1]?.type?.slice(0, 6),
                    file: files[currentIndex - 1],
                  });
                  const childWidth = fileThumbnailContainerRef.current.firstChild.offsetWidth ?? 0;
                  const movement = childWidth * (currentIndex - 1) - 5;
                  fileThumbnailContainerRef.current.scrollLeft = movement;
                  setTimeout(() => {
                    if (focusMessageInput) {
                      focusMessageInput();
                      e.stopPropagation();
                    }
                  }, 0);
                }}
              >
                {' '}
                <LeftArrowIcon />{' '}
              </div>
              <span className={classes.countStyle}>
                {fileSelected + 1} / {files.length}
              </span>
              <div
                className={
                  currentIndex < files.length - 1 ? `${classes.navIconDiv}` : `${classes.navIconDiv} ${classes.hiddenDiv}`
                }
                onClick={(e) => {
                  e.persist();
                  dispatch(setIndexData(currentIndex + 1));
                  setFileSelected(currentIndex + 1);
                  setSelectedFileDetails({
                    name: files[currentIndex + 1].name,
                    url: filesURL[currentIndex + 1],
                    indexis: currentIndex + 1,
                    fileTypeis: files[currentIndex + 1]?.type?.slice(0, 6),
                    file: files[currentIndex + 1],
                  });
                  const childWidth = fileThumbnailContainerRef.current.firstChild.offsetWidth ?? 0;
                  const movement = childWidth * (currentIndex + 1) + 5;
                  fileThumbnailContainerRef.current.scrollLeft = movement;
                  setTimeout(() => {
                    if (focusMessageInput) {
                      focusMessageInput();
                      e.stopPropagation();
                    }
                  }, 0);
                }}
              >
                {' '}
                <RightArrowIcon />{' '}
              </div>
            </div>
          </div>
          <div className={classes.fileThumbnailContainer} ref={fileThumbnailContainerRef} onWheel={handleOnWheel}>
            {files.map((file, index) => {
              const typeis = file?.type?.slice(0, 6);
              return (
                <div
                  key={file.name}
                  id={`fileAttached-${index}`}
                  className={`${classes.iconDiv} ${
                    index === fileSelected || (index === 0 && fileSelected == -1) ? classes.iconDivActive : ''
                  }`}
                  onClick={(e) => {
                    dispatch(setIndexData(index));
                    setFileSelected(index);
                    setSelectedFileDetails({
                      name: file.name,
                      url: filesURL[index],
                      indexis: index,
                      fileTypeis: typeis,
                      file: file,
                    });
                  }}
                >
                  {file?.type?.slice(0, 6) === 'video/' && (
                    <video
                      controls={false}
                      src={filesURL[index]}
                      style={{
                        borderRadius: '5px',
                        width: '100%',
                        height: '100%',
                      }}
                    ></video>
                  )}
                  {file?.type?.slice(0, 6) === 'image/' && (
                    <img
                      className={`${classes.filesView} ${index === selectedFileDetails.indexis ? classes.filesViewActive : ''}`}
                      alt="imgages"
                      src={URL.createObjectURL(file)}
                    />
                  )}
                  {file?.type?.slice(0, 6) === 'audio/' && (
                    <span className={classes.IconWrapper}>
                      <MusicIcon />
                    </span>
                  )}
                  {file?.type?.slice(0, 6) !== 'video/' &&
                    file?.type?.slice(0, 6) !== 'audio/' &&
                    file?.type?.slice(0, 6) !== 'image/' && (
                      <span className={classes.IconWrapper}>
                        <FileIcon />
                      </span>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
