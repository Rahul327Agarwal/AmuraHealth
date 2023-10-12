import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  filterContainer: {
    position: 'relative',
    // height: 'calc(100% - 40px)',
    height: '100%',
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
  },
  scrollBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'inherit',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 -20px',
    padding: '0 20px',
  },
  footerStyle: {
    margin: 'auto -20px -20px',
    padding: '20px',
  },
  participant: {
    '& .MuiAutocomplete-root': {
      '& .MuiIconButton-root': {
        '& .MuiIconButton-label': {
          height: '10px !important',
          width: '10px !important',
        },
      },
    },
    '& .MuiIconButton-label': {
      height: '10px !important',
      width: '10px !important',
    },
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    width: '100%',
    '& .MuiFormControl-root': {
      '& input:': {
        fontSize: '14px !important',
      },
    },
    '& .MuiTextField-root': {
      '& .MuiInputBase-input': {
        fontSize: '14px !important',
        '& input:': {
          fontSize: '14px !important',
        },
      },
    },
  },
  activeClearAll: {
    color: theme.palette.colors.theme.primaryLight,
  },
  defaultClearAll: {
    color: theme.palette.colors.gray[400],
  },
  addedPeopleBox: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gap: '10px',
    padding: '10px 0',
    alignItems: 'center',
    cursor: 'pointer',
  },
  profilePic: {
    borderRadius: '50%',
    height: '34px',
    width: '34px',
    color: theme.palette.colors.system.white,
    backgroundColor: theme.palette.colors.gray[900],
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'Graphik',
  },
  primaryText: {
    color: theme.palette.colors.theme.primary,
  },
  wordBreak:{
    wordBreak:'break-word'
  }
}));
