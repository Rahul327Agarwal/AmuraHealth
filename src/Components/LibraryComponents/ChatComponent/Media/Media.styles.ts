import { makeStyles } from 'tss-react/mui';
import { MediaAudioProps, MediaDocProps } from './Media.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<any>()((theme, props) => ({
  mediaBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  pdfDiv: {
    width: '100%',
    maxWidth: '315px',
    maxHeight: '172px',
    height: '100%',
    margin: 'auto',
    aspectRatio: '4/3',
    borderRadius: '8px',
    overflow: 'hidden',
    objectFit: 'cover',
    '& .react-pdf__Page': {
      width: '100%',
      height: '100%',
      minWidth: 'unset !important',
      minHeight: 'unset !important',
      '& .react-pdf__Page__canvas': {
        width: '100% !important',
        height: '100% !important',
        overflow: 'hidden',
        objectFit:'cover'
      },
      '& .react-pdf__Page__annotations ': {
        display: 'none',
      },
    },
  },
  pdfnamewrapper: {
    width:'85%'
  },

  nameWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  pdfcount: { color: '#5C5A61' },
  pdfinfo: {
    background: '#F1F1F1',
    maxWidth: '315px',
    margin: 'auto',
    padding: '16px',
    display: 'flex',
    gap: '13px',
    borderRadius: '0 0 8px 8px',
  },
  pdfDivWrapper: {
    width: '100%',
    height:'100px',
    minHeight:'172px',
    maxHeight: '100%',
  },
  pdfname: { 
    color: '#252427',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
    overflow:'hidden',
    wordBreak:'break-word'
   },
  fileNameWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px',
  },
  fileNameColor: {
    color: theme.palette.colors.gray[500],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  fileIcon: {},
  // BEGIN PHOTO //
  photo: {
    maxHeight: '264px',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  // END PHOTO //
  // BEGIN VIDEO //
  videoPlayer: {
    height: '163px',
    width: '100%',
    borderRadius: '6px',
  },
  // END VIDEO //
  // BEGIN AUDIO PLAYER //
  musicIconBox: {
    height: '152px',
    background: (props as MediaAudioProps).whiteTheme ? theme.palette.colors.system.white : theme.palette.colors.gray[25],
    display: 'grid',
    placeItems: 'center',
    '& svg': {
      width: '53px',
      height: '53px',
    },
  },
  audioPlayerBox: {
    background: theme.palette.colors.gray[50],
    padding: '18px',
    boxSizing: 'border-box',
  },
  // END AUDIO PLAYER //
}));
