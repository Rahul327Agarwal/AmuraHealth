import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  inputFields: {
    display: 'grid',
    gridAutoRows: 'auto',
    gridRowGap: '16px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '17px',
    color: theme.palette.colors.gray[900],
    margin: '32px',
  },
  lengthGrid: {
    display: 'grid',
    gridTemplateColumns: '28% 70%',
    gridGap: '2%',
    alignItems: 'end',
  },
  centerAlignSpan: {
    display: 'flex',
    alignItems: 'center',
  },
  healthTypeInput: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    // border: `1px solid ${theme.palette.colors.gray[500]}`,
    borderRadius: '4px',
  },
  buttonStyles: {
    textAlign: 'center' as const,
    margin: '10px',
  },
  cancelIconStyle: {
    border: '1px solid white',
    borderRadius: '4px',
    background: '#333',
    textDecoration: 'none' as const,
    textTransform: 'none' as const,
    marginRight: '20px',
    height: '36px',
    color: '#fff',
    minWidth: '36px !important',
    padding: '0px !important',
    '&:hover': {
      color: '#000',
      '& span svg path': {
        fill: '#000',
      },
    },
    '& span svg path': {
      fill: '#fff',
    },
  },
  disabledCancelIcon: {
    color: '#595A5A !important',
    border: '1px solid #595A5A',
    height: '36px',
    background: 'transparent !important',
    borderRadius: '4px',
    textDecoration: 'none' as const,
    textTransform: 'none' as const,
    marginRight: '20px',
    minWidth: '36px !important',
    padding: '0px !important',
    '& span svg path': {
      fill: '#595A5A !important',
    },
  },
  disableClass: {
    '&:disabled': {
      color: 'white !important',
    },
  },
  height31px: {
    height: '31px',
  },
  widthInherit: {
    width: 'inherit',
  },
  paddingBottom15px: {
    paddingBottom: '15px',
  },
  error: {
    padding: ' 6px !important',
    color: '#fff',
  },
  errorIcon: {
    color: '#FF6060',
    marginRight: '10px',
  },
  disablePrescription: {
    background: '#56575b',
    color: '#000000 !important',
  },
  disablePrescriptionText: {
    background: '#00FFCC',
    textDecoration: 'none',
    textTransform: 'none',
    color: '#040404e6',
    height: '36px',
  },
  selectRegionWrapper: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '0 !important',
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.colors.system.white,
    },
    '& .MuiAutocomplete-clearIndicator': {
      display: 'none',
    },
  },
}));
