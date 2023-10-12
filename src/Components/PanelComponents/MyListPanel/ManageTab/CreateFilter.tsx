import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { EmojiEmotionsOutlined } from '@mui/icons-material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { IRootState } from '../../../../DisplayFramework/State/store';
import InputField from '../../../LibraryComponents/InputField/InputField';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import { belongsToGC } from '../FilterCard/FilterCard.function';
import AddCriteria from './AddCriteria';
import { useStyles } from './ManageTab.styles';
import { EditDataTypes, ICreateFilter, ICriteriaClause } from './ManageTab.types';
import { TabCriteria, enableCreateFilter } from './ManagerTab.functions';

const CreateFilter = (props: ICreateFilter) => {
  const { statusOptions, editData, handleOnBack, handleOnSave } = props;
  const { roles, allRoles } = useSelector((state: IRootState) => state.displayFrameWork.loggedInUserInformation);

  const commonClass = useCommonStyles();
  const { classes } = useStyles(props);
  const [tabName, setTabName] = useState<string>('');
  const [enable, setEnable] = useState(false);
  const [criteria, setCriteriaData] = useState<Array<EditDataTypes>>([]);
  const [showEmotePopUp, setShowEmotePopUp] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [criteriaOptions, setCriteriaOptions] = useState<ICriteriaClause[]>(
    JSON.parse(JSON.stringify(TabCriteria.criteriaClauses))
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      // scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [criteria]);

  useEffect(() => {
    const tempCriteria: ICriteriaClause[] = JSON.parse(JSON.stringify(TabCriteria.criteriaClauses));
    // const roleIdIndex = tempCriteria.findIndex((data) => data.value === 'roleId');
    // const userRolesOptions = [];
    // roles?.forEach((r1) => {
    //   r1?.roles?.forEach((r2) => {
    //     userRolesOptions.push({ value: r2, label: `${r2}, ${r1.tenantId ?? ''}` });
    //   });
    // });
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
  }, [editData, allRoles]);

  useEffect(() => {
    if (editData) {
      setTabName(editData.tabName);
      setCriteriaData(editData.criteria);
      setEdit(true);
    }
  }, [editData]);

  useEffect(() => {
    let addanother = true;
    criteria.forEach((obj) => {
      if (obj.criteria === '' || obj.matchCriteria === '' || obj.value.length === 0) {
        addanother = false;
      }
    });
    setEnable(addanother);
  }, [criteria]);

  const onTabNameChange = useCallback((e) => {
    const value = e.target.value.trim() ? e.target.value : e.target.value.trim();
    setTabName(value);
  }, []);

  const toggleEmotePopUp = (event) => {
    event.stopPropagation();
    setShowEmotePopUp((prev) => !prev);
  };

  const handleEmojiSelect = (e) => {
    setTabName((prev) => prev + e.native);
    setShowEmotePopUp(false);
  };
  return (
    <div className={classes.createFilermainContainer}>
      <PageHeader
        customStyle={classes.headerCreateFilter}
        handleBack={handleOnBack}
        headerContent={`${isEdit ? 'Edit' : 'Create'} Filter`}
      />
      <div className={classes.scrollBodyCreateFilter} ref={scrollRef}>
        <span className={`${classes.groupName} ${commonClass.body17Medium}`}>Filter name</span>
        <div className={classes.tabNameWrapper}>
          <InputField label="Enter filter name" value={tabName} onChange={onTabNameChange} />
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
        <AddCriteria criteria={criteria} setCriteriaData={setCriteriaData} enable={enable} criteriaOptions={criteriaOptions} />
      </div>
      {enableCreateFilter(tabName, criteria) && (
        <PanelFooter
          paddingX="20px"
          leftButtonText={'Cancel'}
          righButtontText={isEdit ? 'Update' : 'Save'}
          handleLeftButton={handleOnBack}
          handleRightButton={() => handleOnSave({ tabName, criteria, isEdit })}
        />
      )}
    </div>
  );
};

export default CreateFilter;
