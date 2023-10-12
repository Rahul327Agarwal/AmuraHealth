import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { TenantIcon, TickIcon, VideoIcon } from '../../../SVGs/Common';
import {
  setDisabledButton,
  setStoreData,
  setUniqueId,
  setUniqueType,
} from './../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import Checkbox from './../../../LibraryComponents/MUICheckbox/MUICheckbox';
import MUIDrawer from './../../../LibraryComponents/MUIDrawer/MUIDrawer';
import Radio from './../../../LibraryComponents/MUIRadio/MUIRadio';
import SearchField from './../../../LibraryComponents/SearchField/SearchField';
import { sendMessageAPIChannel } from './Select.functions';
import { MenuListItemStyled, MenuListStyled, useStyles } from './Select.styles';
import { IProps } from './Select.types';

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
    onSelectClose,
    handleEndAdornment,
    helperText,
    parameter,
    showSelectAll,
    parentProps,
    postData,
    noSendAPI,
    Icontype,
  } = props;
  const isMultiSelect = optionsType === 'checkbox';
  const isIcon = Boolean(options && options.length > 0 && options[0].icon);
  const { classes } = useStyles({ ...props, isIcon });
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [localoptions, setLocaloptions] = useState(options);
  const [selected, setSelected] = useState(values);
  const [renderValue, setRenderValue] = useState(values);
  const [renderIcon, setRenderIcon] = useState(null);
  const checkParameter = parameter || 'value';
  const commonClasses = useCommonStyles();
  const uniqueId = useSelector((state: IRootState) => state.AllPostData.uniqueId);

  const dispatch = useDispatch();
  useEffect(() => {
    setLocaloptions(options);
  }, [options]);

  useEffect(() => {
    if (values) {
      setSelected(values);
      renderValueSelect(values);
    }
  }, [values, localoptions]);

  useEffect(() => {
    if (selected) {
      if (isAutoOk) handleAdd();
    }
  }, [selected, localoptions]);

  const renderValueSelect = (paramValue: any) => {
    if (!isMultiSelect) {
      const result = localoptions?.find((data: any) => data[parameter || 'value'] === paramValue);
      setRenderValue(result?.label);
      if (isIcon) setRenderIcon(result?.icon);
    } else {
      const result = localoptions
        ?.filter((data: any) => paramValue.includes(data[parameter || 'value']))
        ?.map((data) => data.label);
      setRenderValue(result?.join(', '));
    }
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    resetInput();
    setIsOpen(false);
    dispatch(setDisabledButton(false));
    onSelectClose && onSelectClose();
  };

  const handleSearch = (e: string) => {
    setSearch(e);
    const filtered = options.filter((v) => v.label.toLowerCase().includes(e.toLowerCase()));
    setLocaloptions(filtered);
  };

  const onSelect = (data: any) => {
    if (!isMultiSelect) return setSelected(data);
    setSelected((pre: any) => {
      const index = pre.indexOf(data);
      if (index === -1) return [...pre, data];
      pre.splice(index, 1);
      return [...pre];
    });
  };

  const handleDelete = (value: any) => {
    if (!isMultiSelect) return setSelected('');
    setSelected((pre: any) => (pre?.length ? pre?.filter((data: any) => data !== value) : []));
  };
  const resetInput = () => {
    dispatch(setStoreData({}));
    // dispatch(setUniqueId(""));
    dispatch(setDisabledButton(false));
  };
  const handleAdd = () => {
    // renderValueSelect(selected);
    if (!noSendAPI) {
      sendMessageAPIChannel(parentProps, selected, resetInput, uniqueId, postData);
      handleClose();
    }
    setIsOpen(false);
    setValues(selected);
  };
  return (
    <>
      <MUIDrawer anchor={position!} headerTitle={''} open={isOpen} handleClose={handleClose} handleOpen={handleOpen}>
        {isReadOnly ? (
          <div className={classes.readOnly}>
            <div className="noteMessage">You cannot change this status. This is automatically applied to this card</div>
            <Button variant="contained" size="large" onClick={handleClose}>
              Okay
            </Button>
          </div>
        ) : (
          <>
            <div className={classes.Container}>
              {
                <div className={`${commonClasses.body17Medium} ${classes.question}`}>
                  <span>{Icontype == 'tenant' ? <TenantIcon /> : <VideoIcon />}</span> <span>{headerTitle || ''}</span>
                </div>
              }

              <MenuListStyled {...props}>
                {localoptions.length ? (
                  localoptions?.map((item: any) => (
                    <MenuListItemStyled
                      key={item[parameter || 'value']}
                      {...props}
                      onClick={() => {
                        if (item?.customType) handleCustomType?.();
                        else onSelect(item[parameter || 'value']);
                      }}
                    >
                      <div className={classes.labelStyle}>
                        {item.icon && <span className="iconStyle">{item.icon}</span>}
                        <span className="textStyle">{item.label}</span>
                      </div>
                      {item?.customType ||
                        getListType({
                          optionsType,
                          item,
                          selected,
                          props,
                          checkParameter: parameter || 'value',
                        })}
                    </MenuListItemStyled>
                  ))
                ) : (
                  <div className={classes.noResult}>No options</div>
                )}
              </MenuListStyled>
              {!isAutoOk ? (
                <div className={classes.btnContainer}>
                  <Button
                    variant="contained"
                    size="medium"
                    fullWidth={false}
                    onClick={handleAdd}
                    startIcon={<TickIcon />}
                    disabled={selected.length === 0}
                  >
                    Proceed
                  </Button>
                </div>
              ) : null}
            </div>
            {optionsType == 'checkbox' && (
              <div className={classes.searchWrapper}>
                <SearchField handleSearch={handleSearch} placeholder="Select distribution channels" />
              </div>
            )}
          </>
        )}
      </MUIDrawer>
    </>
  );
}

const getListType = ({ optionsType, item, selected, props, checkParameter }: any) => {
  switch (optionsType) {
    case 'checkbox':
      return <Checkbox {...props} checked={selected.indexOf(item[checkParameter]) > -1} />;
    case 'radio':
      return <Radio {...props} checked={selected.indexOf(item[checkParameter]) > -1} />;
  }
};
