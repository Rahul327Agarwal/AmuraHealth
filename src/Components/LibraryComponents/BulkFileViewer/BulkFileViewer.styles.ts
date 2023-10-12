import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    display: 'flex',
    backgroundColor: theme.palette.colors.system.white,
    // boxShadow: "0px -4px 24px rgba(0, 0, 0, 0.07)",
    borderRadius: '34px 34px 0px 0px',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  wrapper: {
    width: '100%',
  },
  selectedFileCon: {
    borderRadius: '8px',
    height: '260px',
    // margin: '0 27px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  functioniconsCon: {
    display: 'flex',
    // border: "1px solid red",
    justifyContent: 'end',
    padding: '4px 0px',
    alignItems: 'center',
  },
  funcIcon: {
    marginLeft: '20px',
    cursor: 'pointer',
  },
  filesContainer: {
    width: 'calc(100% - 32px)',
    display: 'flex',
    // border: "1px solid red",
    overflowX: 'auto',
  },
  fileNameText: {
    // fontFamily: "Inter",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '17px',
    lineHeight: '22px',
    color: theme.palette.colors.gray[500],
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  countStyle: {
    // fontFamily: "Inter",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '17px',
    lineHeight: '22px',
    color: theme.palette.colors.gray[400],
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  countContainer: {
    display: 'flex',
    width: '100%',
    gap: '5px',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pageContainer: {
    display: 'flex',
    width: '100%',
    gap: '5px',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8px',
  },
  navIconDiv: {
    padding: '0 3px',
    cursor: 'pointer',
    width: 'fit-content',
  },
  hiddenDiv: {
    visibility: 'hidden',
  },
  fileThumbnailContainer: {
    display: 'flex',
    gridAutoFlow: 'column',
    gridColumnGap: '5px',
    margin: '60px 0 0 0',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    userSelect: 'none',
    '&::-webkit-touch-callout': 'none',
    '&::-webkit-user-select': 'none',
  },
  nameandCountCon: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: 'calc(100% - 110px) 95px',
    gap: '16px',
    padding: '4px',
    marginBottom: '-50px',
    userSelect: 'none',
    '&::-webkit-touch-callout': 'none',
    '&::-webkit-user-select': 'none',
  },
  eachIconDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0px 8px',
  },
  iconDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '57px',
    maxWidth: '57px',
    margin: '4px',
    height: '57px',
    borderRadius: '4px',
    backgroundColor: 'url(sam-moghadam-khamseh-Lq1zv9qAJls-unsplash.jpg)',
    cursor: 'pointer',
    border: '3px solid transparent',
    boxSizing: 'border-box',
  },
  docView: {
    width: '100%',
    height: '130px',
    borderRadius: '9px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '2px solid #F1F1F1',
  },
  marginAuto: {
    margin: 'auto',
  },
  wrap: {
    width: '100%',
  },

  filesView1: {
    width: '100%',
    maxWidth: '315px',
    aspectRatio: '4/3',
    borderRadius: 'inherit',
    objectFit: 'cover',
  },
  pdfDivWrapper: {
    width: '100%',
    height: '236px',
  },
  pdfname: { 
    color: '#252427',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
    overflow:'hidden',
    wordBreak:'break-word'
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

  filesView: {
    width: '100%',
    height: '100%',
    borderRadius: '6px',
    objectFit: 'contain',
  },
  filesViewActive: {
    //border: "3px solid #252427"
  },
  iconText: {
    color: theme.palette.colors.gray[400],
  },
  iconDivActive: {
    backgroundColor: '#F1F1F1',
    border: '3px solid #252427',
    boxSizing: 'border-box',
  },
  iconColor: {
    color: theme.palette.colors.system.white,
  },
  iconTextActive: {
    color: theme.palette.colors.gray[900],
  },
  IconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '51px',
    height: '51px',
    padding: '0',
    borderRadius: '4px',
    backgroundColor: '#F1F1F1',
    boxSizing: 'border-box',
    // background: theme.palette.colors.gray[50],
    transition: 'background .3s ease',
    '& path': {
      transition: 'fill .3s ease',
      // fill:"#5C5A61"
    },
  },
  docWrapper: {
    background: '#F1F1F1',
    display: 'grid',
    gridTemplateColumns: '10% calc(90% - 12px)',
    gap: '12px',
    padding: '40px 16px 16px 16px',
    borderRadius: '0px 0px 8px 8px',
    marginTop: '-9px',
    alignItems: 'center',
  },
  noFileIcon: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  noPreview: {
    textAlign: 'center',
    color: theme.palette.colors.red[700],
  },
  wrapText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'block',
  },

  mysilder: {
    marginTop: '50px',
    '& .swiper-button-prev': {
      color: '#5C5A61',
      right: '70px',
      left: 'auto',
      top: '32%',
      '&::after': {
        fontSize: '15px',
        fontWeight: 900,
      },
    },
    '& .swiper-button-next': {
      color: '#5C5A61',
      right: '0px',
      left: 'auto',
      top: '32%',
      '&::after': {
        fontSize: '15px',
        fontWeight: 900,
      },
    },
  },

  cropFooter: {
    borderTop: `1px solid ${theme.palette.colors.gray[50]}`,
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    margin: '32px -20px -20px',
    width: '100%',
    justifyContent: 'space-between',
  },
  Footercolor: {
    fontWeight: 600,
  },
}));
