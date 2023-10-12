import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { FileIcon } from '../../../SVGs/Common';
import { useStyles } from './Media.styles';
import { MediaDocProps } from './Media.types';

const MediaDoc = (props: MediaDocProps) => {
  const { src, fileName, fileSize } = props;
  const { classes } = useStyles(props);
  const commonClass = useCommonStyles();
  const [totalPages, setTotalPages] = useState(null);

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
    <div className={classes.mediaBox}>
      <div className={classes.pdfDivWrapper}>
        {src && (
          <Document className={classes.pdfDiv} file={src} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} scale={1} renderTextLayer={false} />
          </Document>
        )}
        {fileName && !!fileSize && (
          <div className={classes.pdfinfo}>
            <div>{<FileIcon />}</div>
            <div className={classes.pdfnamewrapper}>
              <div className={`${classes.pdfname} ${commonClass.body15Medium}`}>{fileName}</div>
              <div className={classes.nameWrapper}>
                <div className={`${classes.pdfcount} ${commonClass.sm10Regular}`}>{totalPages} pages</div>
                <div className={`${classes.pdfcount} ${commonClass.sm10Regular}`}>{!!fileSize && getFileSize(fileSize)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaDoc;
