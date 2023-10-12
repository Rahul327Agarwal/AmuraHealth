import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { IRootState } from '../../../../../../DisplayFramework/State/store';
import { PMS_S3 } from '../../../../../../Utils';
import { SendIcon } from '../../../../../SVGs/Common';
import Button from '../../../../../LibraryComponents/MUIButton/MUIButton';
import MUIDrawer from '../../../../../LibraryComponents/MUIDrawer/MUIDrawer';
import Select from '../../../../../LibraryComponents/Select/Select';
import { SUREVEY_TYPES, getCollectionLists, validateSurveyData } from './SurveyPopUp.functions';
import { useStyles } from './SurveyPopUp.styles';
import { SurveyCollectionType } from './SurveyPopUp.types';
import { useSelectedClient } from '../../../../../../DisplayFramework/State/Slices/DisplayFramework';
import { useUserSession } from '../../../../../../DisplayFramework/State/Slices/Auth';
import { useSetChatOpenedFlyout } from '../../ChatInput/ChatFlyout/ChatFlyout.state';
import { ChatFlyoutDrawer } from '../../ChatInput/ChatFlyout/ChatFlyoutDrawer';
import { useListenToChatSendEvent } from '../../ChatInput/Input/ChatSend.hooks';

function SurveyPopUp() {
  const commonClasses = useCommonStyles();
  const { classes } = useStyles();

  const selectedClient = useSelectedClient();
  const session = useUserSession();
  const setChatFlyout = useSetChatOpenedFlyout();
  const { id: panelId } = useCurrentPanel();

  const [surveyCollectionType, setSurveyCollectionType] = useState<SurveyCollectionType>('QMT');
  const [surveyCollectionsList, setSurveyCollectionList] = useState<any>([]);
  const [surveyData, setSurveyData] = useState({ title: '', collectionId: '' });
  const [errorObject, setErrorObject] = useState({ titleError: '', collectionIdError: '', default: '' });
  const [isLoading, setIsLoading] = useState(true);
  const myTeamData = useSelector((state: IRootState) => state.dashboard.myTeamData);

  useEffect(() => {
    if (myTeamData.length <= 0) return;
    (async () => {
      setIsLoading(true);
      const response = await getCollectionLists(panelId, session, surveyCollectionType);
      if (!response) return;
      const filterData = response.filter((v) => v?.numberOfPosts > 0 && v?.title && v?.collectionId);
      const modifyData = filterData && filterData.map((v) => ({ label: v?.title, value: v?.collectionId }));
      setSurveyCollectionList(modifyData);
      setIsLoading(false);
    })();
  }, [session, panelId, surveyCollectionType]);

  const handleSend = async () => {
    let errorObject = validateSurveyData(surveyData.title.trim(), surveyData.collectionId);
    setErrorObject(errorObject);
    var test = Object.keys(errorObject).find((key) => errorObject[key]);
    if (Object.keys(errorObject).find((key) => errorObject[key] !== '')) {
      return;
    }

    let payload = {
      userId: selectedClient.client_id,
      EventName: 'chat-categorizer',
      tenantId: selectedClient.tenant_id || 'amura',
      ContextType: '@dist-starter',
      loginUserId: session.user.id,
      surveyTitle: surveyData.title,
      collectionId: surveyData.collectionId,
      currentPostOrder: 0,
      currentResponse: [],
      url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
      token: session.id_token,
      method: 'POST',
      headers: {},
    };
    console.log(payload, 'payload for survey');
    const response = await PMS_S3.postData(payload);
    if (!response.Error) {
      setChatFlyout({});
    }
    return true;
  };

  useListenToChatSendEvent(async () => {
    const res = await handleSend();
    return res ? true : false;
  }, [handleSend]);

  return (
    <MUIDrawer open anchor={'bottom'} handleClose={() => setChatFlyout({})}>
      <div>
        <div className={`${classes.marginBottom}`}>
          <div className={`${classes.marginBottom}`}>
            <Select
              headerTitle={'Distribution Type'}
              placeholder={'Distribution Type'}
              options={SUREVEY_TYPES}
              values={surveyCollectionType}
              setValues={(value) => {
                setSurveyCollectionType(value);
              }}
              optionsType={'radio'}
              position={'bottom'}
              isAutoOk
              disabled
              isLoading={isLoading}
            />
          </div>
          <div className={` ${classes.mb}`}>
            <Select
              headerTitle="Distributions"
              placeholder="Select Distribution"
              options={surveyCollectionsList}
              setValues={(value) => {
                setSurveyData((prev) => ({
                  ...prev,
                  title: surveyCollectionsList.find((each) => each.value === value)?.label || value,
                  collectionId: value,
                }));
                setErrorObject((pre) => {
                  return { ...pre, collectionIdError: '' };
                });
              }}
              values={surveyData.collectionId}
              optionsType={'radio'}
              position={'bottom'}
              isAutoOk
              isLoading={isLoading}
              isSearch
            />
            {errorObject.collectionIdError && (
              <div>
                <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{errorObject.collectionIdError}</span>
              </div>
            )}
          </div>

          {errorObject.default && (
            <div>
              <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>{errorObject.default}</span>
            </div>
          )}
        </div>
        <div className={classes.messageInputContainer}>
          <div className={`${classes.middleContainer} ${classes.padding}`}>
            <span className={`${commonClasses.body15Regular} ${classes.textInMessage}`}>{'@survey'}</span>
          </div>
          <div className={classes.lastContainer}>
            <Button
              size="small"
              variant="contained"
              className={classes.sendButton}
              onClick={() => {
                let errorObject = validateSurveyData(surveyData.title.trim(), surveyData.collectionId);
                setErrorObject(errorObject);
                var test = Object.keys(errorObject).find((key) => errorObject[key]);
                if (Object.keys(errorObject).find((key) => errorObject[key] !== '')) {
                  return;
                }
                (async () => {
                  let payload = {
                    userId: selectedClient.client_id,
                    EventName: 'chat-categorizer',
                    tenantId: selectedClient.tenant_id || 'amura',
                    ContextType: '@dist-starter',
                    loginUserId: session.user.id,
                    surveyTitle: surveyData.title,
                    collectionId: surveyData.collectionId,
                    currentPostOrder: 0,
                    currentResponse: [],
                    url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
                    token: session.id_token,
                    method: 'POST',
                    headers: {},
                  };
                  console.log(payload, 'payload for survey');
                  const response = await PMS_S3.postData(payload);
                  if (!response.Error) {
                    setChatFlyout({});
                  }
                })();
              }}
            >
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
    </MUIDrawer>
  );
}

export default memo(SurveyPopUp);
