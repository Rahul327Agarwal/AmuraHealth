import { ClickAwayListener } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useReactToPrint } from 'react-to-print';
import { getVoiceNoteFromURL } from '../../../Common/Common.functions';
import ErrorToaster from '../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { getAttachmentAPI } from '../../PanelComponents/Notes/Notes.functions';
import { getFileNameFromAttachmentURL } from '../ChatComponent/ChatComponent.functions';
import { getFileType } from './PDFViewer.functions';
import { useStyles } from './PDFViewer.styles';
import { DownloadIcon, NextIcon, PreviousIcon, PrintIcon } from './PDFViewer.svg';
import { IProps } from './PDFViewer.types';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = (props: IProps) => {
  const documentRef: any = useRef();
  const commonClasses = useCommonStyles();
  const goBack = useDFGoBack();

  const [totalPages, setTotalPages] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [fileUrl, setFileUrl] = useState('');
  // const [isLoading, setIsLoading] = useState(true);
  const { id: panelId } = useCurrentPanel();
  const [fileInfo, setFileInfo] = useState({ fileType: '', fileName: '' });
  const { classes } = useStyles({ currentPageNumber, totalPages, isImage: fileInfo.fileType === 'image' });
  const imageRef = useRef();
  const { isLoading, setIsLoading } = props;

  useEffect(() => {
    if (props.url) {
      !isLoading && setIsLoading(true);

      let fileInfo = {
        fileName: getFileNameFromAttachmentURL(props.url),
        fileType: getFileType(props.url),
      };
      setFileInfo(fileInfo);

      getVoiceNoteFromURL(props.sessions, props.url)
        .then((url: any) => {
          if (url) setFileUrl(url);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [props.url]);

  // close the pdf viewer if file type is not image or pdf
  useEffect(() => {
    if ((fileInfo.fileType && fileInfo.fileType !== 'pdf' && fileInfo.fileType !== 'image') || fileInfo.fileType === undefined) {
      ErrorToaster('Unsupported file type', panelId, 'error');
      goBack();
    }
  }, [fileInfo.fileType]);

  const onDocumentLoadSuccess = async (pdf) => {
    // const documentInfo = await pdf.getMetadata();
    setTotalPages(pdf.numPages);
  };

  const handleNextPage = () => {
    if (totalPages && currentPageNumber < totalPages) setCurrentPageNumber((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (totalPages && currentPageNumber > 1) {
      setCurrentPageNumber((prev) => prev - 1);
    }
  };
  const handlePrint = useReactToPrint({
    content: () => documentRef.current || imageRef.current,
  });

  const handleDownload = () => {
    if (props.url) getAttachmentAPI(panelId, props.url, props.sessions);
  };

  return (
    <div className={classes.root}>
      {!isLoading && (
        <div className={classes.container}>
          <ClickAwayListener disableReactTree onClickAway={() => props.setShowPDF(false)}>
            <div className={classes.wrapper}>
              {/* to render when file type is pdf */}
              {fileInfo.fileType === 'pdf' && (
                <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} ref={documentRef}>
                  <Page pageNumber={currentPageNumber} scale={1} renderTextLayer={false} />
                </Document>
              )}
              {fileInfo.fileType === 'image' && (
                <div className={classes.imageContainer} ref={imageRef}>
                  <img src={fileUrl} alt="" />
                </div>
              )}
              <div className={classes.informationSection}>
                <div className={`${classes.fileName} ${commonClasses.caption12Medium}`}>{fileInfo?.fileName}</div>
                <div className={classes.fileOptions}>
                  {/* page info only for pdf */}
                  {fileInfo?.fileType === 'pdf' && (
                    <div className={classes.pageInfo}>
                      <div onClick={handlePrevPage} className={classes.prev}>
                        <PreviousIcon />
                      </div>
                      <div className={classes.pageNumbers}>
                        {currentPageNumber} / {totalPages}
                      </div>
                      <div onClick={handleNextPage} className={classes.next}>
                        <NextIcon />
                      </div>
                    </div>
                  )}
                  <div>
                    <div onClick={handleDownload} className={classes.downloadBtn}>
                      <DownloadIcon />
                      {/* <a href={props.url} download>
                      </a> */}
                    </div>
                  </div>
                  {/* TODO: the print feature is to be added later */}
                  {/* <div onClick={handlePrint}>
                    <PrintIcon />
                  </div> */}
                </div>
              </div>
            </div>
          </ClickAwayListener>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
