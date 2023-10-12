import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  rootContainer: {},
  headerTitle: {
    fontFamily: 'Graphik',
    fontWeight: 600,
    fontSize: '15px',
    color: theme.palette.grey[400],
    margin: '24px 0',
  },
  inputWrapper: {
    display: 'grid',
    // gridTemplateColumns: '47% 47%',
    gridTemplateColumns:'repeat(auto-fit, minmax(50px, 1fr))',
    gap: '10px',
    width: '100%',
    justifyContent: 'space-between',
  },
  inputStyle: {
    fontSize: '17px !important',
  },
  mt: {
    marginTop: '30px',
  },
  errorText: {
    color: '#f44336',
  },
}));
