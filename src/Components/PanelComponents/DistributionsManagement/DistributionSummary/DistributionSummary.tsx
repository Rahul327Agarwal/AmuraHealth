import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserNameFromES } from './../../../../Common/Common.functions';
import {
  setSnippetCloseTime,
  setSnippetStartTime,
  setStoreData,
  setUniqueId,
} from './../../../../DisplayFramework/State/Slices/AllPostsDataSlice';
import { IRootState } from './../../../../DisplayFramework/State/store';
import { API_ACTION_TYPE,  getSummaryDataByPostType } from '../DistributionsMgt.functions';
import { SNIPPETS } from './DistributionSummary.function';
import { DistributionSummaryProps } from './DistributionSummary.types';
import { postQuestionType } from '../../PostManagement/PostChatNote/PostChatNote.functions';
import Summary from '../Summary/Summary';
import { SNIPPETS_ID } from '../Summary/Summary.function';
import { useFetchUserName } from '../../../../Common/Common.hooks';

const DistributionSummary = (props: DistributionSummaryProps) => {
  const { injectComponent, cardData, selectedClient, registerEvent, unRegisterEvent } = props;

  const storeData = useSelector((state: IRootState) => state.AllPostData.storeData);
  const dispatch = useDispatch();
  const { uniqueType }: any = useSelector((state: IRootState) => state.AllPostData);

  const [selectedTopic, setSelectedTopic] = useState('');
  const [snippets, setSnippets] = useState((SNIPPETS as any)[uniqueType]);
  const [summaryData, setSummaryData] = useState<any>({});

  const { fetchMultipleUserNamesAsString } = useFetchUserName();

  let distributionChannel: any;
  useEffect(() => {
    callSummaryAPI();
    setSelectedTopic('');
    distributionChannel = registerEvent(`${selectedClient.client_id}`, 'myCollection.json', (updateSummary: any) => {
      updateObject(updateSummary);
    });
    return () => {
      if (distributionChannel) {
        unRegisterEvent(distributionChannel);
      }
    };
  }, [cardData]);

  useEffect(() => {
    if (!storeData.type) setSelectedTopic('');
  }, [storeData]);

  const callSummaryAPI = async () => {
    const response = await getSummaryDataByPostType(props, cardData);
    if (response) {
      setSummaryData(response);
      if ((SNIPPETS as any)[uniqueType] && response.topics) {
        const snippetsArray: any = [];
        for (let value of (SNIPPETS as any)[uniqueType]) {
          let topics = response?.topics?.[value.id];
          if (value.id === SNIPPETS_ID.CLOSING_TIME) {
            dispatch(setSnippetCloseTime(topics?.snippet[0]?.datetime || null));
          }
          if (value.id === SNIPPETS_ID.STARTING_TIME) {
            dispatch(setSnippetStartTime(topics?.snippet[0]?.datetime || null));
          }
          if ((value.id === SNIPPETS_ID.CONSUMERS || value.id === SNIPPETS_ID.VIEW_ACCESS) && topics) {
            const nameData = await fetchMultipleUserNamesAsString(topics?.snippet || []);
            // const nameData = await getEsDataforUsers(topics?.snippet);
            topics = { snippet: nameData };
            snippetsArray.push({ ...value, ...topics });
          } else if (topics) {
            snippetsArray.push({ ...value, ...topics });
          } else {
            snippetsArray.push(value);
          }
        }
        setSnippets(JSON.parse(JSON.stringify(snippetsArray)));
      }
    }
  };

  const updateObject = async (response: any) => {
    if (response) {
      let namedata = await getUserNameFromES(response?.header?.name);
      let newObj = {
        ...response,
        authorName: namedata || response?.header?.name,
      };
      setSummaryData(newObj);
      //setSummaryData(response);
      if ((SNIPPETS as any)[uniqueType] && response.topics) {
        const snippetsArray: any = [];
        for (let value of (SNIPPETS as any)[uniqueType]) {
          let topics = response?.topics?.[value.id];
          if (value.id === SNIPPETS_ID.CLOSING_TIME) {
            dispatch(setSnippetCloseTime(topics?.snippet[0]?.datetime || null));
          }
          if (value.id === SNIPPETS_ID.STARTING_TIME) {
            dispatch(setSnippetStartTime(topics?.snippet[0]?.datetime || null));
          }
          if ((value.id === SNIPPETS_ID.CONSUMERS || value.id === SNIPPETS_ID.VIEW_ACCESS) && topics) {
            // const nameData = await getEsDataforUsers(topics?.snippet);
            const nameData = await fetchMultipleUserNamesAsString(topics?.snippet || []);
            console.log('nameData', nameData);
            topics = { snippet: nameData };
            snippetsArray.push({ ...value, ...topics });
          } else if (topics) {
            snippetsArray.push({ ...value, ...topics });
          } else {
            snippetsArray.push(value);
          }
        }
        setSnippets(JSON.parse(JSON.stringify(snippetsArray)));
      }
    }
  };

  const handleSelectSnippet = (data: any) => {
    const { id, headerText, placeHolderText } = data;

    if (id && summaryData?.collectionId) {
      setSelectedTopic(id);

      const currentData = summaryData?.topics?.[id];
      if (currentData && JSON.stringify(currentData) !== '{}') {
        return handleReDo(currentData, headerText, id, placeHolderText);
      }
      const msgMapper = postQuestionType(id);
      const postDataTemp = {
        type: id,
        headerText,
        msgMapper,
        action: API_ACTION_TYPE.ADD,
        message: '',
        placeHolderText,
      };

      dispatch(setUniqueId(summaryData.collectionId));
      dispatch(setStoreData(postDataTemp));
    }
  };

  const handleReDo = (data: any, headerText: any, id: any, placeHolderText: any) => {
    if (id === SNIPPETS_ID.TENANT) return;
    const msgMapper = postQuestionType(id);
    const postDataRedo = {
      type: id,
      headerText,
      msgMapper,
      message: data?.snippet.toString() || '',
      action: API_ACTION_TYPE.OPEN_CONFIRM,
      placeHolderText,
    };
    dispatch(setUniqueId(summaryData?.collectionId));
    dispatch(setStoreData(postDataRedo));
  };

  return (
    <>
      <Summary
        injectComponent={injectComponent}
        handleSelectSnippet={handleSelectSnippet}
        selectedTopic={selectedTopic}
        authorName={summaryData?.authorName}
        lastUpdatedDate={summaryData?.header?.lastUpdatedDate}
        snippets={snippets}
      />
    </>
  );
};

export default DistributionSummary;
