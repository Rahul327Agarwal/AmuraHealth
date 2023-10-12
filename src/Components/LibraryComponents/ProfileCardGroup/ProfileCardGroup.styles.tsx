import { makeStyles } from 'tss-react/mui';
import { ProgressProps } from './ProfileCardGroup.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  profileWrap: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  profilePic: {
    height: '52px',
    width: '52px',
    borderRadius: '50%',
    margin: '0px 14px 0px 0px',
    color: theme.palette.colors.system.white,
    backgroundColor: theme.palette.colors.gray[900],
  },
  profileContent: {
    width: '76%',
  },
  nameWrap: {
    marginBottom: '4px',
  },
  profileName: {
    color: theme.palette.colors.gray[900],
    marginRight: '17px',
    wordBreak: 'break-word',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  ratingIcon: {
    marginRight: '5px',
  },
  ratingValue: {},
  profileContentWrap: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: '6px',
  },
  profileGroupWrapper: {
    gap: '15px',
    border: '1px solid #F1F1F1',
    borderTop: 'none',
    display: 'flex',
    padding: '0 20px 20px',
    background: '#FFFFFF',
    boxShadow: '0px 30px 45px -5px rgb(0 0 0 / 5%)',
    borderRadius: '0px 0px 32px 32px',
    flexDirection: 'column',
    marginBottom: '20px',
  },
}));

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useProgressStyles = makeStyles<ProgressProps>()((theme, props) => ({
  progressWrap: {
    height: '6px',
    width: '100%',
    borderRadius: '8px',
    position: 'relative',
    overflow: 'hidden',
    background: '#F1F1F1',
    marginBottom: '5px',
  },
  progressField: {
    display: 'inline-block',
    width: `${props.progressValue}%`,
    background: `${props.progreesColor}`,
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '100%',
    borderRadius: 'inherit',
  },
}));
