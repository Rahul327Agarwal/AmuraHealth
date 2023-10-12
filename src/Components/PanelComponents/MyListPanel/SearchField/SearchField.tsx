import { InputAdornment, TextField } from '@mui/material';
import { useRef } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { CrossIcon, SearchIcon } from '../../../SVGs/Common';
import { useStyles } from './SearchField.styles';
import { IProps } from './SearchField.types';

export default function SearchField(props: IProps) {
  const { searchvalue, setSearchvalue, customStyle, handleSearch, ...restprops } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const inputRef: any = useRef(null);

  const handleChange = (event: any) => {
    setSearchvalue(event.target.value);
    if (handleSearch) {
      handleSearch();
    }
  };
  const handleClear = () => {
    setSearchvalue('');
    if (inputRef?.current?.focus) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };

  return (
    <TextField
      {...restprops}
      fullWidth
      className={`${commonClasses.body15Regular} ${classes.inputWrap} ${customStyle}`}
      value={searchvalue}
      size="small"
      inputRef={inputRef}
      variant="outlined"
      onChange={handleChange}
      autoFocus={true}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment className={`${classes.clearIcon} ${searchvalue && 'visible'}`} position="end" onClick={handleClear}>
            <CrossIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
