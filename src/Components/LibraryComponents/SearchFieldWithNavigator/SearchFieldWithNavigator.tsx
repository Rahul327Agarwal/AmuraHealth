import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useState, memo } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { ChatDownArrowIcon, ChatSearchIcon, ChatUpArrowIcon } from '../../SVGs/ChatSearch';
import { useStyles } from './SearchField.styles';
import { IProps } from './SearchField.types';

function SearchField(props: IProps) {
  const {
    customStyle,
    handleSearch,
    value,
    handleNavClick,
    isUpNavDisabled,
    isDownNavDisabled,
    ...restprops
  } = props;

  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (value || value === '') setSearch(value);
  }, [value]);

  const handleChange = (event: any) => {
    const vaue = event.target.value.trim() ? event.target.value : event.target.value.trim();
    setSearch(vaue);
    handleSearch(vaue);
  };

  return (
    <TextField
      {...restprops}
      fullWidth
      className={`${commonClasses.body15Medium} ${classes.inputWrap} ${customStyle}`}
      value={search}
      size="small"
      variant="outlined"
      onChange={handleChange}
      autoFocus={true}
      InputProps={{
        startAdornment: <InputAdornment position="start">{<ChatSearchIcon />}</InputAdornment>,
        endAdornment: (
          <>
            <InputAdornment
              className={classes.navIcon}
              position="end"
              data-disabled={isUpNavDisabled}
              onClick={() => {
                if (isUpNavDisabled) return;
                handleNavClick('UP');
              }}
            >
              <ChatUpArrowIcon />
            </InputAdornment>
            <InputAdornment
              className={classes.navIcon}
              sx={{ mr: '12px' }}
              position="end"
              data-disabled={isDownNavDisabled}
              onClick={() => {
                if (isDownNavDisabled) return;
                handleNavClick('DOWN');
              }}
            >
              <ChatDownArrowIcon />
            </InputAdornment>
          </>
        ),
      }}
    />
  );
}
export default memo(SearchField);
