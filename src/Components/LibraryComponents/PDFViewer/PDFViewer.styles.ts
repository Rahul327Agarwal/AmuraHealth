import { makeStyles } from 'tss-react/mui';
import { IStyleProps } from './PDFViewer.types';

export const useStyles = makeStyles<IStyleProps>()((theme: any, props) => {
  return {
    root: {
      background: 'rgba(0, 0, 0, 0.2)',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
    },
    container: {
      //   width: "300px",
      //   height: "500px",
      //   overflow: "hidden",
      width: '388px',
      height: props.isImage ? 'auto' : '544px',
      maxHeight: '544px',
      '& .react-pdf__Document': {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      },
      '& .react-pdf__Page': {
        minWidth: 'auto !important',
        minHeight: 'auto !important',
      },
      '& .react-pdf__Page__canvas': {
        width: '100% !important',
        height: '100% !important',
      },
    },
    informationSection: {
      background: '#E1E1E1',
      borderRadius: '0px 0px 8px 8px',
      color: '#5C5A61',
      padding: '12px 16px',
      display: 'grid',
      gridTemplateColumns: '4fr 6fr',
      minHeight: '56px',
      alignItems: 'center',
      gap: '20px',
    },

    fileOptions: {
      display: 'flex',
      gap: '23px',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    pageInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '18px',
    },

    prev: {
      cursor: 'pointer',
      opacity: props.currentPageNumber === 1 ? 0.3 : 1,
    },
    next: {
      cursor: 'pointer',
      opacity: props.currentPageNumber < props.totalPages ? 1 : 0.3,
    },
    pageNumbers: {
      // minWidth: 'fit-content',
      width: '60px',
      userSelect: 'none',
    },
    imageContainer: {
      width: '100%',
      height: 'calc(100% - 0px)',
      overflow: 'hidden',
      maxHeight: 'inherit',
      background:'#5C5A61',
      '& img': { 
        height: '100%',
        width: '100%', 
        objectFit: 'contain', 
        maxHeight: 'inherit' 
      },
    },
    wrapper: {
      height: '100%',
      width: '100%',
      maxHeight: 'inherit',
    },
    fileName: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    downloadBtn: {
      cursor: 'pointer',
    },
  };
});
