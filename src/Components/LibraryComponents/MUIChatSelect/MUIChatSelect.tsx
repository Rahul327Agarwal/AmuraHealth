import { debounce } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import {
  setDisabledaddBtnInList,
  setStoreData,
  setDisabledaddBtnInLMS,
  setDisabledaddBtnInPolls,
  setDisabledaddBtnInQMT,
} from '../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { IRootState } from '../../../DisplayFramework/State/store';
import { AutoSizer, List } from '../../../Utilities/AutoResizerWrapper';
import { DEFAULT_SNIPPETS, SNIPPETS_ID } from '../../PanelComponents/DistributionsManagement/Summary/Summary.function';
import { TickIcon } from '../../SVGs/Common';
import Button from '../MUIButton/MUIButton';
import Checkbox from '../MUICheckbox/MUICheckbox';
import MUIDrawer from '../MUIDrawer/MUIDrawer';
import Radio from '../MUIRadio/MUIRadio';
import Token from '../MUIToken/MUIToken';
import SearchField from '../SearchField/SearchField';
import { sendMessageAPIChannel } from './ChatSelect.functions';
import { useStyles } from './ChatSelect.styles';
import { IProps } from './ChatSelect.types';
const TenantIcon = 'Select a tenant';

export default function ChatSelect(props: IProps) {
  const {
    sessions,
    options,
    optionsType,
    isToken,
    isTokenDeletable,
    headerTitle,
    isSearch,
    position,
    values,
    setValues,
    isAutoOk,
    parameter,
    showSelectAll,
    onSearchAPICall,
    snippetId,
    noSendAPI,
    open,
    setOpen,
    onSelectClose,
    maxHeight,
    extendTokenHeight,
  } = props;

  const isMultiSelect = optionsType === 'checkbox';
  const isIcon = Boolean(options && options?.length > 0 && options[0].icon);
  const checkParameter = parameter || 'value';

  const { classes } = useStyles({ ...props, isIcon });
  const commonClass = useCommonStyles();
  const dispatch = useDispatch();
  const { uniqueId, tenantId, uniqueType, storeData } = useSelector((state: IRootState) => state.AllPostData);

  const [localoptions, setLocaloptions] = useState(options);
  const [selected, setSelected] = useState<any>('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [dataFetched, setDataFetched] = useState<any>(false);

  const isSearchValue = Boolean(searchValue.length > 2);

  useEffect(() => {
    setLocaloptions(options);
  }, [options]);

  useEffect(() => {
    if (snippetId) {
      setSelectedOptions([]);
      setSearchValue('');
      setSelected(isMultiSelect ? [] : '');
    }
  }, [snippetId]);

  // useEffect(() => {
  //   setSelected(values);
  // }, [values, options]);

  useEffect(() => {
    if (selected && isAutoOk && localoptions?.length) handleAdd();
  }, [selected]);

  const handleClose = () => {
    if (!isAutoOk) {
      resetInput();
      setSelected('');
    }
    setOpen?.(false);
    onSelectClose && onSelectClose();
  };
  const resetInput = () => {
    dispatch(setStoreData({}));
    dispatch(setDisabledaddBtnInList(false));
    dispatch(setDisabledaddBtnInLMS(false));
    dispatch(setDisabledaddBtnInPolls(false));
    dispatch(setDisabledaddBtnInQMT(false));
  };

  const handleSearch = async (e) => {
    setDataFetched(false);

    setSearchValue(e);
    if (onSearchAPICall && e.length > 2) {
      const options = await onSearchAPICall(e);

      if (options) {
        setLocaloptions(options);
      }
      //setDataFetched(true);
      return;
    }
    if (onSearchAPICall && !e.length) {
      setLocaloptions([]);
      return;
    }
    const filtered = options.filter((v) => {
      const search = e.toLowerCase();
      return v.label.toLowerCase().includes(search) || v[checkParameter].toLowerCase().includes(search);
    });

    setLocaloptions(filtered);
    //setDataFetched(true);
  };

  const onSelect = (data: string, item?: any) => {
    if (!isMultiSelect) return setSelected(data);
    setSelected((pre: any) => {
      let tempArray = JSON.parse(JSON.stringify(pre));
      const index = tempArray.indexOf(data);
      if (index === -1) return [...tempArray, data];
      tempArray.splice(index, 1);
      return [...tempArray];
    });
    setSelectedOptions((pre: any) => {
      let tempArray = JSON.parse(JSON.stringify(pre));
      const index = tempArray.findIndex((d1) => d1[checkParameter] === data);
      if (index === -1) return [...tempArray, item];
      tempArray.splice(index, 1);
      return [...tempArray];
    });
  };

  const handleDelete = (index) => {
    if (!isMultiSelect) return setSelected('');
    setSelected((pre: Array<any>) => {
      if (!pre) return [];
      return pre?.filter((_, i) => i !== index);
    });
    if (isToken) {
      setSelectedOptions((pre: Array<any>) => {
        if (!pre) return [];
        return pre?.filter((_, i) => i !== index);
      });
    }
  };

  const handleDeleteToken = (value) => {
    const filteredValues = [...(values as Array<string>)]?.filter((data, i) => data !== value);
    setValues(filteredValues);
  };

  const handleAdd = async () => {
    if (!noSendAPI) {
      const response = await sendMessageAPIChannel(sessions, selected, uniqueId, uniqueType, tenantId, storeData);
      if (response) {
        resetInput();
        handleClose();
      }
      setSelected('');
      return;
    }
    setValues(selected);
    setSelected('');
  };

  const debounceSearchFun: Function = debounce(handleSearch, 500);

  const optionsdata: Array<any> = useMemo(() => {
    if (!onSearchAPICall) {
      return localoptions;
    }
    if (!isSearchValue && selectedOptions.length) {
      return selectedOptions;
    }
    return localoptions;
  }, [localoptions, selectedOptions]);
  useEffect(() => {
    if (localoptions.length > 0 && selectedOptions?.length > 0) return setDataFetched(false);
    setDataFetched(true);
  }, [optionsdata]);

  return (
    <MUIDrawer anchor={position} open={open} handleClose={handleClose}>
      <div className={classes.Container}>
        <div className={`${commonClass.body17Medium} ${classes.question}`}>
          <span>{DEFAULT_SNIPPETS[headerTitle === TenantIcon ? 'tenant' : snippetId]?.iconChat || ''}</span>{' '}
          <span>{headerTitle || ''}</span>
        </div>
        {showSelectAll && (
          <div>
            <Button
              children={localoptions?.length === selected?.length ? 'De-select All' : 'Select All'}
              variant="text"
              size="large"
              onClick={() => {
                const result = localoptions?.map((data) => data[checkParameter]);
                setSelected(localoptions?.length === selected?.length ? [] : result);
              }}
            />
          </div>
        )}
        <div className={classes.OptionsContainer}>
          {isMultiSelect && isToken && selectedOptions?.length ? (
            <div className={classes.tokenWrapper}>
              {Array.isArray(selectedOptions) &&
                selectedOptions?.map((data, i) => {
                  // let originalLabel = selectedOptions.find((obj) => obj[checkParameter] === data[checkParameter]);
                  return <Token label={data.label} key={i} {...(isTokenDeletable && { onDelete: () => handleDelete(i) })} />;
                })}
            </div>
          ) : null}

          {optionsdata?.length ? (
            <ul className={classes.menuStyle}>
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    tabIndex={-1}
                    className={classes.listStyle}
                    data={optionsdata}
                    width={width}
                    height={maxHeight ? maxHeight : 300}
                    rowCount={optionsdata?.length}
                    rowHeight={60}
                    rowRenderer={({ index, style }) => {
                      const item = optionsdata[index];
                      const checked = isMultiSelect
                        ? selected.indexOf(item[checkParameter]) > -1
                        : selected === item[checkParameter];
                      return (
                        <li
                          key={index}
                          className={classes.menuListStyle}
                          style={style}
                          onClick={() => {
                            onSelect(item[checkParameter], item);
                          }}
                        >
                          <div className={classes.labelStyle}>
                            {item.icon && <span className="iconStyle">{item.icon}</span>}
                            <span className={`${commonClass.body15Regular} textStyle`}>{item.label}</span>
                          </div>
                          {getListType({ optionsType, checked })}
                        </li>
                      );
                    }}
                  />
                )}
              </AutoSizer>
            </ul>
          ) : (
            <div className={`${commonClass.body17Medium} ${classes.noResult}`}>
              {isSearchValue ? (dataFetched ? 'No options' : 'Loading..') : 'Search and select'}
            </div>
          )}
          {!isAutoOk ? (
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                size="medium"
                fullWidth={false}
                onClick={handleAdd}
                startIcon={<TickIcon />}
                disabled={selected?.length === 0}
              >
                Proceed
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      {isSearch && (
        <div className={classes.searchWrapper}>
          <SearchField
            autoFocus={true}
            value={searchValue}
            handleSearch={debounceSearchFun}
            placeholder={
              snippetId === SNIPPETS_ID.CONSUMERS || snippetId === SNIPPETS_ID.VIEW_ACCESS ? 'Enter to search' : 'Search Item'
            }
            customStyle={classes.searchField}
          />
        </div>
      )}
    </MUIDrawer>
  );
}

const getListType = ({ optionsType, checked }: any) => {
  switch (optionsType) {
    case 'checkbox':
      return <Checkbox checked={checked} />;
    case 'radio':
      return <Radio checked={checked} />;
  }
};
