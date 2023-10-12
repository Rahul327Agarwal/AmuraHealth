import { memo } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useUserSession } from '../../../../../DisplayFramework/State/Slices/Auth';
import { useSelectedClient } from '../../../../../DisplayFramework/State/Slices/DisplayFramework';
import MUIDrawer from '../../../../LibraryComponents/MUIDrawer/MUIDrawer';
import { QuestionmarkIcon } from '../../../../SVGs/Common';
import { useChatOpenedFlyout, useSetChatOpenedFlyout } from '../ChatInput/ChatFlyout/ChatFlyout.state';
import NormalMsgInput from './NormalMsgInput/NormalMsgInput';
import { surveySendMsgAPI } from './SurveyComp.functions';
import { useStyles } from './SurveyComp.styles';
import { ChatFlyoutDrawer } from '../ChatInput/ChatFlyout/ChatFlyoutDrawer';

const SurveyTextFieldAnswer = () => {
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const setChatFlyout = useSetChatOpenedFlyout();
  const { props: flyoutProps } = useChatOpenedFlyout();
  const { message, isRedo } = flyoutProps || {};
  const { surveyTitle, postHeading } = message?.survey || {};
  const { id: panelId } = useCurrentPanel();
  const selectedClient = useSelectedClient();
  const session = useUserSession();

  const onSubmitResponse = async (selectedRes: any[] | string) => {
    const responseData = (selectedRes && (Array.isArray(selectedRes) ? selectedRes : [selectedRes])) || [];

    if (!responseData.length) return;

    const response = await surveySendMsgAPI(panelId, selectedClient, session, message, responseData, isRedo);

    if (!response?.Error) {
      setChatFlyout({});
    }
  };

  return (
    <ChatFlyoutDrawer open anchor={'bottom'} onClose={() => setChatFlyout({})}>
      <div>
        <div className={classes.container2}>
          <main className={classes.mainContainer}>
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
            </div>
          </main>
        </div>
        <NormalMsgInput placeholder={'Type Answer'} setDescriptionText={onSubmitResponse} />
      </div>
    </ChatFlyoutDrawer>
  );
};
export default memo(SurveyTextFieldAnswer);
