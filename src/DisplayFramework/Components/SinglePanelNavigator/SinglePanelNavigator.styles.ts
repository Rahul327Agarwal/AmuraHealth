import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<{
  isHeaderShown: boolean;
}>()((theme, { isHeaderShown }) => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    gap: '30px',
    height: isHeaderShown ? '60px' : '0px',
    visibility: isHeaderShown ? 'visible' : 'hidden',
    opacity: isHeaderShown ? 1 : 0,
    transition: 'all 0.2s ease',
  },
  mainContainer: {
    display: 'flex',
    gridTemplateColumns: 'repeat(, 1fr)',
    alignItems: 'center',
    height: '56px',
    width: '100%',
    alignContent: 'center',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}));
