import { useEffect, useState } from 'react';
import { registerEvent, unRegisterEvent } from '../../../../AppSync/AppSync.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { cardData } from '../NotesBrowse.types';
import NotesCard from '../NotesCard/NotesCard';
import { getcurrentUserdata } from '../NotesCard/NotesCard.functions';
import { getHistoryNoteData } from './NoteHistory.functions';
import { useStyles } from './NoteHistory.styles';
import { IProps } from './NoteHistory.types';
import { useFetchUserName } from '../../../../Common/Common.hooks';

const NoteHistory = (props: IProps) => {
  const { mainCardData, mainCardUser, parentprop, selectedCard, handleOnCardClick, handleDeactivate, handleNoteEdit } = props;
  const [historyNoteData, setHistoryNoteData] = useState<Array<cardData>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userNames, setUserNames] = useState({});
  const { classes } = useStyles(mainCardData);
  const CommonStyles = useCommonStyles();
  const { fetchMultipleUserNames } = useFetchUserName();
  let historySubscription: any;

  useEffect(() => {
    (async () => {
      let userIds = historyNoteData.map((notedata) => notedata?.updatedBy);
      let usernamesObject = await fetchMultipleUserNames([...new Set(userIds)]);
      setUserNames(usernamesObject);
    })();
  }, [historyNoteData]);

  useEffect(() => {
    (async () => {
      const summaryResponse = await getHistoryNoteData(parentprop, mainCardData?.sort_key);
      if (summaryResponse) {
        setIsLoading(true);
        setHistoryNoteData(
          summaryResponse?.notesHistory
            ?.filter((notedata: any) => notedata?.isActive === 1)
            .sort((a: any, b: any) => {
              return new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime();
            }) || []
        );
        setIsLoading(false);
      }
    })();
    historySubscription = registerEvent(`${mainCardData?.sort_key}`, 'pms-ql-chatNotesHistoy', () => {
      getHistoryNoteData(parentprop, mainCardData?.sort_key).then((summaryResponse) => {
        if (summaryResponse) {
          setIsLoading(true);
          setHistoryNoteData(
            summaryResponse?.notesHistory
              ?.filter((notedata: any) => notedata?.isActive === 1)
              .sort((a: any, b: any) => new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime()) || []
          );
          setIsLoading(false);
        }
      });
    });

    // updatednotesdata = registerEvent(`${selectedClient.tenant_id}/${selectedClient.client_id}`, 'pms-ql-chatNotes', () => {
    //   getNoteData(parentprop).then((summaryResponse) => {
    //     if (!summaryResponse.Error) {
    //       setCardData(summaryResponse);
    //     }
    //   });
    // });
    return () => {
      // if (updatednotesdata) {
      //   unRegisterEvent(updatednotesdata);
      // }
      if (historySubscription) {
        unRegisterEvent(historySubscription);
      }
    };
  }, [mainCardData]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.cursorPointer} data-openedCard={selectedCard.includes(mainCardData.sort_key)}>
        <NotesCard
          handleNoteEdit={handleNoteEdit}
          caller={mainCardData.privacy}
          data={mainCardData}
          handleOnCardClick={(cardData) => handleOnCardClick(cardData?.sort_key)}
          expand={selectedCard.includes(mainCardData.sort_key) ? true : false}
          showEditIcon={selectedCard.includes(mainCardData.sort_key) ? true : false}
          handleDeactivate={handleDeactivate}
          userName={mainCardUser}
        />
      </div>
      <div>
        {selectedCard.includes(mainCardData.sort_key) &&
          Object.keys(userNames).length > 0 &&
          historyNoteData?.map((ele: any) => (
            <NotesCard
              handleNoteEdit={handleNoteEdit}
              userName={userNames[ele?.updatedBy]}
              caller={ele?.privacy}
              data={{ ...ele, isHisory: true, isActive: mainCardData.isActive }}
              handleOnCardClick={() => {}}
              expand={true}
            />
          ))}
      </div>
    </div>
  );
};

export default NoteHistory;
