import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<any>()((theme, { fields }) => ({
  rootContainer: {
    margin: '-1rem', //for testing only
    minHeight: '100vh', //for testing only
  },
  ingredientWrapper: {
    height: 'calc(100%)',
  },
  ingredientsRowUL: {
    // height: fields.length > 0 ? 'calc(100% - 100px)' : 'calc(100%)',
    height: 'calc(100% - 80px)',
  },
  contentAndButton: {
    display: 'flex',
    // gridTemplateRows: 'calc(100% - 60px - 16px - 16px) 60px',
    gap: '16px',
    height: '100%',
    padding: '0px 0px 16px 0px',
    flexDirection: 'column',
  },
  overflowAuto: {
    // flex:1,
    overflow: 'auto',
    padding: '0px 20px',
  },
  ingredientFeilds: {
    height: 'calc(100vh - 250px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0 10px',
  },
  padding16RL: {
    padding: '0px 16px',
  },
  contentWrapNew: {
    textAlign: 'center',
  },
  contentWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // height: "70vh",  //for teting storybooy
    height: 'calc(100% - 72px)', // for qa
    flexDirection: 'column',
  },
  text: {
    fontSize: '17px',
    fontWeight: 500,
    color: '#E1E1E1',
    marginTop: '24px',
  },
  // Add Ingredients
  mainWraper: {
    display: 'none',
    background: 'blue',
    height: 'calc(100vh - 310px)',
    overflowY: 'auto',
    position: 'relative',
    boxSizing: 'border-box',
    padding: '0px 20px',
  },
  subHeading: {
    fontSize: '17px',
    lineHeight: '22px',
    marginBottom: '22px',
  },
  mb: { marginBottom: '20px' },
  nutritionDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column',
    marginRight: '35px',
  },
  nutritionDetailsWrap: {
    display: 'flex',
    // justifyContent: "center",
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  nutritionTitle: {
    color: '#5C5A61',
    display: 'block',
    marginBottom: '7px',
  },
  nutritionCircle: {
    position: 'relative',
    display: 'inline-block',
  },
  circleValue: {
    color: '#40916C',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
  ingredientsWrap: {
    paddingTop: '35px',
    marginBottom: '30px',
  },
  ingredientsRow: {
    marginBottom: '30px',
  },
  quantityRow: {
    marginBottom: '40px',
  },
  dflex: {
    display: 'flex',
  },
  ingredientImg: {
    width: '67px',
    height: '67px',
    background: '#F8F8F8',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
  },
  tokenWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  footerStyle: {
    padding: '20px !important',
    margin: '10px -20px -20px 0px',
    position: 'absolute',
    // top: "100%",
    bottom: '16px',
    left: '0px',
    width: '100%',
  },
  // Add Ingredients

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
    '& svg': {
      height: '20px',
      width: '20px',
      '& path': {
        fill: '#5C5A61 !important',
      },
    },
    '&.rotateArrow': {
      '& svg': { rotate: '180deg' },
    },
  },
  nutrientBox: {
    margin: '20px 0',
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
}));
