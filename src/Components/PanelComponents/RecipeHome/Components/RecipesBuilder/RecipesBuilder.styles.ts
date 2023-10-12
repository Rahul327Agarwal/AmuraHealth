import { styled } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  rootContainer: {
    // margin: "-1rem", //for testing only
    // minHeight: "100vh", //for testing only
    padding: '20px 0px 0px',
    position: 'relative',
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    //? height previously calc(100% - 45px) was causing gap on 5th panel view
    '& headerContainer': {
      alignItems: 'center !important',
    },
  },
  rootContainerSearch: {
    // // margin: "-1rem", //for testing only
    // // minHeight: "100vh", //for testing only
    padding: '20px 0px 0px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: '#FFFFFF',
  },
  tabWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    marginBottom: '20px',
    padding: '0px 20px',
  },
  tabContentWrapper: {
    // height:"calc(100vh - 380px)"
    padding: '0px 20px',
    // overflow: 'auto !important',
    overflow: 'hidden',
    height: '100%',
  },
  searchIngredientWrapper: {
    height: 'calc(100% - 110px)',
  },
  buttonPadding: {
    padding: '0 20px',
  },
  headerWrapper: {
    padding: '0px 20px',
  },
  mb: { marginBottom: '20px' },
  mb30: { marginBottom: '30px' },
  my20: { margin: '20px 0' },
  my30: { margin: '30px 0' },
  searchTitle: {
    color: '#5C5A61',
    padding: '8px 20px',
    background: '#F8F8F8',
    margin: '0 -20px',
    marginBottom: '20px',
  },
  tokenWrap: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  unitWrapper: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    margin: '45px 0',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    '& .inputWrapper': { marginTop: '-20px' },
  },
  footerStyle: {
    padding: '20px !important',
    // margin: '10px -20px -10px 0px !important',
    // position: 'absolute',
    width: '100% !important',
    // bottom: '0 !important',
  },
  // BASIC DETAILS STYLE
  basicContainer: {
    height: 'calc(100% - 70px)',
    '& .MuiInputBase-inputMultiline': {
      margin: '10px 0px 0px 0px !important',
      // background:"red !important",
    },
    // "& .MuiInput-multiline":{
    //   margin:"10px 0px !important"
    // },
  },
  basicDetailsContainer: {
    display: 'grid',
    gridTemplateRows: '1fr 95px',
    height: '100%',
    overflow: 'hidden',
  },
  basicDetailsInputContainer: {
    overflow: 'auto',
    padding: '0 20px',
  },

  tabContentWrapperNew: {
    height: '100%',
    overflow: 'hidden',
  },

  inputContainer: {
    height: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '27px',
    padding: '0 20px',
    paddingBottom: '100px',
    // margin: "30px 0",
  },

  easyToCookWrapper: {
    '& .label': {
      fontSize: '17px',
      color: theme.palette.grey[500],
      marginBottom: '16px',
    },
  },
  screenWrapper: {
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  screenContent: {},
  iconWrap: {
    display: 'block',
    marginBottom: '36px',
    textAlign: 'center',
  },
  successText: {
    color: '#A6A6A6',
    textAlign: 'center',
    marginBottom: '36px',
  },
  ingredientFeilds: {
    height: 'calc(100% - 65px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '24px -20px 0 -20px',
    // padding: "0 20px",
  },
  quantityFieldsContainer: { height: '100%', display: 'flex', flexDirection: 'column' },
  quantityFeilds: {
    height: '100%',
    margin: '0 -20px',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
  },
  quantityFieldsNew: {
    height: '100%',
    overflow: 'auto',
  },
  quantityWrapper: {
    overflowY: 'auto',
    overflowX: 'hidden',
    flex: 1,
    padding: '20px',
    // margin:"0 -20px"
    height: '100%',
  },
  doneButton: {
    padding: '10px 20px',
  },
  mainConatianer: {
    height: 'calc(100%)',
    overflowX: 'hidden',
    padding: '0 20px',

    '& .MuiTextField-root': {
      background: theme.palette.colors.gray[25],
    },
  },
  caloriesCalcBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin: '20px 0',
  },
  contentButton: {
    padding: '0 !important',
    justifyContent: 'flex-start !important',
    fontWeight: 600,
    '&.rotateArrow': {
      '& svg': { rotate: '180deg' },
    },
  },
  nutrientBox: {
    margin: '20px 0',
  },
  errorText: {
    color: '#f44336',
    fontSize: '12px',
  },
  hearder17: {
    color: theme.palette.colors.theme.primary,
    marginBottom: '20px',
  },
  nutrientsRowBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    marginBottom: '10px',
  },
  paraStyle: {
    textAlign: 'center',
    color: `${theme.palette.colors.system.white}`,
    '&.primary': {
      color: theme.palette.colors.gray[900],
    },
  },
  noResultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 'calc(100% - 100px)',
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
  panel: {
    height: 'inherit',
    background: `${theme.palette.colors.system.white}`,
    position: 'relative',
  },
  panelBody: {
    // height: "calc(90vh - 132px)",
    height: 'calc(100% - 132px)',
    overflowY: 'auto',
    padding: '16px',
  },
  panelBodySelectIngredient: {
    // height: "calc(90vh - 132px)",
    height: 'calc(100% - 68px)',
    overflowY: 'auto',
    padding: '16px',
  },
  buttonCursor: { cursor: 'pointer' },
  headerDiv: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    position: 'relative',
  },
  titleSpan: {
    width: '100%',
    color: '#252427',
    display: 'block',
    '& > .MuiFormControl-root': {
      boxSizing: 'border-box',
    },
  },
  dropdownContainer: {
    position: 'absolute',
    top: '45px',
    left: '0',
    right: '0',
    padding: '8px',
    background: '#1B1B1B',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 4px 4px rgba(0, 0, 0, 0.16)',
    borderRadius: '5px',
  },
  buttonitem: {
    display: 'block',
    width: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: '10px 15px',
    color: '#fff',
    textAlign: 'left',
    cursor: 'pointer',
    '& :focus': {
      border: 'none',
      outline: 'none',
    },
  },
  actionTextButtonWrap: {
    marginTop: '15px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },
  actionButton: {
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'center',
    width: '115px',
    '&.action': {
      width: '50%',
    },
  },
  actionTextWrap: {
    flexGrow: 1,
    '&.action': {
      width: '50%',
    },
  },
  btnHeight: {
    height: '44px',
  },
  setIngredientsFooter: {
    gap: '10px',
    boxShadow: 'none',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    display: 'grid',
    gridTemplateColumns: '100px 100px',
    alignItems: 'stretch',
  },
  customTable: {
    borderCollapse: 'collapse',
    width: '100%',
    tableLayout: 'fixed',
    border: '1px solid rgba(299,299,299, 0.16)',
    '& tr': {
      background: '#1B1B1B',
      '&:nth-child(even)': {
        backgroundColor: '#2B2B2B',
      },
    },
    '&  td, &  th': {
      textAlign: 'center',
      padding: '8px',
      color: '#fff',
      borderLeft: '1px solid rgba(299,299,299, 0.16)',
      borderRight: '1px solid rgba(299,299,299, 0.16)',
      '&:first-child': {
        borderLeft: 'none',
      },
      '&:last-child': {
        borderRight: 'none',
      },
    },
  },
  tableWrapper: {
    marginTop: '20px',
  },
  inputWrap: {
    marginTop: '15px',

    '&.lastInput': {
      marginBottom: '50px',
    },
  },
  fileTitle: {
    color: '#fff',
    fontSize: '14px',
    display: 'block',
  },
  switchIcon: {
    paddingLeft: '5px',
  },
  iconWrapper: {
    paddingTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerButton: {
    display: 'flex',
    alignItems: 'center',
    height: 'inherit',
    justifyContent: 'center',
    '&.bgGrey': {
      // TODO: palette.system doesnt exist
      // background: theme.palette.system.webpanel,
    },
  },

  footerButtonText: { flex: 1, padding: '4px 8px' },
  photoWrap: {
    display: 'flex',
    position: 'relative',
    marginTop: '15px',
  },
  uploadFileContainer: {
    // margin: "-24px -16px -16px -16px",
  },
  disableUpload: {
    pointerEvents: 'none',
    '& svg > path': {
      fill: '#626262',
    },
  },
  filesDiv: {
    border: '1px solid #C4C4C4',
    borderRadius: '4px',
    marginTop: '15px',
    paddingTop: '20px',
  },
  addIngredientsDiv: {
    background: '#1B1B1B',
    borderRadius: '5px',
    position: 'relative',
    padding: '10px',
    marginBottom: '20px',
  },
  inputDiv: {
    '& .inputTitle': {
      width: 'calc(100% - 35px)',
      padding: '10px 0',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#fff',
      fontSize: '16px',
    },
    '& .editIcon': {
      display: 'flex',
      position: 'absolute',
      top: '13px',
      right: '10px',
      transform: 'scale(.85)',
      cursor: 'pointer',
    },
  },
  nutritionInfo: {
    marginBottom: '10px',
  },
  nutritionTable: {
    borderCollapse: 'collapse',
    width: '100%',
    border: 'none',
    '&  th': {
      color: '#A0A0A0 !important',
    },
    '&  td, &  th': {
      textAlign: 'left',
      padding: '8px',
      color: '#fff',
      border: 'none',
      fontWeight: 400,
    },
  },
  bottomLine: {
    height: '2px',
    background: 'rgba(299,299,299, 0.2)',
    margin: '0 -10px 10px 0px',
  },
  addIngredientsButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    color: '#00FFCC',
    cursor: 'pointer',
  },
  pointer: {
    cursor: 'pointer',
  },
  inputWrapper: {
    padding: '8px',
    border: '1px solid #A0A0A0',
    borderRadius: '5px',
  },
  inputTextArea: {
    border: 'none !important',
    marginLeft: '-8px',
    width: 'calc(100% + 16px)',
    '&:hover': {
      background: 'none !important',
    },
    '& .MuiInputBase-input': {
      padding: '0 8px !important',
    },
  },
  stepsText: {
    color: '#fff',
    display: 'inline-block',
    marginBottom: '5px',
  },
  stepsCardWrap: {
    background: '#2B2B2B',
    padding: '8px',
    marginTop: '20px',
    borderRadius: '5px',
  },
  stepsCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepsTitle: {
    color: '#00FFCC',
    fontSize: '16px',
  },
  cardBody: {},
  cardText: {
    color: '#fff',
    fontSize: '14px',
  },
  btnGrp: {
    display: 'flex',
    gap: '8px',
  },
  stepActionBtn: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&.edit > svg': {
      height: '20px',
      width: '20px',
    },
    '&.delete > svg': {
      height: '14px',
      width: '14px',
    },
  },
  recipeNameDiv: {
    display: 'flex',
  },
  recipeName: {
    color: '#fff',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: '8px',
  },
  foodtype: {
    marginRight: '5px',
    '&.nonveg path': {
      fill: '#FF4539',
    },
  },
  recipeBy: {
    fontSize: '14px',
    color: '#fff',
    marginBottom: '25px',
  },
  featureIn: {
    color: '#fff',
    marginBottom: '15px',
    '& > span': {
      color: '#00FFCC',
    },
  },
  imageDiv: {
    width: '100%',
    height: '200px',
    marginBottom: '10px',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  imageStyle: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  mysilder: {
    '& .swiper-button-prev': {
      color: '#fff',
      '&::after': {
        fontSize: '20px',
        fontWeight: 900,
      },
    },
    '& .swiper-button-next': {
      color: '#fff',
      '&::after': {
        fontSize: '20px',
        fontWeight: 900,
      },
    },
  },
  successDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
  },
  whiteText: {
    color: '#FFFFFF',
    margin: '0',
    textAlign: 'center',
  },
  successIcon: {},
  linkButton: {
    color: '#00FFCC',
    cursor: 'pointer',
  },
  iconsDiv: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '10px',
    '& > .icons': {
      display: 'flex',
      alignItems: 'center',
      height: '24px',
      color: '#fff',
      fontSize: '14px',
      '& > svg': {
        height: '100%',
        marginRight: '3px',
        maxWidth: '17px',
      },
    },
  },
  otherNutritional: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
    '& > span': {
      background: '#1B1B1B',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.16)',
      borderRadius: '3px',
      fontSize: '14px',
      textAlign: 'center',
      color: '#FFFFFF',
      padding: '5px 10px',
    },
  },
  nutritionalTable: {
    marginBottom: '10px',
  },
  caption: {
    marginBottom: '10px',
    color: '#fff',
  },
  showMoreBtn: {
    color: '#00FFCC',
    background: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    margin: '10px 0',
  },
  servingDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '25px 0',
  },
  servingText: {
    color: '#FFFFFF',
    display: 'flex',
  },
  servingBtn: {
    display: 'flex',
    gap: '10px',
    marginLeft: '10px',
    '& span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  stepsDiv: {
    marginBottom: '20px',
  },
  preparationTime: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '25px',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    '& > .icons': {
      color: '#fff',
      fontSize: '12px',
    },
    '& > .button': {
      background: '#1B1B1B',
      color: '#fff',
      padding: '5px 10px',
      border: '1px solid #00FFCC',
      borderRadius: '5px',
      textAlign: 'center',
      fontSize: '12px',
    },
  },
  ingredientsDiv: {
    marginBottom: '40px',
  },
  ingredients: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px',
    '& span.name': {
      color: '#fff',
    },
    '& span.unites': {
      color: '#fff',
      display: 'inline-block',
      minWidth: '85px',
      textAlign: 'right',
    },
  },
  servingWarning: {
    background: '#626262',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '4px',
    display: 'flex',
    gap: '15px',
    padding: '10px',
    marginBottom: '20px',
  },
  textWhite: {
    fontSize: '12px',
    color: '#FFFFFF',
  },
  borderBottom: {
    background: 'rgba(299,299,299, 0.16)',
    margin: '25px -16px',
    height: '2px',
  },
  chefDetailsDiv: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  },
  chefAvatar: {
    height: '60px',
    width: '60px',
    display: 'grid',
    placeItems: 'center',
    background: '#626262',
    color: '#fff',
    borderRadius: '50%',
    fontWeight: 500,
    fontSize: '20px',
    textTransform: 'uppercase',
  },
  chefDetails: {
    '& .name': {
      color: '#fff',
      marginTop: '0',
    },
    '& .details': {
      fontSize: '14px',
      color: '#AEAEAE',
    },
    '& .link': {
      fontSize: '14px',
      color: '#00FFCC',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '& i': {
        display: 'flex',
        marginLeft: '10px',
      },
    },
  },
}));

export const SearchResultStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  '& .result': {
    background: '#fff !important',
    fontSize: '15px',
    color: '#5C5A61',
    borderBottom: '0.5px solid #E1E1E1',
    padding: '20px 16px',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:last-child': { borderBottom: 'none' },
  },
});
