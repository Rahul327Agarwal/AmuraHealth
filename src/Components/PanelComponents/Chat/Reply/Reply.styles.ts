import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()(() => ({
  largeCloseIcon: {
    fontSize: 'large',
    color: '#C6C6C6',
    cursor: 'pointer',
    textAlign: 'end',
    marginLeft: '40px',
  },
  replyTo: {
    float: 'left',
    margin: '4px 10px',
    color: 'rgba(187, 187, 187, 0.5)',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '150%',
  },
}));
