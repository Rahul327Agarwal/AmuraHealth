import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    color: theme.palette.colors.gray[500],
    backgroundColor: theme.palette.colors.gray[25],
    borderRadius: '6px',
    padding: '16px 8px',
    width: '100%',
  },
  questionContainer: {
    width: 'calc(100% - 16px)',
    display: 'grid',
    gridTemplateColumns: '23px calc(100% - 23px)',
    margin: '0px 8px',
  },
  qusTextStyle: {
    marginLeft: '8px',
    overflowWrap: 'anywhere',
  },

  iconCon: {
    marginRight: '8px',
    width: '23px',
  },
  emojisCon: {
    margin: '24px 47px 8px 45px',
  },
  statusCon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '20px 23px 12px 0px',
  },
  reddoIcon: {
    marginLeft: '9px',
  },
}));
