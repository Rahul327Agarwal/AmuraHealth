import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    backgroundColor: `${theme.palette.colors.system.white} `,
    height: '100%',
    position: 'relative',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
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
    background: `${theme.palette.colors.system.white}`,
  },
  headerDiv: {
    padding: '16px',
  },
  seachbox: {
    height: '54px !important',
    borderRadius: '5px',
  },
  bodyDiv: {
    padding: '16px',
    overflowY: 'auto',
    flexGrow: 1,
    '& .Mui-expanded': {
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
  footerDiv: {
    position: 'relative',
    zIndex: 1,
    // height: '56px',
    // background: "#1B1B1B",
    marginTop: 'auto',
  },
  title: {
    fontWeight: 500,
    fontSize: '20px',
    color: '#00FFCC',
    margin: 0,
    marginBottom: '16px',
  },
  controlerDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  squareIconDiv: {
    display: 'grid',
    placeItems: 'center',
    padding: '8px',
    background: '#F8F8F8',
    borderRadius: '5px',
    cursor: 'pointer',
    height: '54px',
    width: '54px',
    boxSizing: 'border-box',
    maxWidth: '100% !important',
    '& svg': {
      height: '18px',
      width: '18px',
    },
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
  backIcon: {
    cursor: 'pointer',
    '& path': {
      fill: `${theme.palette.colors.gray[500]} !important`,
    },
    marginRight: '10px',
  },
  addButtonWrapper: {
    position: 'absolute',
    right: '20px',
    bottom: '56px',
    transform: 'translateY(50%)',
    borderRadius: '50%',
    padding: '10px',
    background: `${theme.palette.colors.gray[900]}`,
  },
  addButton: {
    background: `${theme.palette.colors.gray[900]}`,
    display: 'grid',
    placeItems: 'center',
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    border: 'none',
    // boxShadow: "0px 1px 7px -1px #212529",
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  recipesDiv: {
    '&:last-child': { marginBottom: '120px !important' },
    marginBottom: '30px',
    '& .swiper-slide': {
      // width: "87% !important",
    },
    '& .swiper-wrapper': {
      // -msOverflowStyle: "none",
      scrollbarWidth: 'none',
    },
    '& .swiper-wrapper::-webkit-scrollbar': {
      display: 'none',
    },
  },
  recipeHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  recipeCategory: {
    color: `${theme.palette.colors.gray[900]}`,
    fontWeight: 600,
    lineHeight: '22px',
  },
  viewAll: {
    color: theme.palette.colors.theme.primary,
    cursor: 'pointer',
    fontWeight: 500,
    // fontSize: '14px',
  },
  carouselDiv: {
    display: 'flex',
  },
  // single recipe style
  recipe: {
    // padding: "5px",
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'all 0.2s ease-in-out',
    // "&:hover": {
    //   background: "#4b4e50 !important",
    // },
    '&:active': {
      transform: 'scale(0.95)',
    },
  },
  recipeImg: {
    width: '135px',
    height: '125px',
    borderRadius: '8px',
    objectFit: 'cover',
    // marginBottom: "10px",
  },
  displayLine: {
    display: 'flex',
    width: '100%',
    '& .contentDiv': {
      marginTop: '5px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: '1',
      marginLeft: '10px',
    },
    '& .figureTagsWrap': {
      display: 'none !important',
    },
    '& .figureWrapper': {
      width: '135px !important',
      height: '135px !important',
      // marginRight: "10px",
    },
    '& > img': {
      width: '135px',
      height: '135px',
      // marginRight: "10px",
      aspectRatio: 1,
    },
  },
  foodtype: {
    marginRight: '5px',
    '&.non-veg path': {
      fill: '#FF4539',
    },
  },
  recipeNameDiv: {
    display: 'flex',
  },
  recipeName: {
    color: `${theme.palette.colors.gray[900]}`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: '8px',
    // fontWeight: 600,
    lineHeight: '22px',
  },
  calories: {
    margin: '0px 10px 10px 0px',
    // maxWidth:"90px",
    // border: '1px solid rgb(225, 225, 225) !important',
    border: `1px solid ${theme.palette.colors.gray[400]} !important`,
    // backgroundColor: 'rgb(248, 248, 248) !important',
    color: '#5c5a61',
    fontSize: '12px',
    padding: '2px 8px 2px 8px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '16px',
    lineHeight: '0',
    // gap: "5px",
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  calorieIcon: {
    display: 'inherit',
    //marginRight:"4px",
    height: '20px',
    width: '20px',
    '& svg': {
      width: '20px !important',
      height: '20px !important',
      marginRight: '6px',
      '& path': {
        fill: '#5c5a61 !important',
      },
    },
    '& path': {
      fill: '#5c5a61 !important',
    },
  },
  button: {
    color: '#00FFCC',
    cursor: 'pointer',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    marginTop: '8px',
    alignSelf: 'end',
  },
  paraStyle: {
    textAlign: 'center',
    color: `${theme.palette.colors.system.white}`,
    '&.primary': {
      color: '#00FFCC',
    },
  },
  // single recipe style

  recipeListing: {
    '& .middleContainer': {
      textAlign: 'center',
    },
    '& .swiper-container': {
      width: '100%',
    },
  },

  searchCardWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '33px',
    gap: '12px',
  },
  filterIcon: {
    display: 'flex',
    marginLeft: '12px',
    height: '52px',
    width: '52px',
    background: theme.palette.colors.gray[25],
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchFieldWrap: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      boxSizing: 'border-box',
      justifyContent: 'center',
      display: 'flex',
      background: ` ${theme.palette.colors.gray[25]} !important`,
      height: '54px',
      '& .MuiInputAdornment-root': {
        '& svg': {
          height: '18px',
          width: '18px',
          '& path': {
            fill: '#5C5A61',
          },
        },
      },
      '& .MuiInputBase-input': {
        background: ` ${theme.palette.colors.gray[25]} !important`,
        color: `${theme.palette.colors.theme.primary} !important`,
        width: '160px !important',
      },
    },
  },

  sliderComponent: {
    paddingTop: '43px',
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '29px',
  },
  headerText: {
    color: `${theme.palette.colors.gray[900]}`,
  },
  recipeCardWrap: {
    // border: "1px solid red"
    // maxWidth: "360px"
  },

  figureWrapper: {
    margin: '0px',
    padding: '0px',
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '8px',
    marginBottom: '16px',
    // width: "calc(100vw - 60px)",
    // height: "197px",
    objectFit: 'cover',
    '& img': {
      display: 'block',
      maxWidth: '100%',
      width: '100%',
      height: '197px',
      borderRadius: '8px',
    },
    '&:after': {
      content: "''",
      position: 'absolute',
      height: '100%',
      width: '100%',
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1,
      left: '0px',
      top: '0px',
    },
  },
  figureTagsWrap: {
    position: 'absolute',
    bottom: '8px',
    left: '0px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
    boxSizing: 'border-box',
    padding: '0 8px',
  },

  // figureTags: {
  //     padding: "4px 8px",
  //     display: "block",
  //     color: "#fff",
  //     background: "rgba(0,0,"
  // },
  foodProperties: {
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 8px',
    background: 'rgba(37, 36, 39, 0.5)',
    color: `${theme.palette.colors.system.white}`,
    borderRadius: '12px',
    height: '24px',
    lineHeight: 0,

    '& svg': {
      width: '16px',
      height: '16px',
    },
  },
  iconWrap: {
    display: 'inline-block',
    marginRight: '5px',
    position: 'relative',
    // top: "2px"
  },
  cardTitle: {
    color: `${theme.palette.colors.gray[900]}`,
    display: 'block',
    marginBottom: '10px',
  },
  tokens: {
    margin: '0px 10px 10px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
  },
  toekenWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  recipeSmallCardWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    marginBottom: '20px',
  },
  smallFigure: {
    width: '132px',
    minWidth: '132px',
    borderRadius: '6px',
    filter: 'drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25))',
    margin: '0px',
  },
  activeContent: {
    width: '86%',
    paddingLeft: '26px',
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
  },
  contentWrap: {},
  recipeBlock: {
    paddingTop: '20px',
  },
  addCard: {
    height: '60px',
    width: '60px',
    borderRadius: '50%',
    background: `${theme.palette.colors.gray[900]}`,
    position: 'fixed',
    zIndex: 2,
    bottom: '10px',
    right: '10px',
    cursor: 'pointer',
    '&:after': {
      content: "''",
      height: '14px',
      width: '1px',
      background: `${theme.palette.colors.system.white} `,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    '&:before': {
      content: "''",
      height: '1px',
      width: '14px',
      background: `${theme.palette.colors.system.white}`,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
  },
  rootContainer: {
    backgroundColor: 'white !important',
  },
  noResultsContainer: {
    height: '100%',
  },
  noResultsSubContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 'inherit',
  },
  serachIconStyle: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  subparaStyle: {
    textAlign: 'center',
    color: '#252427',
    margin: '4px 0px',
  },
  subparaStyle2: {
    textAlign: 'center',
    color: '#5C5A61',
    margin: '4px 0px',
  },
  backBtnContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  fillIconColor: {
    '& svg': {
      '& path': {
        fill: theme.palette.colors.system.white,
      },
    },
  },
}));
