import React, { useState, useEffect } from 'react';
import { IProps, ISummaryData } from './BulkSummary.types';
import { useStyles } from './BulkSummary.styles';
import { getSumnmaryData } from './BulkSummary.function';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import ProfileCard from '../SummaryPanel/ProfileCard';
import TopicCard from '../SummaryPanel/TopicCard';
import { useDFEvent } from '../../../DisplayFramework/Events/DFEvents';
import MUISkeleton from '../../LibraryComponents/MUISkeleton/MUISkeleton';
import { CardsToAssignIcon, ProcessingAssignmentIcon, AssignmentCompletedIcon } from './BulkSummary.svg';
import { getUserNameFromES } from '../../../Common/Common.functions';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const BulkSummary = (props: IProps) => {
  const childEventTrigger = useDFEvent();
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const commonClasses = useCommonStyles();
  const ref = React.useRef(null);
  const [summary, setSummary] = useState<ISummaryData>({} as any);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [Requester_Name, setRequester_Name] = useState('');
  const { patientId, selectedClient, registerEvent, unRegisterEvent, sessions, type } = props;
  const ICON_OBJECT = {
    'Cards to assign': CardsToAssignIcon,
    'Processing assignment': ProcessingAssignmentIcon,
    'Assignment completed': AssignmentCompletedIcon,
  };
  const onCardClick = (type) => {
    switch (type) {
      case 'readyToAssign':
        childEventTrigger('onReadyToAssignClick', {
          patientId: patientId,
          summaryData: summary,
          clickedSnippetIds: [type],
        });
    }
    setSelectedTopic(type);
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setActive(false);
    }
  };
  let refreshedData: any;
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    if (patientId) {
      (async () => {
        setIsLoading(true);
        const response = await getSumnmaryData(panelId, sessions, selectedClient.tenant_id, type, patientId);
        if (response) {
          setSummary(response);
        }
        setIsLoading(false);
      })();
    }
    //TO DO registerEvent//
    refreshedData = registerEvent(`${patientId}`, 'user-move-cards-status', (last_message) => {
      console.log('last_message refresh for bulk summary', last_message);
      if (last_message) {
        setSummary((pre) => ({
          ...pre,
          snippets: last_message,
        }));
      }
    });
    return () => {
      if (refreshedData) {
        unRegisterEvent(refreshedData);
      }
    };
  }, [patientId, selectedClient?.tenant_id]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let Requester_Name = await getUserNameFromES(summary?.staffId);
      setRequester_Name(Requester_Name);
      setIsLoading(false);
    })();
  }, [summary?.staffId]);

  return (
    <div className={classes.summaryPanelWrap}>
      {isLoading && (
        <>
          <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
          <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
          <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
          <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
          <MUISkeleton variant={'rectangular'} height={'100px'} style={{ margin: '5px 0px' }} />
        </>
      )}
      {!isLoading && (
        <>
          <PageHeader isClearAll={false} headerContent="Summary" handleClearAll={() => {}} paddingX="20px" />
          {summary?.userDeatails && (
            <ProfileCard
              userId={summary?.staffId || ''}
              data={{ ...summary, Synopsis: { ...summary?.userDeatails, name: Requester_Name, nick_name: Requester_Name } || {} }}
            />
          )}{' '}
          <hr className={classes.hrStyle}></hr>
          {summary?.totalCards && (
            <div className={classes.textCenter}>
              <span className={`${classes.sickLeave} ${commonClasses.body15Regular}`}>{summary?.totalCards}</span>
            </div>
          )}
          <div className={`${commonClasses.body14Regular} ${classes.description}`}>{summary?.description}</div>
          {summary?.snippets?.length > 0 &&
            summary.snippets?.map((each) => {
              return (
                <TopicCard
                  icon={ICON_OBJECT[each.title] || null}
                  heading={each.title}
                  description={each.description}
                  handleClick={() => {
                    onCardClick(each.id);
                  }}
                  selected={selectedTopic === each.title}
                />
              );
            })}
        </>
      )}
    </div>
  );
};

export default BulkSummary;
