import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  wrapper: {
    padding: '30px 0 0',
    // height: "calc(100vh - 380px)",
    height: '100%',
    // overflowY: 'auto',
    overflow: 'hidden',
    // minHeight: "100vh",
    // position: "relative"
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  contentWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // height: "70vh",  //for teting storybooy
    height: '53vh', // for qa
    flexDirection: 'column',
  },
  stepNo: {
    color: '#252427',
    display: 'block',
    marginBottom: '49px',
    marginTop: '-30px',
    padding: '0 20px',
  },
  loader: {
    color: '#000000',
    width: '16px !important',
    height: '16px !important',
  },
  loaderParent: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  inputWrapNew: {
    overflow: 'auto',
    height: '100%',
    padding: ' 0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '27px',
    marginBottom: '40px',
  },
  inputWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '27px',
    marginBottom: '40px',
  },
  footerButtons: {
    paddingTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '27px',
  },
  stepsData: {
    color: '#5C5A61',
  },
  stepsWrapper: {
    paddingTop: '8px',
    marginBottom: '24px',
    display: 'flex',
    // gap: "27px",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepid: {
    display: 'flex',

    height: '60px',
    width: '60px',
    borderRadius: '8px',
    background: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepsDescription: {
    color: '#5C5A61',
    margin: '0',
    overflow: 'hidden',
    // textOverflow: "ellipsis",
    // whiteSpace: "nowrap",
    width: '220px',
    maxWidth: '220px',
    wordBreak: 'break-word',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    maxHeight: '40px',
  },
  dotIcon: {},
  flex: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerStyle: {
    padding: '20px',
    // margin: '10px -20px -20px 0px',
    // position: 'absolute',
    // bottom: '16px',
    // left: '0px',
    width: '100%',
  },
  optionText: {
    color: '#A6A6A6',
    display: 'block',
    textAlign: 'center',
  },
  imgWrap: {
    paddingTop: '12px',
  },
  imgText: {
    color: '#A6A6A6',
    display: 'inline-block',
    marginBottom: '10px',
  },
  screenWrapperNew: {
    height: '100%',
    overflow: 'auto',
  },
  screenWrapper: {
    height: 'calc(100% - 0px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0 20px',
  },
  stepsContainer: { height: '100%', overflow: 'auto', padding: '0 20px 20px' },

  screenContent: {
    overflow: 'auto',
    height: '100%',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  screenContentNew: {
    padding: '30px 20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  iconWrap: {
    display: 'block',
    marginBottom: '36px',
    textAlign: 'center',
  },
  successText: {
    textAlign: 'center',
    marginBottom: '36px',
    fontSize: '17px',
    fontWeight: 500,
    color: '#E1E1E1',
    marginTop: '24px',
  },
  watermarkText: {
    textAlign: 'center',

    fontSize: '17px',
    fontWeight: 500,
    color: '#E1E1E1',
    maxWidth: '250px',
    lineHeight: '22px',
    margin: '0 auto',
    marginBottom: '20%',
  },
}));
