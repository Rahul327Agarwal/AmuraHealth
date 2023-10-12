import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { ResponseNewIcon, TenantIcon, TickIcon, VideoIcon } from '../PostManagement.svg';
import { PLACEHOLDER_TEXT } from '../Summary/PostManagementSummary.function';
import {
  setDisabledButton,
  setPostId,
  setPostMsgData,
  setResponseType,
} from './../../../../DisplayFramework/State/Slices/PostSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import Checkbox from './../../../LibraryComponents/MUICheckbox/MUICheckbox';
import MUIDrawer from './../../../LibraryComponents/MUIDrawer/MUIDrawer';
import Radio from './../../../LibraryComponents/MUIRadio/MUIRadio';
import SearchField from './../../../LibraryComponents/SearchField/SearchField';
import { sendMessageAPIChannel } from './Select.functions';
import { MenuListItemStyled, MenuListStyled, useStyles } from './Select.styles';
import { IProps } from './Select.types';

const ICON_OBJECT = {
  distributionChannel: <VideoIcon />,
  response: <ResponseNewIcon />,
  tenantIcon: <TenantIcon />,
};

export default function Select(props: IProps) {
  const {
    isReadOnly,
    options,
    optionsType,
    headerTitle,
    isSearch,
    position,
    values,
    setValues,
    isAutoOk,
    handleCustomType,
    parameter,
    parentProps,
    rawPostData,
    onSelectClose,
    Icontype,
    noSendAPI,
  } = props;
  const isMultiSelect = optionsType === 'checkbox';
  const isIcon = Boolean(options && options.length > 0 && options[0].icon);
  const { classes } = useStyles({ position, isIcon });
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [localoptions, setLocaloptions] = useState(options);
  const [selected, setSelected] = useState(values);
  const [renderValue, setRenderValue] = useState(values);
  const [renderIcon, setRenderIcon] = useState(null);
  const checkParameter = parameter || 'value';
  const commonClasses = useCommonStyles();
  const postId = useSelector((state: IRootState) => state.post.postId);
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

  const renderValueSelect = (paramValue) => {
    if (!isMultiSelect) {
      const result = localoptions?.find((data) => data[parameter || 'value'] === paramValue);
      setRenderValue(result?.label);
      if (isIcon) setRenderIcon(result?.icon);
    } else {
      const result = localoptions?.filter((data) => paramValue.includes(data[parameter || 'value']))?.map((data) => data.label);
      setRenderValue(result?.join(', '));
    }
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    resetInput();
    onSelectClose && onSelectClose();
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    setSearch(e);
    const filtered = options.filter((v) => v.label.includes(e));
    setLocaloptions(filtered);
  };

  const onSelect = (data) => {
    if (!isMultiSelect) return setSelected(data);
    setSelected((pre: any) => {
      const index = pre.indexOf(data);
      if (index === -1) return [...pre, data];
      pre.splice(index, 1);
      return [...pre];
    });
  };

  const handleDelete = (value) => {
    if (!isMultiSelect) return setSelected('');
    setSelected((pre: any) => (pre?.length ? pre?.filter((data) => data !== value) : []));
  };
  const resetInput = () => {
    dispatch(setPostMsgData({}));
    dispatch(setPostId(''));
    dispatch(setResponseType(''));
    dispatch(setDisabledButton(false));
  };
  const handleAdd = () => {
    // renderValueSelect(selected);
    if (!noSendAPI) {
      if (rawPostData.type === 'response') {
        if (selected !== 'textField') {
          let postDataTemp = {
            type: 'response',
            headerText: 'Enter options in tilde separated',
            msgMapper: 'QUESTION_ANSWER',
            action: rawPostData?.action,
            message: '',
            placeHolderText: PLACEHOLDER_TEXT['response'],
          };
          dispatch(setPostMsgData(postDataTemp));
          dispatch(setResponseType(selected));
          setIsOpen(false);
        } else {
          sendMessageAPIChannel(parentProps, selected, resetInput, postId, rawPostData);
          setValues(selected);
          handleClose();
        }
      } else {
        sendMessageAPIChannel(parentProps, selected, resetInput, postId, rawPostData);
        setValues(selected);
        handleClose();
      }
    }
    setIsOpen(false);
    setValues(selected);
  };
  return (
    <>
      <MUIDrawer anchor={position} headerTitle={''} open={isOpen} handleClose={handleClose} handleOpen={handleOpen}>
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
                  <span>{ICON_OBJECT[rawPostData?.type || Icontype] || ''}</span>{' '}
                  <span>{rawPostData?.headerText || headerTitle || ''}</span>
                </div>
              }

              <MenuListStyled {...props}>
                {localoptions.length ? (
                  localoptions?.map((item) => (
                    <MenuListItemStyled
                      key={item[parameter || 'value']}
                      {...props}
                      onClick={() => {
                        if (item?.customType) handleCustomType();
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
            {isSearch && (
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

const getListType = ({ optionsType, item, selected, props, checkParameter }) => {
  switch (optionsType) {
    case 'checkbox':
      return <Checkbox {...props} checked={selected.indexOf(item[checkParameter]) > -1} />;
    case 'radio':
      return <Radio {...props} checked={selected.indexOf(item[checkParameter]) > -1} />;
  }
};
// export default function Select(props: IProps) {
//   const {
//     isReadOnly,
//     options,
//     optionsType,
//     isToken,
//     isTokenDeletable,
//     headerTitle,
//     isSearch,
//     position,
//     values,
//     setValues,
//     placeholder,
//     isAutoOk,
//     handleCustomType,
//     isCalender,
//     handleEndAdornment,
//     helperText,
//     parameter,
//     showSelectAll,
//     parentProps,
//     rawPostData,
//     onSelectClose,
//     Icontype,
//     noSendAPI,
//   } = props;
//   const isMultiSelect = optionsType === "checkbox";
//   const isIcon = Boolean(options && options.length > 0 && options[0].icon);
//   const { classes } = useStyles({ position, isIcon });
//   const [isOpen, setIsOpen] = useState(true);
//   const [search, setSearch] = useState("");
//   const [localoptions, setLocaloptions] = useState(options);
//   const [selected, setSelected] = useState(values);
//   const [renderValue, setRenderValue] = useState(values);
//   const [renderIcon, setRenderIcon] = useState(null);
//   const checkParameter = parameter || "value";
//   const commonClasses = useCommonStyles();
//   const postId = useSelector((state: IRootState) => state.post.postId);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     setLocaloptions(options);
//   }, [options]);

//   useEffect(() => {
//     if (values) {
//       setSelected(values);
//       renderValueSelect(values);
//     }
//   }, [values, localoptions]);

//   useEffect(() => {
//     if (selected) {
//       if (isAutoOk) handleAdd();
//     }
//   }, [selected, localoptions]);

//   const renderValueSelect = (paramValue: any) => {
//     if (!isMultiSelect) {
//       const result = localoptions?.find(
//         (data) => (data as any)[parameter || "value"] === paramValue
//       );
//       setRenderValue(result?.label);
//       if (isIcon) setRenderIcon(result?.icon);
//     } else {
//       const result = localoptions
//         ?.filter((data) =>
//           paramValue.includes((data as any)[parameter || "value"])
//         )
//         ?.map((data) => data.label);
//       setRenderValue(result?.join(", "));
//     }
//   };

//   const handleOpen = () => setIsOpen(true);
//   const handleClose = () => {
//     resetInput();
//     onSelectClose && onSelectClose();
//     setIsOpen(false);
//   };

//   const handleSearch = (e: any) => {
//     setSearch(e);
//     const filtered = options.filter((v) => v.label.includes(e));
//     setLocaloptions(filtered);
//   };

//   const onSelect = (data: any) => {
//     if (!isMultiSelect) return setSelected(data);
//     setSelected((pre: any) => {
//       const index = pre.indexOf(data);
//       if (index === -1) return [...pre, data];
//       pre.splice(index, 1);
//       return [...pre];
//     });
//   };

//   const handleDelete = (value: any) => {
//     if (!isMultiSelect) return setSelected("");
//     setSelected((pre: any) =>
//       pre?.length ? pre?.filter((data: any) => data !== value) : []
//     );
//   };
//   const resetInput = () => {
//     dispatch(setPostMsgData({}));
//     dispatch(setPostId(""));
//     dispatch(setResponseType(""));
//     dispatch(setDisabledButton(false));
//   };
//   const handleAdd = () => {
//     // renderValueSelect(selected);
//     if (!noSendAPI) {
//       if (rawPostData.type === "response") {
//         if (selected !== "textField") {
//           let postDataTemp = {
//             type: "response",
//             headerText: "Enter options in comma separated",
//             msgMapper: "QUESTION_ANSWER",
//             action: rawPostData?.action,
//             message: "",
//             placeHolderText: PLACEHOLDER_TEXT["response"],
//           };
//           dispatch(setPostMsgData(postDataTemp));
//           dispatch(setResponseType(selected));
//           setIsOpen(false);
//         } else {
//           sendMessageAPIChannel(
//             parentProps,
//             selected,
//             resetInput,
//             postId,
//             rawPostData
//           );
//           setValues(selected);
//           handleClose();
//         }
//       } else {
//         sendMessageAPIChannel(
//           parentProps,
//           selected,
//           resetInput,
//           postId,
//           rawPostData
//         );
//         setValues(selected);
//         handleClose();
//       }
//     }
//     setIsOpen(false);
//     setValues(selected);
//   };
//   return (
//     <>
//       <MUIDrawer
//         anchor={position!}
//         headerTitle={""}
//         open={isOpen}
//         handleClose={handleClose}
//         handleOpen={handleOpen}
//       >
//         {isReadOnly ? (
//           <div className={classes.readOnly}>
//             <div className="noteMessage">
//               You cannot change this status. This is automatically applied to
//               this card
//             </div>
//             <Button variant="contained" size="large" onClick={handleClose}>
//               Okay
//             </Button>
//           </div>
//         ) : (
//           <>
//             <div className={classes.Container}>
//               {
//                 <div
//                   className={`${commonClasses.body17Medium} ${classes.question}`}
//                 >
//                   <span>
//                     {(ICON_OBJECT as any)[rawPostData?.type || Icontype] || ""}
//                   </span>{" "}
//                   <span>{rawPostData?.headerText || headerTitle || ""}</span>
//                 </div>
//               }

//               <MenuListStyled {...props}>
//                 {localoptions.length ? (
//                   localoptions?.map((item) => (
//                     <MenuListItemStyled
//                       key={(item as any)[parameter || "value"]}
//                       {...props}
//                       onClick={() => {
//                         if (item?.customType) handleCustomType?.();
//                         else onSelect((item as any)[parameter || "value"]);
//                       }}
//                     >
//                       <div className={classes.labelStyle}>
//                         {item.icon && (
//                           <span className="iconStyle">{item.icon}</span>
//                         )}
//                         <span className="textStyle">{item.label}</span>
//                       </div>
//                       {item?.customType ||
//                         getListType({
//                           optionsType,
//                           item,
//                           selected,
//                           props,
//                           checkParameter: parameter || "value",
//                         })}
//                     </MenuListItemStyled>
//                   ))
//                 ) : (
//                   <div className={classes.noResult}>No options</div>
//                 )}
//               </MenuListStyled>
//               {!isAutoOk ? (
//                 <div className={classes.btnContainer}>
//                   <Button
//                     variant="contained"
//                     size="medium"
//                     fullWidth={false}
//                     onClick={handleAdd}
//                     startIcon={<TickIcon />}
//                     disabled={selected.length === 0}
//                   >
//                     Proceed
//                   </Button>
//                 </div>
//               ) : null}
//             </div>
//             {isSearch && (
//               <div className={classes.searchWrapper}>
//                 <SearchField
//                   handleSearch={handleSearch}
//                   placeholder="Select distribution channels"
//                 />
//               </div>
//             )}
//           </>
//         )}
//       </MUIDrawer>
//     </>
//   );
// }

// const getListType = ({
//   optionsType,
//   item,
//   selected,
//   props,
//   checkParameter,
// }: any) => {
//   switch (optionsType) {
//     case "checkbox":
//       return (
//         <Checkbox
//           {...props}
//           checked={selected.indexOf(item[checkParameter]) > -1}
//         />
//       );
//     case "radio":
//       return (
//         <Radio
//           {...props}
//           checked={selected.indexOf(item[checkParameter]) > -1}
//         />
//       );
//   }
// };
