import React, { useEffect, useState } from 'react';
import GroupList from './GroupList';
import { addGroupsAPICall } from './ManageGroup.function';
import { useStyles } from './ManageGroup.styles';
import { GroupPanelProps, IAction } from './ManageGroup.types';
import ModifyGroup from './ModifyGroup';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { registerEvent, unRegisterEvent } from '../../../../AppSync/AppSync.functions';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const ManageGroup = (props: GroupPanelProps) => {
  const { handleBack: handleScreenBack, setActiveGroup, myGroups, reportessListType, reporteesData, sessions } = props;
  const { classes } = useStyles(props);
  const { id: panelId } = useCurrentPanel();
  const [swipeIn, setSwipeIn] = useState(false);
  const [action, setAction] = useState<IAction>({ screen: 'MANAGE_GROUP', payload: {}, index: -1 });
  const [groupData, setGroupData] = useState([]);
  const goBack = useDFGoBack();
  let tabsSubscription;
  React.useEffect(() => {
    tabsSubscription = registerEvent(
      (reportessListType === 'REPOTEES_MYLIST' ? reporteesData?.staffId : sessions?.user?.id) || '',
      'ADDED_GROUPS',
      (updatedTabs) => {
        setGroupData(updatedTabs);
      }
    );
    return () => {
      if (tabsSubscription) unRegisterEvent(tabsSubscription);
    };
  }, []);

  const handleBack = () => {
    goBack('H');
    handleScreenBack('HOME');
  };

  useEffect(() => {
    setSwipeIn(true);
  }, []);

  const onSetActiveGroup = (value) => {
    // dispatch(setMyTabs(orderedTabs));
    setActiveGroup(value);
    handleBack();
  };

  const handleActionTab = (option, data, index) => {
    if (option == 'Edit') {
      setAction({ screen: 'ADDGROUP', payload: { data: data, allGroups: myGroups }, index: index });
    } else {
      addGroupsAPICall(
        panelId,
        data.groupName,
        data.shortName,
        data.groupedBy,
        'DELETE',
        data.groupId,
        props.sessions?.user?.id,
        props.sessions
      );
      // setGroupData((pre)=>[...pre.filter((data,ind)=>ind!=index)])
    }
  };
  const RenderDrawerComponent = () => {
    switch (action.screen) {
      case 'MANAGE_GROUP':
        return (
          <>
            <div className={classes.groupList}>
              <GroupList
                myListGroups={myGroups}
                setAction={setAction}
                action={action}
                groupData={groupData}
                handleActionTab={handleActionTab}
                handleBack={handleBack}
                onSetActiveGroup={onSetActiveGroup}
                reportessListType={reportessListType}
              />
            </div>
          </>
        );
      case 'ADDGROUP':
        return (
          <ModifyGroup
            {...props}
            setAction={setAction}
            action={action}
            setGroupData={setGroupData}
            groupData={groupData}
            myListGroups={myGroups}
          />
        );
    }
  };
  return (
    <div className={`${classes.rootContainer} ${swipeIn ? classes.swipeIn : classes.swipeOut}`}>
      <div className={`${classes.backdrop} ${swipeIn ? classes.backdropOpacityIn : classes.backdropOpacityOut}`}></div>
      <div className={classes.mainContainer}>{RenderDrawerComponent()}</div>
    </div>
  );
};

export default ManageGroup;
