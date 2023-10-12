import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useMyTeamStyles = makeStyles()((theme) => ({
  root: {
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.paper + ' !important',
    height: '100%',
    display: 'flex',
    gap: '16px',
    padding: '12px',
  },

  cardsContainer: {
    display: 'flex',
    gap: '16px',
  },

  settingsIcon: {
    width: '42px',
    height: '42px',
    marginRight: '16px',
  },

  mainContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '45px',
    width: '45px',
    backgroundColor: 'rgba(4, 4, 4, 0.9)',
    cursor: 'pointer',
    borderRadius: '32px',
    color: '#FFF',
  },
  avatarContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
    marginRight: '5px',
  },
  dropdown: {
    position: 'absolute',
    bottom: 15,
    right: -5,
    backgroundColor: '#141415',
    borderRadius: '20px',
  },
  rolesStyle: {
    fontSize: '14px',
    color: '#5C5A61',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: '24% 76%',
    width: '355px',
    color: '#5C5A61',
  },
  cardStyle: {
    padding: '12px',
    background: '#F8F8F8',
    marginBottom: '8px',
    borderRadius: '10px',
    maxWidth: '355px',
  },
  popoverStyle: {
    padding: '7px',

    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  userName: {
    color: '#5C5A61',
  },
  skeltonCard: {
    display: 'grid',
    gridTemplateColumns: '60px auto',
    padding: '6px',
    background: '#f8f8f8',
    gridGap: '10px',
    borderRadius: '10px',
  },
  menuStyle: {
    '&.MuiPaper-root': {
      translate: '-10px -25px !important',
    },
  },
}));
