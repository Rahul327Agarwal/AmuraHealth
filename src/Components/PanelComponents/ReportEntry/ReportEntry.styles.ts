import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  reportDetailCmp: {
    height: '100%',
  },
  deleteButtonContainer: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  biomarkerEntryCmp: {
    height: '100%',
  },
}));
