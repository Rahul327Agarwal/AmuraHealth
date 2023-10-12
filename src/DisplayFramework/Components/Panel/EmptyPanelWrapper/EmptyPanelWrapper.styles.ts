import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  emptyPanelWrapper: {
    // paddingTop: '180px',
    // justifyContent: 'center',
    // display: 'flex',
    // height: '100%',

    height: '100%',
    display: 'grid',
    gridTemplateRows: '18% 70%',
    justifyContent: 'center',
  },
}));
