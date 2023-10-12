import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { PMS_S3 } from '../../../../Utils';
import { SendIcon } from '../../../SVGs/Common';
import Button from '../../MUIButton/MUIButton';
import MUIDrawer from '../../MUIDrawer/MUIDrawer';
import Select from '../../Select/Select';
import { SUREVEY_TYPES, getCollectionLists, validateSurveyData } from './SurveyPopUp.functions';
import { useStyles } from './SurveyPopUp.styles';
import { IProps, SurveyCollectionType } from './SurveyPopUp.types';

function SurveyPopUp(props: IProps) {
  const { selectedClient, sessions, setOpenSurvey } = props;
  const [surveyCollectionType, setSurveyCollectionType] = useState<SurveyCollectionType>('QMT');
  const [surveyCollectionsList, setSurveyCollectionList] = useState<any>([]);
  const [surveyData, setSurveyData] = useState({ title: '', collectionId: '' });
  const [openConfirm, setOpenConfirm] = useState(true);
  const [errorObject, setErrorObject] = useState({ titleError: '', collectionIdError: '', default: '' });

  const { id: panelId } = useCurrentPanel();
  const myTeamData = useSelector((state: IRootState) => state.dashboard.myTeamData);
  const commonClasses = useCommonStyles();
  const { classes } = useStyles();

  useEffect(() => {
    if (myTeamData.length <= 0) return;
    (async () => {
      const response = await getCollectionLists(panelId, sessions, surveyCollectionType);
      if (!response) return;
      let filterData = response.filter((each) => each?.numberOfPosts > 0 && each?.title && each?.collectionId);
      let modifyData =
        filterData &&
        filterData.map((each) => {
          return {
            label: each.title,
            value: each.collectionId,
          };
        });
      setSurveyCollectionList(modifyData);
    })();
  }, [sessions, panelId, surveyCollectionType]);

  return (
    <div>
      <MUIDrawer
        open={openConfirm}
        anchor={'bottom'}
        handleOpen={() => {
          setOpenConfirm(true);
        }}
        handleClose={() => {
          setOpenSurvey(false);
        }}
      >
        <div>
          <div className={`${classes.marginBottom}`}>
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
                  isSearch
                />
                {errorObject.collectionIdError && (
                  <div>
                    <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>
                      {errorObject.collectionIdError}
                    </span>
                  </div>
                )}
              </div>

              {errorObject.default && (
                <div>
                  <span className={`${commonClasses.caption12Regular} ${classes.errorText}`}>
                    {errorObject.collectionIdError}
                  </span>
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
                      loginUserId: sessions.user.id,
                      surveyTitle: surveyData.title,
                      collectionId: surveyData.collectionId,
                      currentPostOrder: 0,
                      currentResponse: [],
                      url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
                      token: sessions.id_token,
                      method: 'POST',
                      headers: {},
                    };
                    console.log(payload, 'payload for survey');
                    const response = await PMS_S3.postData(payload);
                    if (!response.Error) {
                      setOpenConfirm(false);
                      setOpenSurvey(false);
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
    </div>
  );
}

export default memo(SurveyPopUp);
