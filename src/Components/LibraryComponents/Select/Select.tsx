import { Avatar, ClickAwayListener, debounce, Grow, InputAdornment, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { getNameInitials } from '../../../Common/Common.functions';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
// import { AutoSizer, List } from 'react-virtualized';
// import { getNameInitials } from '../../Common/Common.functions';
import { AutoSizer, List } from '../../../Utilities/AutoResizerWrapper';
import { ArrowDown, CalendarIcon, CheckIconThin, EditIcon } from '../../SVGs/Common';
import { CachedAvatar } from '../Avatar/CachedAvatar';
import InputField from '../InputField/InputField';
import Button from '../MUIButton/MUIButton';
import Checkbox from '../MUICheckbox/MUICheckbox';
import MUIDrawer from '../MUIDrawer/MUIDrawer';
import Radio from '../MUIRadio/MUIRadio';
import MUISkeleton from '../MUISkeleton/MUISkeleton';
import Token from '../MUIToken/MUIToken';
import SearchField from '../SearchField/SearchField';
import { useStyles } from './Select.styles';
import { IProps } from './Select.types';

const isFirefox = !!navigator.userAgent.match(/firefox|fxios/i);

export default function Select(props: IProps) {
  const {
    isReadOnly,
    options,
    optionsType,
    isToken,
    isTokenDeletable,
    headerTitle,
    isSearch,
    position,
    values,
    setValues,
    placeholder,
    isAutoOk,
    handleCustomType,
    isCalender,
    handleEndAdornment,
    helperText,
    parameter,
    showSelectAll,
    disabled,
    extendTokenHeight,
    renderValueAsToken,
    renderValueAsTokenDeletable,
    isReturnSelectedOption,
    onSearchAPICall,
    // isCardType,
    showMenu,
    defaultEmptyValue,
    maxHeight,
  } = props;
  const isMultiSelect = optionsType === 'checkbox' || optionsType === 'profileToken';
  const anchorRef = React.useRef(null);
  const isIcon = Boolean(options && options.length > 0 && options[0].icon);
  const { classes } = useStyles({ ...props, isIcon, isProfileToken: optionsType === 'profileToken', isFirefox });
  const commonClass = useCommonStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [localoptions, setLocaloptions] = useState(options);
  const [selected, setSelected] = useState(values);
  const [renderValue, setRenderValue] = useState(values);
  const [renderIcon, setRenderIcon] = useState<any>(null);
  const [height, setHeight] = useState(0);
  const [viewMore, setViewMore] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const checkParameter = parameter || 'value';
  const isRenderValueAsToken = isMultiSelect && renderValueAsToken;
  const selectDisabled = isRenderValueAsToken && renderValue.length;
  const localOptionsLength = localoptions.length;

  useEffect(() => {
    props.handleCloseRef?.(handleClose);
  }, []);

  useEffect(() => {
    setLocaloptions(options);
  }, [options]);

  useEffect(() => {
    if (!isOpen) setLocaloptions(options);
  }, [isOpen]);

  useEffect(() => {
    setSelected(values);
    renderValueSelect(values);
  }, [values, options, isOpen]);

  useEffect(() => {
    if (extendTokenHeight && optionsType === 'checkbox') {
      if (selected?.length) {
        setHeight(elementRef?.current?.clientHeight ?? 0);
      }
    }
  }, [selected?.length]); //empty dependency array so it only runs once at render

  useEffect(() => {
    if (height > 52) {
      setReadMore(true);
    } else {
      setReadMore(false);
    }
  }, [height]);

  useEffect(() => {
    if (selected && isAutoOk && localOptionsLength) handleAdd();
  }, [selected]);

  const handleViewMore = () => {
    setViewMore((current) => !current);
  };

  const renderValueSelect = (paramValue: any) => {
    if (isMultiSelect) {
      const result = options?.filter((data) => paramValue.includes((data as any)[checkParameter]))?.map((data) => data.label);
      if (isRenderValueAsToken) setRenderValue(result || []);
      else setRenderValue(result?.join(', ') || []);
      return;
    }
    const result = options?.find((data) => (data as any)[checkParameter] === paramValue);
    setRenderValue(result?.label || '');
    if (isIcon) setRenderIcon(result?.icon);
  };

  const handleOpen = (event: any) => {
    setIsOpen(true);
  };
  const handleClose = () => {
    if (!isAutoOk) {
      setSelected('');
    }
    setIsOpen(false);
  };

  const handleSearch = async (e: any) => {
    if (onSearchAPICall) {
      const options = await onSearchAPICall(e);
      if (options) setLocaloptions(options);

      return;
    }
    const filtered = options.filter((v) => {
      const search = e.toLowerCase();
      return v.label.toLowerCase().includes(search) || (v as any)[checkParameter].toLowerCase().includes(search);
    });
    setLocaloptions(filtered);
  };

  const onSelect = (data: any) => {
    if (!isMultiSelect) return setSelected(data);
    setSelected((pre: any) => {
      let tempArray = JSON.parse(JSON.stringify(pre));
      if (defaultEmptyValue?.length) {
        tempArray = tempArray?.filter((d: any) => !defaultEmptyValue.includes(d));
      }
      const index = tempArray.indexOf(data);
      if (index === -1) return [...tempArray, data];
      tempArray.splice(index, 1);
      return [...tempArray];
    });
  };

  const handleDelete = (value: any) => {
    if (!isMultiSelect) return setSelected('');
    setSelected((pre: any) => (pre?.length ? pre?.filter((data: any) => data !== value) : []));
  };

  const handleDeleteToken = (value: any) => {
    const filteredValues = [...(values as Array<string>)]?.filter((data, i) => data !== value);
    const finalSelect = defaultEmptyValue && !filteredValues.length ? defaultEmptyValue : filteredValues;
    setValues(finalSelect);
  };

  const handleAdd = () => {
    const finalSelect = defaultEmptyValue && !selected.length ? defaultEmptyValue : selected;
    if (isReturnSelectedOption && !isMultiSelect) {
      const result = options.find((data) => (data as any)[checkParameter] === finalSelect) || {};
      setValues(finalSelect, result);
    } else {
      setValues(finalSelect);
    }

    handleClose();
  };

  const debounceSearchFun: Function = debounce(handleSearch, 500);

  return (
    <>
      <div className={classes.rootStyle} ref={anchorRef}>
        <InputField
          profileTokenList={optionsType === 'profileToken' ? localoptions : []}
          aria-controls={isOpen ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          inputProps={{ readOnly: true }}
          InputProps={{
            ...(isIcon &&
              renderIcon && {
                startAdornment: <InputAdornment position="start">{renderIcon}</InputAdornment>,
              }),
            endAdornment: (
              <InputAdornment
                className={
                  !disabled
                    ? isCalender || isRenderValueAsToken
                      ? classes.pointer
                      : isOpen
                      ? classes.rotateUp
                      : classes.rotateDown
                    : undefined
                }
                position="start"
                {...(handleEndAdornment
                  ? { onClick: handleEndAdornment }
                  : isRenderValueAsToken && !disabled
                  ? { onClick: handleOpen }
                  : {})}
              >
                {isCalender ? (
                  <CalendarIcon />
                ) : isRenderValueAsToken && Boolean(renderValue.length) ? (
                  <EditIcon />
                ) : (
                  <ArrowDown />
                )}
              </InputAdornment>
            ),
          }}
          {...{ label: placeholder }}
          {...(!disabled && !selectDisabled ? { onClick: handleOpen } : {})}
          fullWidth
          isReadOnly={isReadOnly}
          helperText={helperText}
          disabled={disabled}
          value={renderValue}
          renderValueAsToken={isRenderValueAsToken}
          renderValueAsTokenDeletable={renderValueAsTokenDeletable}
          handleDeleteToken={handleDeleteToken}
          isProfileToken={optionsType === 'profileToken'}
        />
      </div>
      {showMenu && (
        <Popper open={isOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
              <Paper className={`${classes.normalPaper} ${classes.normalMenuListStyle}`}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="menu-list-grow">
                    {options.map((option) => (
                      <MenuItem
                        className={`${classes.normalMenuItem} ${
                          (option as any)[checkParameter] === selected ? commonClass.body15Medium : commonClass.body15Regular
                        }`}
                        onClick={() => {
                          onSelect((option as any)[checkParameter]);
                        }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}

      {!showMenu && (
        <MUIDrawer
          anchor={position}
          headerTitle={headerTitle}
          open={isOpen}
          handleClose={handleClose}
          maxHeight={maxHeight || '100%'}
        >
          {isReadOnly ? (
            <div className={classes.readOnly}>
              <div className="noteMessage">You cannot change this status. This is automatically applied to this card</div>
            </div>
          ) : (
            <>
              {isSearch && (
                <div className={classes.searchWrapper}>
                  <SearchField autoFocus handleSearch={debounceSearchFun} placeholder="Search Item" />
                </div>
              )}
              {showSelectAll && (
                <div>
                  <Button
                    children={localoptions?.length === selected?.length ? 'De-select All' : 'Select All'}
                    variant="text"
                    size="large"
                    onClick={() => {
                      const result = localoptions?.map((data) => (data as any)[checkParameter]);
                      setSelected(localoptions?.length === selected?.length ? [] : result);
                    }}
                  />
                </div>
              )}
              {isMultiSelect && isToken && selected.length && extendTokenHeight ? (
                <div className={` ${extendTokenHeight && readMore ? classes.wrapperHeight : ''}`}>
                  <div
                    className={` ${classes.tokenWrapper} ${extendTokenHeight && readMore ? classes.fixedHeight : ''} 
                 ${extendTokenHeight && viewMore ? classes.fullHeight : ''} `}
                    ref={elementRef}
                  >
                    {Array.isArray(selected) &&
                      selected?.map((data, i) => {
                        if (defaultEmptyValue?.includes(data)) return;
                        return <Token label={data} key={i} {...(isTokenDeletable && { onDelete: () => handleDelete(data) })} />;
                      })}
                  </div>
                  {extendTokenHeight && (
                    <div className={classes.dflex}>
                      {selected.length > 1 ? (
                        <span className={`${classes.pointer} ${commonClass.caption12Medium}`} onClick={() => setSelected('')}>
                          Clear
                        </span>
                      ) : null}
                      {readMore ? (
                        <span className={`${commonClass.caption12Medium} ${classes.pointer}`} onClick={handleViewMore}>
                          {viewMore ? 'View Less' : 'View More'}
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>
              ) : null}
              {localOptionsLength ? (
                <ul className={classes.menuStyle}>
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <List
                        className={classes.listStyle}
                        tabIndex={-1}
                        data={localoptions}
                        width={width}
                        height={props.listAutoHeight ? localOptionsLength * 60 : localOptionsLength > 4 ? 250 : 300}
                        rowCount={localOptionsLength}
                        rowHeight={60}
                        rowRenderer={({ index, style }) => {
                          const item = localoptions[index];
                          const checked = isMultiSelect
                            ? selected.indexOf((item as any)[checkParameter]) > -1
                            : selected === (item as any)[checkParameter];

                          if (item?.hidden) return;

                          if (isMultiSelect && optionsType === 'profileToken') {
                            return (
                              <li
                                key={index}
                                className={`${classes.participantCard}`}
                                style={style}
                                onClick={() => {
                                  if (item?.customType) handleCustomType?.();
                                  else onSelect((item as any)[checkParameter]);
                                }}
                              >
                                <div className={classes.participantSelectContainer}>
                                  {item.userId ? (
                                    <CachedAvatar
                                      src={`${import.meta.env.VITE_DP_URL}${item?.userId}/profile-pic.png`}
                                      className={`${classes.profilePic}`}
                                    >
                                      {getNameInitials(item.label)}
                                    </CachedAvatar>
                                  ) : (
                                    <CachedAvatar className={classes.profilePic}>{getNameInitials(item.label)}</CachedAvatar>
                                  )}

                                  <div className={classes.participantDetails}>
                                    <div className={`${commonClass.caption12Medium} ${classes.truncate}`}>
                                      {item.profileLabel || item.label}
                                    </div>
                                    <div className={`${commonClass.sm10Regular} ${classes.truncate} ${classes.gray400}`}>
                                      {item.subLabel ? item.subLabel : ''}
                                    </div>
                                  </div>
                                </div>
                                {checked && (
                                  <div className={classes.participantCardAbove}>
                                    <div className={classes.checkboxContainer}>{<CheckIconThin />}</div>
                                  </div>
                                )}
                              </li>
                            );
                          } else {
                            return (
                              <li
                                key={index}
                                className={classes.menuListStyle}
                                style={style}
                                onClick={() => {
                                  if (item?.customType) handleCustomType?.();
                                  else onSelect((item as any)[checkParameter]);
                                }}
                              >
                                <div className={classes.labelStyle}>
                                  {item.icon && <span className="iconStyle">{item.icon}</span>}
                                  <span
                                    className={` ${checked ? commonClass.body15Medium : commonClass.body15Regular} textStyle`}
                                  >
                                    {item.label}
                                  </span>
                                </div>
                                {item?.customType || getListType({ optionsType, checked })}
                              </li>
                            );
                          }
                        }}
                      />
                    )}
                  </AutoSizer>
                </ul>
              ) : (
                <>
                  {props.isLoading && (optionsType === 'profileToken' || optionsType === 'radio') ? (
                    <MUISkeleton
                      variant={'rectangular'}
                      height={'100px'}
                      width={'90%'}
                      style={{ height: '48px', marginBottom: '22px', borderRadius: '48px' }}
                    />
                  ) : (
                    <div className={`${commonClass.body17Medium} ${classes.noResult}`}>No options</div>
                  )}
                </>
              )}
              {!isAutoOk ? (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleAdd}
                  disabled={optionsType === 'profileToken' && selected.length < 1}
                >
                  Add
                </Button>
              ) : null}
            </>
          )}
        </MUIDrawer>
      )}
    </>
  );
}

const getListType = ({ optionsType, checked }: any) => {
  switch (optionsType) {
    case 'checkbox':
      return <Checkbox checked={checked} />;
    case 'profileToken':
      return <Checkbox checked={checked} />;
    case 'radio':
      return <Radio checked={checked} />;
  }
};
