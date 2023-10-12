import { makeStyles } from 'tss-react/mui';
import { IProps } from './SummarySubSnippet.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { onClick }) => ({
  mainContainer: {
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'column',
    margin: '12px 0px',
    overflow: 'hidden',
    cursor: onClick ? 'pointer' : 'unset',
  },
  subContainer: {
    display: 'flex',
    color: '#A6A6A6',
    marginBottom: '4px',
    alignItems: 'center',

    '& svg': {
      width: '20px',
      height: '20px',
    },
  },
  titleStyle: {
    color: '#A6A6A6',
    marginLeft: '5px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  valueStyle: {
    color: '#252427',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize',
  },
  valueStyleNoOverflow: {
    color: theme.palette.colors.gray[900],
  },
  textAlignCenter: {
    textAlign: 'center',
  },
}));
//background: theme.palette.colors.theme.primaryLight,
