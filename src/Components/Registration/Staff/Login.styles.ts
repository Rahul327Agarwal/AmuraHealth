import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has body type of BlockStatement instead of ObjectExpression.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  loginCard: {
    '@media only screen and (max-width: 1165px)': {
      maxWidth: 'none',
      minWidth: 'none',
      margin: '100px 20px',
    },
    margin: '100px',
    borderRadius: '10px',
    maxWidth: '430px',
    minWidth: '355px',
    overflow: 'auto',
    height: '76%',
  },
  logo: { marginBottom: '44px', textAlign: 'center' },
  logIn: {
    margin: '0px 0px 30px 0px',
  },
  margin8px: {
    margin: '8px 0px',
  },
  margin12px: {
    margin: '12px 0px',
  },
  logInSpan: {
    fontWeight: 500,
    lineHeight: '30px',
    fontSize: '26px',
    color: '#00FFCC',
    margin: '8px 0px',
    textAlign: 'center',
    display: 'block',
  },
  needAccount: {
    fontWeight: 400,
    lineHeight: '30px',
    fontSize: '16px',
    color: 'white',
    margin: '12px 0px',
  },
  logInButtonDiv: { margin: '20px auto 20px auto' },
  forgotSpan: {
    display: 'flex',
    margin: '20px 0px 0px 0px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  OTPSpan: {
    display: 'flex',
    margin: '20px 0px 0px 0px',
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
  marginLR12: {
    margin: '0px 12px',
  },
  loader: {
    color: '#FFFFFF',
    width: '16px !important',
    height: '16px !important',
  },
  loaderSpan: {
    height: '18px',
    marginRight: '4px',
  },
  heightInherit: {
    height: 'inherit',
    width: 'inherit',
  },
  hideLeftImage: {
    '@media only screen and (max-width: 1165px)': {
      display: 'none !important',
    },
  },
  visibility: {
    visibility: 'hidden',
  },
  rightImage: {
    display: 'block',
    verticalAlign: 'bottom',
    maxWidth: '100%',
    width: 'auto',
    height: 'auto',
    maxHeight: '90vh',
    aspectRatio: 'auto 760 / 913',
  },
  rightImageSpan: { width: '100%', fontSize: '1em' },
  rightImageDiv: {
    flexBasis: 'calc(50% - 1rem)',
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
    height: '100%',
  },
  bottomImage: {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    backgroundImage: 'url(https://amura.ai/wp-content/uploads/2021/03/wavesnew.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    backgroundSize: '100%',
  },
  body: {
    height: '100vh',
    width: '100vw',
    position: 'relative',
    background: '#F7F7F7',
  },
  topIcon: { position: 'absolute', top: '32px', left: '32px' },
  bodyContent: {
    margin: 'auto',
    zIndex: -1,
    width: '90%',
    background: '#F7F7F7',
    height: '100%',
  },
  bodyContentFlex: {
    display: 'flex',
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    minHeight: 0,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'end',
    height: '100%',
  },
  bodyContextChild1: {
    flexBasis: 'calc(50% - 1rem)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
  },
}));
// "&@media only screen and (min-width: 1105px)": {
//   marginBottom: "45px",
// },
