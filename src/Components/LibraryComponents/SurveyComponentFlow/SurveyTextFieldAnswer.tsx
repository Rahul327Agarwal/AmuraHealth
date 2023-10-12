import React, { memo, useEffect, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { QuestionmarkIcon } from '../../SVGs/Common';
import MUIDrawer from '../MUIDrawer/MUIDrawer';
import NormalMsgInput from './NormalMsgInput/NormalMsgInput';
import { surveySendMsgAPI } from './SurveyComponent.function';
import { useStyles } from './SurveyComponent.styles';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const SurveyTextFieldAnswer = (props: any) => {
  const { parentProps, setIsSurveyTextPopup, isSurveyTextPopup } = props;
  const { surveyTitle, postHeading } = isSurveyTextPopup?.message?.survey || {};
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const [userResponse, setUserResponse] = useState<any>('');
  const [openConfirm, setOpenConfirm] = useState(true);
  useEffect(() => {
    if (userResponse.length > 0) {
      surveySendMsgAPI(
        panelId,
        isSurveyTextPopup.message,
        parentProps,
        [userResponse],
        () => {},
        () => {},
        setIsSurveyTextPopup,
        () => {},
        isSurveyTextPopup.isRedo
      );
    }
  }, [userResponse]);
  return (
    <div>
      <MUIDrawer
        open={openConfirm}
        headerTitle={''}
        anchor={'bottom'}
        handleOpen={() => {
          setOpenConfirm(true);
        }}
        handleClose={() => {
          setIsSurveyTextPopup({ isOpen: false });
        }}
        children={
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
            <NormalMsgInput
              placeholder={'Type Answer'}
              setDescriptionText={(data) => {
                setUserResponse(data);
              }}
            />
          </div>
        }
      />
    </div>
  );
};
export default memo(SurveyTextFieldAnswer);
