import { IconButton } from '@mui/material';
import { memo, useEffect, useMemo, useState } from 'react';
import ErrorToaster from '../../../../../Common/ErrorToaster';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useUserSession } from '../../../../../DisplayFramework/State/Slices/Auth';
import { useSelectedClient } from '../../../../../DisplayFramework/State/Slices/DisplayFramework';
import Button from '../../../../LibraryComponents/MUIButton/MUIButton';
import MUICheckboxGroup from '../../../../LibraryComponents/MUICheckboxGroup/MUICheckboxGroup';
import RadioGroup from '../../../../LibraryComponents/MUIRadioGroup/MUIRadioGroup';
import { QuestionmarkIcon, TickIcon, UndoIcon } from '../../../../SVGs/Common';
import { useSetChatOpenedFlyout } from '../ChatInput/ChatFlyout/ChatFlyout.state';
import { surveySendMsgAPI, surveySendMsgWAAPI, surveySendMsgWAAPIReply } from '../SurveyComp/SurveyComp.functions';
import { answerSurveyMessage, answerSurveySend } from './SurveyMessage.functions';
import { useStyles } from './SurveyMessage.styles';
import { IProps } from './SurveyMessage.types';

const SurveyMessageComp = (props: IProps) => {
  const { message } = props;
  const { survey, ContextType, userId } = message;
  const { surveyTitle, postType, postHeading, postResponses, currentResponse } = survey || {};

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const setChatFlyout = useSetChatOpenedFlyout();
  const selectedClient = useSelectedClient();
  const session = useUserSession();

  const [userResponse, setUserResponse] = useState<string[]>([]);

  const responseOptions = useMemo(() => postResponses?.map((v) => ({ label: v, value: v })), [postResponses]);

  useEffect(() => {
    if (currentResponse) {
      setUserResponse(currentResponse || []);
    }
  }, [currentResponse]);

  const onRedo = () => {
    setChatFlyout({
      openedFlyout: 'redoSurvey',
      props: {
        options: responseOptions,
        optionsType: postType === 'select' ? 'radio' : 'checkbox',
        headerTitle: postHeading,
        surveyType: postType,
        messageData: message,
      },
    });
  };

  const onSubmitAnswer = async () => {
    if (ContextType === '@survey-wa-message') {
      if (userResponse.length !== 1) {
        ErrorToaster('Something went wrong while submitting the answer!', panelId);
      }
      await answerSurveyMessage(panelId, userResponse[0], userId, survey);
      await surveySendMsgWAAPIReply(panelId, selectedClient, session, message, userResponse);

      const responseFromChat = await surveySendMsgWAAPI(panelId, selectedClient, session, message, userResponse);
      if (!responseFromChat.Error) {
        await answerSurveySend(panelId, userId, survey);
      }
    } else if (postType == 'textField') {
      setChatFlyout({
        openedFlyout: 'surveyTextAnswer',
        props: { message, isRedo: false },
      });
    } else {
      await surveySendMsgAPI(panelId, selectedClient, session, message, userResponse, false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={`${classes.headerContainer} ${classes.marginB20}`}>
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
        {postType && postType !== 'textField' && (
          <div className={classes.marginB24}>
            {postType === 'select' ? (
              <RadioGroup
                variant="radio"
                isReverse={false}
                isSurvey
                disabled={!!currentResponse?.length}
                gap="0"
                flexDirection="column"
                value={userResponse.toString()}
                setValue={(singleSelect) => setUserResponse([singleSelect])}
                options={responseOptions || []}
              />
            ) : postType === 'multiSelect' ? (
              <MUICheckboxGroup
                options={responseOptions || []}
                isDivider={false}
                value={userResponse}
                onChange={(multiSelect) => setUserResponse(multiSelect)}
                disabled={!!currentResponse?.length}
              />
            ) : null}
          </div>
        )}
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
              onClick={onSubmitAnswer}
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
              <IconButton className={classes.reDoStyle} onClick={onRedo}>
                <UndoIcon />
              </IconButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SurveyMessageComp);
