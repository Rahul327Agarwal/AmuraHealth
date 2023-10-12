import { Autocomplete, Popper, PopperProps, TextField } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { PMS_LOCALE } from '../../../../../Utils';
import { ArrowDown } from '../../../PostManagement/PostManagement.svg';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  biomakerAutoSuggest: {
    width: '100%',
    // padding: "7px 0px 0px 0px",
    borderRadius: '4px',
    backgroundColor: '#141415 !important',
    '& .MuiAutocomplete-root': {
      '& .MuiOutlinedInput-root': {
        '& .MuiOutlinedInput-notchedOutline ': {
          border: 'none !important',
        },
      },
    },
    '& .MuiInputBase-root': {
      backgroundColor: '#141415 !important',
    },
    '& .Mui-disabled': {
      WebkitTextFillColor: 'unset !important',
    },
    '& .MuiAutocomplete-endAdornment ': {
      '& .MuiSvgIcon-root': {
        '& path': {
          fill: '#FFFFFF !important',
        },
      },
    },
    '& .MuiPaper-root': {
      color: '#fff !important',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      backgroundColor: '#000 !important',
    },
    '& .MuiMenu-list': {
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), #121212',
      maxHeight: '300px !important',
      outline: 0,
    },
    '& .MuiInputBase-input': {
      cursor: 'pointer',
      background: '#141415 !important',
      color: '#fff !important',
      padding: '6px 0px 7px 6px !important',
      fontSize: '14px !important',
    },
    '& .MuiInputBase-input:disabled ': {
      background: '#141415 !important',
    },
    '& .react-autosuggest__input': {
      backgroundColor: '#141415',
      border: 0,
      outline: 0,
      padding: '5px 5px',
      color: '#fff !important',
      borderBottom: '0px !important',
      fontSize: '14px',
    },
    '& .react-autosuggest__input--focused': {
      outline: 'none',
      backgroundColor: '#818284',
    },
    '& .react-autosuggest__input:hover': {
      outline: 'none',
      backgroundColor: '#818284',
    },
  },
  biomakerAutoSuggestText: {
    '& .MuiInputBase-input': {
      height: '18px !important',
      fontSize: '12px !important',
      backgroundColor: '#141415 !important',
      // boxShadow: '0px 8px 10px rgb(0 0 0 / 14%), 0px 3px 14px rgb(0 0 0 / 12%), 0px 5px 5px rgb(0 0 0 / 20%)',
      cursor: 'pointer',
      background: '#141415 !important',
      color: '#fff !important',
      padding: '6px 0px 7px 6px !important',
    },
  },
  autoMenu: {
    padding: '5px 10px',
    // display: 'flex',
    // alignItems: 'center',
    // gap: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    cursor: 'pointer',
    '&:hover, &[data-selected="true"]': {
      backgroundColor: '#141415 !important',
    },
  },
}));

const useStylesForMenu = makeStyles()((theme) => ({
  root: {
    zIndex: 1600,
    '& .MuiPaper-root': {
      color: '#FFFFFF',
      backgroundColor: '#000000!important',
      opacity: 1,
    },
    '& .MuiAutocomplete-listbox': {
      overflowX: 'hidden',
      color: '#FFFFFF !important',
    },
    '& .Mui-focused': {
      background: `#141415!important`,
      // fontWeight: '700 !important',
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

const CustomPopper = function (props: PopperProps) {
  const { classes } = useStylesForMenu();
  return <Popper {...props} className={classes.root} placement="bottom" />;
};

interface IProps {
  options: any;
  handleSelect: Function;
  getSelectedItem?: Function;
  placeHolder: string;
  labelParameter?: string;
  value: string;
  disable?: boolean;
}
export default function SelectComponentEdit(props: IProps) {
  const { classes } = useStyles();
  const { handleSelect, labelParameter, placeHolder, options, disable } = props;
  const getSelectedItem = (list: any[], record: any) => {
    const item = list.find((opt) => {
      if (opt[labelParameter] === record) return opt;
    });
    return item || { labelParameter: '' };
  };
  return (
    <div>
      <div className={classes.biomakerAutoSuggest}>
        <Autocomplete
          // popupIcon={<ArrowDown />}
          PopperComponent={CustomPopper}
          options={options}
          onChange={(e, value) => {
            handleSelect(value);
          }}
          disabled={disable}
          getOptionLabel={(option) => (props.labelParameter ? option[labelParameter] || '' : option.Name || '')}
          renderOption={(iprops: any, ioptions: any, { selected, ...rest }) => {
            return (
              <div
                {...iprops}
                data-selected={selected}
                title={`${props.labelParameter ? ioptions[labelParameter] : ioptions.Name}`}
                className={classes.autoMenu}
              >{`${PMS_LOCALE.translate(props.labelParameter ? ioptions[labelParameter] : ioptions.Name)}`}</div>
            );
          }}
          fullWidth
          id="AutoSuggestLabName"
          value={getSelectedItem(options, props.value)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={PMS_LOCALE.translate(props.placeHolder)}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                className: classes.biomakerAutoSuggestText,
              }}
              title={getSelectedItem(options, props.value)[labelParameter]}
            />
          )}
        />
      </div>
    </div>
  );
}
