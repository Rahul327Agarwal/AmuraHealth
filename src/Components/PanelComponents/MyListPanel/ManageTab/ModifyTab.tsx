import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { EmojiEmotionsOutlined } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { IRootState } from '../../../../DisplayFramework/State/store';
import InputField from '../../../LibraryComponents/InputField/InputField';
import MUISelect from '../../../LibraryComponents/MUISelect/MUISelect';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import { AddCircleIcon, CloseIconDark } from '../../../SVGs/Common';
import { belongsToGC } from '../FilterCard/FilterCard.function';
import { useStyles } from './ManageTab.styles';
import { AddTabProps, CLAUSE_OPTIONS, DEFAULT_TABDATA, EditDataTypes, ICriteriaClause } from './ManageTab.types';
import { AddAnother, TabCriteria, addTabsAPICall, enableCreateTab, helperFunction } from './ManagerTab.functions';
import { DragIcon } from './ModifyTab.svg';
import { RenderCriteriaInput } from './RenderCriteriaInput';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const ModifyTab = (props: AddTabProps) => {
  const { setAction, action, setTabData, myListTabs, statusOptions } = props;
  const { roles, allRoles } = props.sessions.user;
  const commonClass = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const { classes } = useStyles(props);
  const [tabName, setTabName] = useState('');
  const [tabNameError, setTabNameError] = useState<string | undefined>(undefined);
  const [isEdited, setEdited] = useState(false);
  const [enable, setEnable] = useState(false);
  const [criteria, setCriteriaData] = useState<Array<EditDataTypes>>([{ ...DEFAULT_TABDATA }]);
  const [showEmotePopUp, setShowEmotePopUp] = useState(false);
  const [criteriaOptions, setCriteriaOptions] = useState(JSON.parse(JSON.stringify(TabCriteria.criteriaClauses)));
  const [dragDisabled, setDragDisabled] = useState(false);

  useEffect(() => {
    if (action.payload.data) {
      setTabName(action.payload.data.tabName);
      setCriteriaData(action.payload.data.criteria);
      setEdited(true);
    }
  }, [action.payload]);

  const onTabNameChange = useCallback((e) => {
    const value = e.target.value.trim() ? e.target.value : e.target.value.trim();
    setTabName(value);

    // check for isNameAlreadyExist (also accounts isEdited)
    if (myListTabs.length > 0) {
      const isNameAlreadyExist = myListTabs
        .filter((data) => data.tabId !== action.payload?.data?.tabId)
        .find((data, i) => {
          return data.tabName.toLowerCase().trim() === e.target.value.toLowerCase().trim();
        });
      if (isNameAlreadyExist) {
        setTabNameError('Tab name already exist');
      } else {
        setTabNameError(undefined);
      }
    }
  }, []);

  // const onTimeChange = useCallback((time) => setTime(time), []);
  const deleteCard = (index) => {
    setCriteriaData([
      ...criteria
        .filter((_, idx) => idx !== index)
        .map((criteria, index) => ({ ...criteria, clause: index === 0 ? '' : criteria.clause })),
    ]);
  };

  const handleOnBack = () => {
    setAction({ screen: 'TAB_PANEL', payload: {} });
  };

  useEffect(() => {
    const tempCriteria: ICriteriaClause[] = JSON.parse(JSON.stringify(TabCriteria.criteriaClauses));
    // const roleIdIndex = tempCriteria.findIndex((data) => data.value === 'roleId');
    const userRolesOptions = [];
    roles?.forEach((r1) => {
      r1?.roles?.forEach((r2) => {
        userRolesOptions.push({ value: r2, label: `${r2}, ${r1.tenantId ?? ''}` });
      });
    });
    // const ROLE_OPTIONS: ICriteriaClause = {
    //   value: 'roleId',
    //   label: 'Role Id',
    //   options: userRolesOptions,
    //   clause: [
    //     { label: 'is', value: 'is', type: 'SELECT' },
    //     { label: 'is not', value: 'isNot', type: 'SELECT' },
    //     { label: 'Is any of', value: 'isAnyOf', type: 'MULTISELECT' },
    //     { label: 'Is none of', value: 'isNoneOf', type: 'MULTISELECT' },
    //   ],
    // };
    // if (roleIdIndex >= 0) {
    //   tempCriteria[roleIdIndex] = ROLE_OPTIONS;
    // } else {
    //   tempCriteria.push(ROLE_OPTIONS);
    // }

    if (belongsToGC((allRoles || []).join(', '))) {
      const statusIndex = tempCriteria.findIndex((data) => data.value === 'status');
      const STATUS_OPTION: ICriteriaClause = {
        value: 'status',
        label: 'Status',
        options: statusOptions,
        clause: [
          { label: 'is', value: 'is', type: 'SELECT' },
          { label: 'is not', value: 'isNot', type: 'SELECT' },
          { label: 'Is any of', value: 'isAnyOf', type: 'MULTISELECT' },
          { label: 'Is none of', value: 'isNoneOf', type: 'MULTISELECT' },
        ],
      };
      if (statusIndex >= 0) {
        tempCriteria[statusIndex] = STATUS_OPTION;
      } else {
        tempCriteria.push(STATUS_OPTION);
      }
    }
    TabCriteria.criteriaClauses = tempCriteria;
    setCriteriaOptions(tempCriteria);
  }, [action, allRoles]);

  // code to enable/diable button based on card data value.
  useEffect(() => {
    let addanother = true;
    criteria.forEach((obj) => {
      if (obj.criteria === '' || obj.matchCriteria === '' || obj.value?.length === 0) {
        addanother = false;
      }
    });
    setEnable(addanother);
  }, [criteria]);
  let hideDrag = document.querySelector('#dragDrop') as HTMLElement | null;

  // const onDragStart= ()=>{
  //   hideDrag.style.overflow = 'hidden';
  // }
  const onDragEnd = (result) => {
    // hideDrag.style.overflow = 'visible';

    // let tempCriteria = JSON.parse(JSON.stringify(criteria));
    let tempCriteria = [];
    criteria.forEach((data) => {
      tempCriteria.push(data);
    });
    // setCriteriaData([...tempCriteria]);
    setCriteriaData((prev) => {
      const tempCriteria = JSON.parse(JSON.stringify(prev));
      if (!result.destination) return prev;
      if (result.destination.index === result.source.index) return prev;
      const sourceData = tempCriteria[result.source.index];
      let sourceClause = sourceData.clause;
      const destinationData = tempCriteria[result.destination.index];
      let destinationClause = destinationData.clause;

      tempCriteria.splice(result.destination.index, 1, { ...sourceData, clause: destinationClause });
      tempCriteria.splice(result.source.index, 1, { ...destinationData, clause: sourceClause });

      return tempCriteria;
    });
  };
  const handleChange = (arrayIndex, fieldName, value) => {
    helperFunction(arrayIndex, fieldName, value, criteria, setCriteriaData);
  };

  const handleCreate = () => {
    // check for isNameAlreadyExist
    if (myListTabs.length > 0) {
      const isNameAlreadyExist = myListTabs
        .filter((data) => data.tabId !== action.payload?.data?.tabId)
        .find((data) => data.tabName.toLowerCase().trim() === tabName.toLowerCase().trim());
      if (isNameAlreadyExist) {
        ErrorToaster('Tab name already exist', panelId, 'error');
        return;
      }
    }

    if (isEdited) {
      setTabData((pre) => {
        return pre.map((data) => {
          if (data.tabId === action.payload.data.tabId) {
            return {
              ...data,
              tabName: tabName,
              criteria: criteria,
            };
          } else {
            return data;
          }
        });
      });
      addTabsAPICall(
        panelId,
        tabName,
        action.payload.data.sortingOrder,
        criteria,
        'UPDATE',
        action.payload.data.tabId,
        props.sessions?.user?.id,
        props.sessions,
        setAction
      );
    } else {
      addTabsAPICall(
        panelId,
        tabName,
        action.payload.orderedTabs.length,
        criteria,
        'ADD',
        '',
        props.sessions?.user?.id,
        props.sessions,
        setAction
      );
    }
  };

  const toggleEmotePopUp = (event) => {
    event.stopPropagation();
    setShowEmotePopUp((prev) => !prev);
  };

  const handleEmojiSelect = (e) => {
    let newTab = tabName + e.native;
    setTabName(newTab);
    if (myListTabs.length > 0) {
      const isNameAlreadyExist = myListTabs
        .filter((data) => data.tabId !== action.payload?.data?.tabId)
        .find((data, i) => {
          return data.tabName.toLowerCase() === newTab.toLowerCase();
        });
      if (isNameAlreadyExist) {
        setTabNameError('Tab name already exist');
      } else {
        setTabNameError(undefined);
      }
    }
    setShowEmotePopUp(false);
  };
  return (
    <div className={classes.modifyWrapper}>
      <PageHeader handleBack={handleOnBack} headerContent={`${isEdited ? 'Update' : 'Add'} Tab`} />
      <div className={classes.scrollBody}>
        <span className={`${classes.groupName} ${commonClass.body17Medium}`}>Tab name</span>
        <div className={classes.tabNameWrapper}>
          <InputField
            label="Enter Tab Name"
            value={tabName}
            onChange={onTabNameChange}
            helperText={tabNameError}
            error={tabNameError ? true : false}
          />
          <div onClick={toggleEmotePopUp} style={{ color: 'black', cursor: 'pointer' }}>
            <EmojiEmotionsOutlined />
          </div>
        </div>
        {showEmotePopUp && (
          <div className={classes.emotePopUpWrapper}>
            <Picker
              data={data}
              previewPosition="none"
              onEmojiSelect={handleEmojiSelect}
              onClickOutside={() => setShowEmotePopUp(false)}
              skinTonePosition={'none'}
              theme={'light'}
              navPosition={'none'}
            />
          </div>
        )}
        <span className={`${classes.groupName} ${commonClass.body17Medium}`}>Criteria</span>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tabs-droppable" direction="vertical">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {criteria?.map((data, index) => (
                  <Draggable draggableId={data.id} key={data.id} index={index} isDragDisabled={dragDisabled}>
                    {(provided) => (
                      <div
                        className={'draggableStyle'}
                        key={data.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className={classes.criteriaWrapper}>
                          <div className={classes.spaceBetween}>
                            <div className={classes.dropdowndiv}>
                              {index === 0 ? (
                                <span className={`${classes.subTitle} ${commonClass.body15Regular}`}>Where</span>
                              ) : (
                                <MUISelect
                                  options={CLAUSE_OPTIONS}
                                  value={criteria[index]?.clause || 'and'}
                                  onChange={(e: any) => handleChange(index, 'clause', e.target.value)}
                                  labelId={'Choose a tag'}
                                />
                              )}
                            </div>
                            <div className={classes.endIcons}>
                              {index !== 0 && (
                                <div className={classes.closeIcons} onClick={() => deleteCard(index)}>
                                  <CloseIconDark />
                                </div>
                              )}
                              <div>
                                <DragIcon />
                              </div>
                            </div>
                          </div>
                          <MUISelect
                            placeholder={'Select criteria'}
                            label={'Select criteria'}
                            options={criteriaOptions}
                            value={criteria[index]?.criteria}
                            onChange={(e: any) => handleChange(index, 'criteria', e.target.value)}
                            labelId={'CRITERIA'}
                          />

                          {criteria[index]?.criteria && (
                            <MUISelect
                              placeholder={'Select match criteria'}
                              label={'Select match criteria'}
                              options={criteria[index]?.matchCriteriaOptions}
                              value={criteria[index]?.matchCriteria}
                              onChange={(e: any) => handleChange(index, 'matchCriteria', e.target.value)}
                              labelId={'MATCHING_CRITERIA'}
                            />
                          )}

                          {criteria[index]?.criteria && (
                            <RenderCriteriaInput
                              matchCriteria={criteria[index]?.type}
                              cardData={criteria}
                              index={index}
                              options={criteria[index]?.option}
                              handleChange={handleChange}
                              dragDisabled={dragDisabled}
                              setDragDisabled={setDragDisabled}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {enable && (
          <div
            className={`${classes.addText} ${commonClass.caption12Medium}`}
            onClick={() => {
              AddAnother(criteria, setCriteriaData);
            }}
          >
            {<AddCircleIcon />} Add another criteria
          </div>
        )}
        {/* <AddCriteria criteria={criteria} setCriteriaData={setCriteriaData} enable={enable} criteriaOptions={criteriaOptions} /> */}
      </div>
      {enableCreateTab(tabName, criteria) && (
        <PanelFooter
          paddingX="20px"
          customStyle={classes.footerStyle}
          leftButtonText={'Cancel'}
          righButtontText={isEdited ? 'Update' : 'Create'}
          handleLeftButton={handleOnBack}
          handleRightButton={handleCreate}
        />
      )}
    </div>
  );
};

export default ModifyTab;
