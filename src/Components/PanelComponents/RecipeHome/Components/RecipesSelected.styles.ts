import { makeStyles } from 'tss-react/mui';
import { BackArrowIcon } from './../../Education/EducationPanel/EducationPanel.svg';

export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    // backgroundColor: "#3F4044",
    background: `${theme.palette.colors.system.white} !important`,
    height: '100%',
    position: 'relative',

    // applied to all figure
    '& figure': {
      margin: '0',
    },
  },
  closewrap: {
    position: 'absolute',
    display: 'block',
    right: '16px',
    top: '14px',
    cursor: 'pointer',
  },
  groupRadioWrapper: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: '0px 10px',
  },
  seachbox: {
    height: '54px !important',
    borderRadius: '5px',
  },
  squareIconDiv: {
    display: 'grid',
    position: 'relative',
    top: '-5px',
    placeItems: 'center',
    padding: '8px',
    borderRadius: '5px',
    cursor: 'pointer',
    height: '54px',
    width: '54px',
    boxSizing: 'border-box',
    maxWidth: '100% !important',
    '& path': {
      fill: '#5C5A61 !important',
    },
  },
  bgDark: {
    background: '#252427',
    '& path': {
      fill: '#5C5A61 !important',
    },
  },
  bgLight: {
    background: '#F8F8F8',
    '& path': {
      fill: '#5C5A61 !important',
    },
  },
  accordianWrap: {
    position: 'relative',
    margin: '0px -5px 0px 0px',
    '& .MuiTypography-body1': {
      width: '100% !important',
      // color: '#373639 !important',
    },

    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      marginLeft: '10px !important',
    },
    '& .MuiAccordionSummary-root': {
      transform: 'translateY(-5px) !important',
    },
    '& .MuiPaper-elevation1': {
      boxShadow: 'none',
    },
    '& .Mui-expanded': {
      // padding:'10px 0',
      '& svg': {
        height: '20px',
        width: '20px',
        // marginLeft: '10px !important',
      },
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      padding: '10px 0',
      width: '13px !important',
      marginLeft: '10px !important',
      '& svg': {
        height: '20px',
        width: '20px',
      },
    },
    '& .MuiAccordionSummary-expandIcon': {
      padding: '10px 0',
      width: '13px !important',
      marginLeft: '10px !important',
      '& svg': {
        height: '20px',
        width: '20px',
      },
    },
    '& .MuiIconButton-label': {
      '& svg': {
        height: '20px',
        width: '20px',
      },
    },
  },
  searchCardWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  filterbadge: {
    position: 'absolute',
    content: "''",
    top: '15px',
    right: '19px',
    height: '7px',
    width: '7px',
    boxSizing: 'border-box',
    background: '#DA5552',
    borderRadius: '50%',
  },
  searchFieldWrap: {
    flexGrow: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '10px',
    '& .MuiTextField-root': {
      boxSizing: 'border-box',
      justifyContent: 'center',
      display: 'flex',
      background: ` ${theme.palette.colors.gray[25]} !important`,
      height: '54px',
      '& svg': {
        height: '18px',
        width: '18px',
      },
      '& .MuiInputBase-input': {
        background: ` ${theme.palette.colors.gray[25]} !important`,
        color: `#252427 !important`,
        width: '100% !important',
      },
    },
  },
  recipeList: {
    margin: '0px 20px',
    width: `calc(100% - 40px) !important`,
    '&:last-child': {
      marginBottom: '50px',
    },
  },
  buttonLike: {
    height: '38px',
    width: '38px',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  fexContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: `${theme.palette.colors.system.white} !important`,
  },
  headerDiv: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    height: '72px',
    padding: '0 16px',
  },
  headerDivWidth: {
    width: '100%',
  },
  bodyDiv: {
    padding: '20px 0px',
    overflowY: 'auto',
    height: 'inherit',
    maxHeight: `calc(100% - 80px)`,
    '&.subBodyDiv': {
      overflow: 'hidden',
      // overflowY: 'auto',
    },
  },

  maxHeight: {
    maxHeight: `calc(100% - 170px) !important`,
  },
  footerDiv: {
    // background: "#1B1B1B",
    // padding: '5px 10px',
    marginTop: 'auto',
    '& .MuiButtonBase-root': {
      padding: '24px 45px !important',
    },
  },
  titleSpan: {
    width: '100%',
    fontSize: '20px',
    color: `${theme.palette.colors.gray[900]}`,
    display: 'inherit',
  },
  backIcon: {
    cursor: 'pointer',
    padding: '0 12px 0 0',
    '& path': {
      fill: `${theme.palette.colors.gray[500]} !important`,
    },
  },
  backArrowIcon: {
    cursor: 'pointer',
    '& path': {
      fill: `${theme.palette.colors.gray[500]} !important`,
    },
  },
  searchIcon: {
    cursor: 'pointer',
    '& path': {
      fill: `${theme.palette.colors.gray[500]} !important`,
    },
  },
  clearColor: {
    color: '#5C5A61',
    cursor: 'pointer',
  },
  clearAll: {
    color: '#373639',
    cursor: 'pointer',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
  filterContainer: {
    marginBottom: '20px',
  },
  filterTitle: {
    color: '#fff',
    fontSize: '16px',
    marginBottom: '10px',
  },
  optionsDiv: {
    display: 'flex',
    gap: '7px',
    flexWrap: 'wrap',
    '& .MuiChip-root': {
      margin: '0 !important',
    },
  },
  recipesDiv: {
    // display: "flex",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
  },
  subRecipesDiv: {
    // overflow: 'auto',
    // height: 'inherit',
    // maxHeight: 'calc(100% - 90px)',
    // margin: '0 -20px',
    '& .ReactVirtualized__Grid': {
      padding: '0 20px',
    },
  },
  isDisplayInLine: {
    flexDirection: 'column',
    '& .figureWrapper': {
      height: '135px !importnat',
    },
    '& .figureTagsWrap': {
      display: 'none',
    },
  },
  noSearchcontainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  noSearchIcon: {
    textAlign: 'center',
  },
  paraStyle: {
    textAlign: 'center',
    color: '#5C5A61',
    marginTop: '36px',
  },
  paraSubStyle: {
    color: '#5C5A61',
  },
  cooktimeDiv: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 20px',
    backgroundColor: '#F8F8F8',
    // margin: "0px -17px 30px"
  },
  rangeSlider: {
    padding: '0px 20px 10px 20px',
    '& .MuiSlider-rail': {
      background: '#F1F1F1 !important',
      height: '6px !important',
    },

    '& .MuiSlider-track': {
      background: '#5C5A61 !important',
      height: '6px !important',
    },
    '& .MuiSlider-thumb': {
      background: '#252427 !important',
      width: '28px !important',
      height: '28px !important',
      margin: '-10px -11px !important',
      '&:before': {
        content: "''",
        position: 'absolute',
        height: '17px',
        width: '17px',
        borderRadius: '50%',
        background: '#fff',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      },
    },
    // marginBottom:"40px"
  },

  backBtnContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchResultBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    marginTop: '12px',
    alignItems: 'center',
    // padding: '0 20px',
  },
  resultCount: {
    color: theme.palette.colors.gray[400],
    fontWeight: 500,
  },
  listStyle: {
    // overflow: 'hidden !important',
  },
  addMarginRL: {
    marginRight: '20px',
    marginLeft: '20px',
  },
  addPaddingRL: {
    paddingRight: '20px',
    paddingLeft: '20px',
  },
  clearText: {
    color: '#A6A6A6',
  },
  darkText: {
    color: '#5C5A61',
  },
}));
