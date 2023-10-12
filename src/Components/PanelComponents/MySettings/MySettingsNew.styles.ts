import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  tempCompWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '0 20px',
    // height: '72px',
    height: '92px',
    backgroundColor: 'white',
  },
  tempCompBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  tempCompBtn: {
    background: 'white',
    cursor: 'pointer',
    color: 'black',
    outline: 'none',
    border: 0,
    // background: "yellow",
    padding: 0,
  },
}));
