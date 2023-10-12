import { useCallback, useEffect, useState } from 'react';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import InputField from '../../../LibraryComponents/InputField/InputField';
import MUISelect from '../../../LibraryComponents/MUISelect/MUISelect';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import { addGroupsAPICall, enableGroups } from './ManageGroup.function';
import { useStyles } from './ManageGroup.styles';
import { AddGroupProps } from './ManageGroup.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const ModifyGroup = (props: AddGroupProps) => {
  const { setAction, action, setGroupData, groupData, myListGroups } = props;
  const commonClass = useCommonStyles();
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const [title, setTitle] = useState('');
  const [shortName, setShortName] = useState('');
  const [titleError, setTitleError] = useState<string | undefined>(undefined);
  const [shortNameError, setShortNameError] = useState<string | undefined>(undefined);

  const [groupedBy, setGroupedBy] = useState('');
  const [isEdited, setEdited] = useState(false);

  // const isEdit=Object.keys(action.payload).length>0;
  useEffect(() => {
    if (action.payload.data) {
      setTitle(action.payload.data.groupName);
      setShortName(action.payload.data.shortName);
      setGroupedBy(action.payload.data.groupedBy);
      setEdited(true);
    }
  }, [action.payload]);

  const onTitleChange = useCallback((e) => {
    const value = e.target.value;
    setTitle(value);

    // check for isNameAlreadyExist (also accounts isEdited)
    if (myListGroups.length > 0) {
      const isNameAlreadyExist = myListGroups
        .filter((data) => data.groupId !== action.payload?.data?.groupId)
        .find((data, i) => {
          return data.groupName.toLowerCase().trim() === value.toLowerCase().trim();
        });
      if (isNameAlreadyExist) {
        setTitleError('Group name already exist');
      } else {
        setTitleError(undefined);
      }
    }
  }, []);

  const onshortNameChange = useCallback((e) => {
    const value = e.target.value;
    if (value.length > 2) {
      return;
    }
    setShortName(value);

    // check for isNameAlreadyExist (also accounts isEdited)
    if (myListGroups.length > 0) {
      const isNameAlreadyExist = myListGroups
        .filter((data) => data.groupId !== action.payload?.data?.groupId)
        .find((data, i) => {
          return data.shortName.toLowerCase().trim() === value.toLowerCase().trim();
        });
      if (isNameAlreadyExist) {
        setShortNameError('Short name already exist');
      } else {
        setShortNameError(undefined);
      }
    }
  }, []);

  const handleOnBack = () => {
    setAction({ screen: 'MANAGE_GROUP', payload: {} });
  };

  const GROUPBY_OPTIONS = [
    { label: 'Tenant', value: 'tenantId' },
    { label: 'Role', value: 'roleId' },
  ];
  const sortOption = myListGroups?.map((data) => data.groupedBy);
  let filterOptions;
  if (isEdited) {
    filterOptions = GROUPBY_OPTIONS?.filter((data) => {
      return data.value === action.payload.data.groupedBy || !sortOption.includes(data.value);
    });
  } else {
    filterOptions = GROUPBY_OPTIONS?.filter((data) => {
      return !sortOption.includes(data.value);
    });
  }

  const handleCreate = () => {
    // check for isNameAlreadyExist (also accounts isEdited)
    if (myListGroups.length > 0) {
      const isGroupNameExists = myListGroups
        .filter((data) => data.groupId !== action.payload?.data?.groupId)
        .find((data, i) => {
          return data.groupName.toLowerCase().trim() === title.toLowerCase().trim();
        });
      if (isGroupNameExists) {
        ErrorToaster('Group name already exist', panelId, 'error');
        return;
      }

      const isShortNameExists = myListGroups
        .filter((data) => data.groupId !== action.payload?.data?.groupId)
        .find((data, i) => {
          return data.shortName.toLowerCase().trim() === shortName.toLowerCase().trim();
        });
      if (isShortNameExists) {
        ErrorToaster('Short Name already exist', panelId, 'error');
        return;
      }

      if (isGroupNameExists || isShortNameExists) {
        return;
      }
    }

    if (isEdited) {
      setGroupData((pre) => [...pre.filter((data, index) => index != action.index), { groupName: title, groupBy: groupedBy }]);
      addGroupsAPICall(
        panelId,
        title,
        shortName,
        groupedBy,
        'UPDATE',
        action.payload.data.groupId,
        props.sessions?.user?.id,
        props.sessions
      );
    } else {
      addGroupsAPICall(panelId, title, shortName, groupedBy, 'ADD', '', props.sessions?.user?.id, props.sessions);
    }
    setAction({ screen: 'MANAGE_GROUP', payload: {} });
  };

  return (
    <div className={classes.wrapper}>
      <PageHeader handleBack={handleOnBack} headerContent={`${isEdited ? 'Update' : 'Add'} group`} />
      <div className={classes.groupModificationFieldWrapper}>
        <span className={`${classes.groupName} ${commonClass.body17Medium}`}>Group name</span>
        <InputField
          label="Enter Group Name"
          value={title}
          onChange={onTitleChange}
          helperText={titleError}
          error={titleError ? true : false}
        />
        <span className={`${classes.groupName} ${commonClass.body17Medium}`}>
          Short name <span className={classes.textLight}>(2 Characters) </span>
        </span>
        <InputField
          label="Enter short name for the group"
          value={shortName}
          onChange={onshortNameChange}
          helperText={shortNameError}
          error={shortNameError ? true : false}
        />

        <span className={`${classes.groupName} ${commonClass.body17Medium}`}>Grouped by</span>
        <MUISelect
          placeholder={'Select items'}
          label={'Select items'}
          customMenuProps={{
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            // className: classes.selectTimeStyle
          }}
          options={filterOptions}
          value={groupedBy}
          onChange={(e: any) => setGroupedBy(e.target.value)}
          labelId={'SELECT_TIME_VALUE'}
        />
        {title && groupedBy && (
          <span className={classes.textFooter}>
            The cards will be listed on your group "{title}" based on the above conditions
          </span>
        )}
      </div>
      {enableGroups(title, groupedBy, shortName) && (
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

export default ModifyGroup;
