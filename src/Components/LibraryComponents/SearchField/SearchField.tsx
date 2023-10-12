import { InputAdornment } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { CrossIcon, SearchIcon } from './SearchField.svg';
import InputField from '../InputField/InputField';
import { useStyles } from './SearchField.styles';
import { IProps } from './SearchField.types';
import { TickIcon } from '../../PanelComponents/TimeManagement/TimeManagement.svg';

export default function SearchField(props: IProps) {
  const {
    disabled,
    customStyle,
    handleSearch,
    onPaste,
    isInputVariant,
    value,
    onKeyDown,
    setSearchResult,
    setSearchString,
    disableAutoFocus,
    isReadOnly,
    autoFocus,
    searchIcon,
    isValidEmail,
    onAddEmail,
    ...restprops
  } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isReadOnly) return;
    if (value || value === '') setSearch(value);
  }, [value]);

  const handleChange = (event: any) => {
    if (isReadOnly) return;
    setSearch(event.target.value.trim() ? event.target.value : event.target.value.trim());
    handleSearch(event.target.value.trim() ? event.target.value : event.target.value.trim());
  };
  const handleClear = () => {
    setSearch('');
    handleSearch('');
    setSearchString?.('');
    setSearchResult && setSearchResult([]);
    if (inputRef?.current?.focus) {
      inputRef.current.focus();
    }
  };

  return (
    <InputField
      {...restprops}
      fullWidth
      className={`${commonClasses.body15Regular} ${!isInputVariant ? classes.inputWrap : ''} ${customStyle}`}
      value={search}
      disabled={disabled}
      size="small"
      inputRef={inputRef}
      // variant={isInputVariant ? 'standard' : 'outlined'}
      isSearchInput={!isInputVariant}
      onChange={handleChange}
      onPaste={(e) => {
        if (onPaste) {
          e.preventDefault();
          onPaste(e.clipboardData.getData('Text'));
        }
      }}
      // autoFocus={!disableAutoFocus}
      autoFocus={autoFocus || false}
      onKeyDown={(event: any) => {
        if (event.key === 'Enter' && onKeyDown) {
          event.target.blur();
          onKeyDown();
        }
      }}
      InputProps={{
        readOnly: isReadOnly,
        startAdornment: <InputAdornment position="start">{searchIcon ? searchIcon : <SearchIcon />}</InputAdornment>,
        endAdornment: !isInputVariant ? (
          !isValidEmail ? (
            <InputAdornment className={`${classes.clearIcon} ${search && 'visible'}`} position="end" onClick={handleClear}>
              <CrossIcon />
            </InputAdornment>
          ) : (
            <InputAdornment className={`${classes.clearIcon} ${search && 'visible'}`} position="end" onClick={() => onAddEmail()}>
              <TickIcon />
            </InputAdornment>
          )
        ) : null,
      }}
    />
  );
}

// export default function SearchField(props: IProps) {
//   const {
//     disabled,
//     customStyle,
//     handleSearch,
//     isInputVariant,
//     value,
//     onKeyDown,
//     setSearchResult,
//     setSearchString,
//     disableAutoFocus,
//     isReadOnly,
//     ...restprops
//   } = props;
//   const { classes } = useStyles(props);
//   const commonClasses = useCommonStyles();
//   const [search, setSearch] = useState('');
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (isReadOnly) return;
//     if (value || value === '') setSearch(value);
//   }, [value]);

//   const handleChange = (event: any) => {
//     if (isReadOnly) return;
//     setSearch(event.target.value.trim() ? event.target.value : event.target.value.trim());
//     handleSearch(event.target.value.trim() ? event.target.value : event.target.value.trim());
//   };
//   const handleClear = () => {
//     setSearch('');
//     handleSearch('');
//     setSearchString?.('');
//     setSearchResult && setSearchResult([]);
//     if (inputRef?.current?.focus) {
//       inputRef.current.focus({
//         preventScroll: true,
//       });
//     }
//   };

//   return (
//     <InputField
//       {...restprops}
//       fullWidth
//       className={`${commonClasses.body15Regular} ${!isInputVariant ? classes.inputWrap : ''} ${customStyle}`}
//       value={search}
//       disabled={disabled}
//       size="small"
//       inputRef={inputRef}
//       // variant={isInputVariant ? 'standard' : 'outlined'}
//       isSearchInput={!isInputVariant}
//       onChange={handleChange}
//       // autoFocus={!disableAutoFocus}
//       autoFocus={false}
//       onKeyDown={(event: any) => {
//         if (event.key === 'Enter' && onKeyDown) onKeyDown();
//       }}
//       InputProps={{
//         readOnly: isReadOnly,
//         startAdornment: <InputAdornment position="start">{<SearchIcon />}</InputAdornment>,
//         endAdornment: !isInputVariant ? (
//           <InputAdornment className={`${classes.clearIcon} ${search && 'visible'}`} position="end" onClick={handleClear}>
//             {<CrossIcon />}
//           </InputAdornment>
//         ) : null,
//       }}
//     />
//   );
// }
