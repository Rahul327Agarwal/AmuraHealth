import { makeStyles } from 'tss-react/mui';
import { IProps } from './HistoryDataList.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { unit }) => ({
  //main conatiner styles
  historySection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  historyTitle: {
    color: theme.palette.colors.gray[400],
  },

  singleHistory: {
    display: 'flex',
    gap: '4px',
    // gridTemplateColumns: 'auto 1fr',
    background: theme.palette.colors.gray[25],
    padding: '9px 12px',
    borderRadius: '8px',
    color: theme.palette.colors.gray[400],
  },

  //@wweight styles

  values: {
    display: 'grid',
    gap: '4px',
    gridTemplateColumns: unit === 'kgs' ? '50px 39px' : '64px 48px',
    overflow: 'hidden',
  },
  onlyCurerntValue: {
    display: 'grid',
    alignItems: 'center',
    overflow: 'hidden',
    gridTemplateColumns: unit === 'kgs' ? '39px' : '50px',
  },
  differenceValue: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: unit === 'kgs' ? '12px 30px' : '12px 38px',
    gap: '4px',
    overflow: 'hidden',
  },
  current: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // width: '57px',
  },
  currentWeight: {
    color: theme.palette.colors.theme.primary,
  },

  unitAndDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  //@BP styles
  bpvaluesContainer: {
    display: 'grid',
    gap: '4px',
    gridTemplateColumns: '58px 39px 1fr',
    alignItems: 'center',
    overflow: 'hidden',
  },
  maxWidthControl: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '55px !important',
  },
}));
