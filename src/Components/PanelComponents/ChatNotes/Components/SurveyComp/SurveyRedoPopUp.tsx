import { memo } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import MUIDrawer from '../../../../LibraryComponents/MUIDrawer/MUIDrawer';
import PannelFooter from '../../../../LibraryComponents/PannelFooter/PannelFooter';
import { useChatOpenedFlyout, useSetChatOpenedFlyout } from '../ChatInput/ChatFlyout/ChatFlyout.state';
import { useStyles } from './SurveyComp.styles';
import { ChatFlyoutDrawer } from '../ChatInput/ChatFlyout/ChatFlyoutDrawer';

const SurveyRedoPopUp = () => {
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const setChatFlyout = useSetChatOpenedFlyout();
  const { props: flyoutProps } = useChatOpenedFlyout();

  const onConfirmYes = () => {
    if (flyoutProps?.surveyType === 'textField') {
      setChatFlyout({
        openedFlyout: 'surveyTextAnswer',
        props: {
          message: flyoutProps.messageData,
          isRedo: true,
        },
      });
    } else {
      setChatFlyout({
        openedFlyout: 'surveySelectPopUp',
        props: flyoutProps,
      });
    }
  };

  const onCancel = () => {
    setChatFlyout({});
  };

  return (
    <ChatFlyoutDrawer open anchor={'bottom'} onClose={onCancel} absoluteBottom>
      <>
        <div className={`${commonClasses.body15Medium} ${classes.reAnswerQuestion}`}>
          Are you sure want to reset your reply and re-answer the question?
        </div>
        <PannelFooter
          customStyle={classes.drawerFooter}
          buttonOneProps={{ size: 'large' }}
          buttonTwoProps={{ size: 'large' }}
          handleCancel={onCancel}
          handleAdd={onConfirmYes}
          buttonOneTitle={'No'}
          buttonTwoTitle={'Yes'}
        />
      </>
    </ChatFlyoutDrawer>
  );
};

export default memo(SurveyRedoPopUp);
