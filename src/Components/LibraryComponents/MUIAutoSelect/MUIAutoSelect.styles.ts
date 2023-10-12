import { makeStyles } from 'tss-react/mui';
import { IProps } from './MUIAutoSelect.types';

export const useStyles = makeStyles<IProps>()((theme, { OptionMenuProps }) => ({
  mainMenuWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    flexDirection: OptionMenuProps?.reverseCheckbox ? 'row-reverse' : 'row',
    justifyContent: OptionMenuProps?.reverseCheckbox ? 'space-between' : 'flex-start',
  },
  optionsWrap: {
    // display: "flex",
    width: '100%',
    flexDirection: OptionMenuProps?.inlineLabel ? 'row' : 'column',
    justifyContent: OptionMenuProps?.inlineLabel ? 'space-between' : 'flex-start',
    alignItems: OptionMenuProps?.inlineLabel ? 'baseline' : 'flex-start',
    gap: OptionMenuProps?.inlineLabel ? '10px' : '0px',
  },
  label: {
    color: theme.palette.colors.gray[500],
    wordBreak: 'break-word',
    fontWeight: 'inherit',
  },

  SelectRoot: {
    '&:hover .MuiSvgIcon-root': {
      fill: `${theme.palette.colors.gray[500]} !important`,
      opacity: '0.7',
    },
    '& .MuiInputBase-root.Mui-disabled':{
      ":before": {
        borderBottomStyle:'solid'
      },
    },
    '& .MuiAutocomplete-clearIndicator': {
      padding: '0px',
      color: theme.palette.colors.gray[500],
    },
    '& .MuiAutocomplete-endAdornment': {
      display: OptionMenuProps?.endAdornmentNotFlex ? 'block' : 'flex',
      gap: '5px',
      // paddingRight: "8px",
      position: 'unset',
      marginRight:'8px'
    },
    '& .MuiAutocomplete-inputRoot': {
      paddingRight: '0 !important',
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"] input.MuiAutocomplete-input:first-child': {
      paddingRight: '50px !important',
    },
  },
  profileTokenWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    flexWrap: 'wrap',
    gap: '10px',
    padding: '10px 50px 10px 0',
  },
}));

export const useStylesForMenu = makeStyles()((theme) => ({
  root: {
    zIndex: 1700,
    '& .MuiAutocomplete-listbox': {
      color: `${theme.palette.colors.gray[500]} !important`,
      overflowX: 'hidden',
    },
    '& .MuiAutocomplete-listbox > div': {
      padding: '10px 16px',
    },
    '& .MuiAutocomplete-listbox > div:hover': {
      backgroundColor: `${theme.palette.colors.gray[25]} !important`,
      cursor: 'pointer',
    },

    // ............ legacy code
    '& .MuiPaper-root': {
      background: `${theme.palette.colors.system.white} !important`,
    },

    '& .MuiAutocomplete-noOptions': {
      color: `${theme.palette.colors.gray[500]} !important`,
    },
    '& .MuiAutocomplete-option': {
      padding: '10px 16px !important',
      '&[aria-selected="true"], &[data-focus="true"]': {
        background: `${theme.palette.colors.gray[25]} !important`,
        fontWeight: '700 !important',
      },
    },
  },
}));
