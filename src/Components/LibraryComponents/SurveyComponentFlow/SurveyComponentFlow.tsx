import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { DownArrowIcon, QuestionmarkIcon, TickIcon, UndoIcon } from '../../SVGs/Common';
// import { getTimeIn12HrFormat } from '../ChatComponent/ChatComponent.functions';
import { getTimeIn12HrFormat } from '../ChatComponent/ChatComponent.functions';
import Button from '../MUIButton/MUIButton';
import MUICheckboxGroup from '../MUICheckboxGroup/MUICheckboxGroup';
import RadioGroup from '../MUIRadioGroup/MUIRadioGroup';
import { OPTIONS_DATA, surveySendMsgAPI, surveySendMsgWAAPI, surveySendMsgWAAPIReply } from './SurveyComponent.function';
import { useStyles } from './SurveyComponent.styles';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import axios from 'axios';
import ErrorToaster from '../../../Common/ErrorToaster';
import { globalRepliedToMessage } from '../../PanelComponents/Notes/components/MessageInputNew/MessageInput.types';
import ThreeDotMenu from '../ThreeDotMenu/ThreeDotMenu';

const SurveyComponent = (props: any) => {
  const { message, parentProps, setIsSurveyTextPopup, setIsSurveyRedo, setOpenReply, setRepliedToMessage, msgHighlight } = props;

  const { surveyTitle, postType, postHeading, currentPostOrder, totalNumberOfPosts, postResponses, currentResponse } =
    message?.survey || {};
  const { ContextType } = message;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [userResponse, setUserResponse] = useState<any>([]);
  const [progressbarValue, setProgressBarValue] = useState(0);
  const { id: panelId } = useCurrentPanel();
  const [showDownArrow, setShowDownArrow] = useState(false)

  useEffect(() => {
    if (message.survey) {
      setUserResponse(currentResponse || []);
      //   let barValue = (currentPostOrder || 0) / totalNumberOfPosts;
      //   setProgressBarValue(barValue || 0);
    }
  }, [props]);

  const handleOnReplyClick = (data) => {
    if (data === 'REPLY') {
      setShowDownArrow(false);
      setOpenReply(true);
      setRepliedToMessage(message);
      globalRepliedToMessage.message = JSON.parse(JSON.stringify(message));
      return;
    }
  };

  const handleRedoFunction = () => {
    let optionsData =
      postResponses &&
      postResponses.map((each) => {
        return { label: each, value: each };
      });
    let optionsType = postType == 'select' ? 'radio' : 'checkbox';
    setIsSurveyRedo((pre) => ({
      ...pre,
      open: true,
      options: optionsData,
      optionsType: postType === 'select' ? 'radio' : 'checkbox',
      headerTitle: postHeading,
      screen: 'SURVEY_REDO',
      surveyType: postType,
      messageData: message,
    }));
  };
  const renderMessages = (componentType) => {
    let modifiedOptions =
      postResponses &&
      postResponses.map((each) => {
        return { label: each, value: each };
      });
    switch (componentType) {
      case 'select':
        return (
          <RadioGroup
            variant="radio"
            isReverse={false}
            isSurvey
            disabled={currentResponse?.length || false}
            gap="0"
            flexDirection="column"
            value={userResponse.toString()}
            setValue={(singleSelect) => {
              setUserResponse([singleSelect]);
            }}
            options={modifiedOptions || []}
          />
        );
      case 'multiSelect':
        return (
          <MUICheckboxGroup
            options={modifiedOptions || []}
            isDivider={false}
            value={userResponse}
            onChange={(multiSelect) => setUserResponse(multiSelect)}
            disabled={currentResponse?.length || false}
          />
        );
    }
  };
  return (
    <div className={classes.container}>
      <main
        className={classes.mainContainer}
        onPointerEnter={(e) => setShowDownArrow(true)}
        onPointerLeave={(e) => setShowDownArrow(false)}
      >
        <div className={`${classes.downArrowWrapper}`} style={{ opacity: showDownArrow ? 1 : 0 }}>
          <div className={classes.downArrowBG} />
          <div className={classes.downArrow}>
            <ThreeDotMenu
              isDivider
              options={[{ label: 'Reply', value: 'REPLY' }]}
              handleClick={handleOnReplyClick}
              renderButton={<DownArrowIcon />}
              usePopOver
              setIsOpen={setShowDownArrow}
              anchorAlignment={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              popOverAlignment={{
                horizontal: 'right',
                vertical: 'top',
              }}
            />
          </div>
        </div>
        <div className={`${classes.headerContainer} ${classes.marginB20}`}>
          {/* <span className={classes.marginB24}>
            <ProgressBarNew percent={progressbarValue * 100} removeMargin={true} />
          </span> */}
          <div className={classes.titleContainer}>
            <span className={classes.iconStyle}>
              <QuestionmarkIcon />
            </span>
            <span className={`${classes.headerTitle} ${commonClasses.body17Medium} `}>{surveyTitle || ''}</span>
          </div>
        </div>
        <div className={classes.bodyContainer}>
          <span className={`${classes.questionStyle} ${commonClasses.body17Regular} ${classes.marginB24}`}>
            {postHeading || ''}
          </span>
          {postType && postType !== 'textField' && <div className={classes.marginB24}>{renderMessages(postType)}</div>}
          {postType && postType === 'textField' && currentResponse?.length > 0 && (
            <span className={`${classes.questionStyle} ${classes.marginB24} ${commonClasses.body15Regular} ${classes.marginB24}`}>
              {userResponse.toString() || ''}
            </span>
          )}
          {!currentResponse?.length ? (
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                size="small"
                fullWidth={false}
                onClick={async () => {
                  if (ContextType === '@survey-wa-message') {
                    try {
                      if (userResponse.length !== 1) {
                        ErrorToaster('Something went wrong while submitting the answer!', panelId);
                      }
                      let responseFromAnswer = await axios.post(`${import.meta.env.VITE_ANSWER_SURVEY_WA_MESSAGE}`, {
                        patientId: message.userId,
                        questionnaireId: message.survey.collectionId,
                        answer: userResponse[0],
                        nthQuestion: message.survey.currentPostOrder,
                      });
                      let responseFromWhatsAPP = await surveySendMsgWAAPIReply(panelId, message, parentProps, userResponse);
                      let responseFromChat: any = await surveySendMsgWAAPI(panelId, message, parentProps, userResponse);
                      if (!responseFromChat.Error) {
                        try {
                          let responseToSendNext = await axios.post(
                            `${import.meta.env.VITE_ANSWER_SURVEY_WA_MESSAGE_SEND_QUESTION}`,
                            {
                              patientId: message.userId,
                              questionnaireId: message.survey.collectionId,
                            }
                          );
                        } catch (e) {
                          console.log('Response from send next question,', e);
                        }
                      }
                    } catch (e) {
                      ErrorToaster('Something went wrong while submitting the answer!', panelId);
                    }
                    return;
                  }
                  if (postType == 'textField') {
                    setIsSurveyTextPopup({ isOpen: true, message: message, isRedo: false });
                  } else {
                    surveySendMsgAPI(
                      panelId,
                      message,
                      parentProps,
                      userResponse,
                      () => {},
                      () => {},
                      () => {},
                      () => {},
                      false
                    );
                  }
                }}
                startIcon={<TickIcon />}
                disabled={postType === 'textField' ? false : userResponse.length > 0 ? false : true}
              >
                {postType === 'textField' ? 'Answer' : 'Done'}
              </Button>
            </div>
          ) : (
            <div className={classes.statusCon}>
              <span className={`${commonClasses.caption12Regular} ${classes.messageSent}`}>Done</span>
              {ContextType !== '@survey-wa-message' && (
                <IconButton className={classes.reDoStyle} onClick={() => handleRedoFunction()}>
                  <UndoIcon />
                </IconButton>
              )}
            </div>
          )}
        </div>
      </main>
      <footer className={`${commonClasses.caption12Regular} ${classes.leftMessageTimeText}`}>
        {getTimeIn12HrFormat(message.receivedTime || new Date())}
      </footer>
    </div>
  );
};
export default SurveyComponent;
