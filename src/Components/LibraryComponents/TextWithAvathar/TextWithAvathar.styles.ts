import { makeStyles } from 'tss-react/mui';
import { IProps } from './TextWithAvathar.types';
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  root: {
    display: 'inline',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      //margin: theme.spacing(0.5),
      height: '36px',
      borderRadius: '20px',
      padding: '6px 6px',
    },
    '& .MuiChip-outlined': {
      border: `1px solid ${theme.palette.colors.gray[400]} !important`,
      '&:hover': {
        color: `${theme.palette.colors.gray[900]} !important`,
      },
      margin: '0px !important',
    },
    '&:hover': {
      color: `${theme.palette.colors.gray[900]} !important`,
      '& .MuiChip-label': {
        color: `${theme.palette.colors.gray[900]} !important`,
      },
    },
    '& .MuiChip-label': {
      color: `${theme.palette.colors.gray[900]} !important`,
      fontFamily: 'Graphik !important',
      fontSize: '15px',
      lineHeight: '20px',
      fontWeight: 400,
      fontStyle: 'normal',
      '&:hover': {
        color: `${theme.palette.colors.gray[900]} !important`,
      },
    },
  },
  borderis: {
    display: 'flex',
    width: '24px !important',
    height: '24px !important',
    justifyContent: 'center',
    alignItems: 'center',
    border: props.color ? `2px solid ${props.color}` : '2px solid red',
    borderRadius: '24px !important',
  },
  avatarSize: {
    width: '16px',
    height: '16px',
    fontSize: '8px',
    color: theme.palette.colors.system.white,
  },

  imgWrap: {
    height: '48px',
    width: '48px',
    borderRadius: '50%',
    background: '#626262',
    margin: '0px',
  },
}));
