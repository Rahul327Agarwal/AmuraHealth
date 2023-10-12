import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  container: {
    padding: '16px',
    background: '#FFFFFF',
  },
  spaceBetween: {
    display: 'grid',
    // justifyContent: 'space-between',
    // gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    padding: '16px 0',
    margin: '0 16px',
    borderBottom: '0.5px solid #E1E1E1',
    gap: '8px',
  },
  name: {
    display: 'block',
    color: '#5C5A61',
    // width: '120px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  text: {
    display: 'block',
    color: '#5C5A61',
    textAlign: 'end',
  },
  date: {
    color: '#5C5A61',
    display: 'block',
    textAlign: 'end',
  },
  dot: {
    background: '#d8f3dc',
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  roleDiv: {
    display: 'flex',
    gap: '4px',
    backgroundColor: theme.palette.colors.gray[50],
    borderRadius: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 4px 0 2px',
    // marginLeft: '8px',
    color: theme.palette.colors.gray[500],
    width: 'fit-content',
  },
  titleDayDiv: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    gap: '4px',
  },
  roleTimeDiv: {
    display: 'grid',
    gap: '4px',
    alignItems: 'center',
    gridTemplateColumns: '1fr auto ',
  },
}));
