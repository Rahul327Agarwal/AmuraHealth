import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { getAtClockText } from '../../ChatNotes.functions';
import LeftChatWrapper from '../LeftChatWrapper/LeftChatWrapper';
import RightChatWrapper from '../RightChatWrapper/RightChatWrapper';
import { useStyles } from './ClockMessage.styles';

const ClockMessage = (props) => {
  const { message, isOurMessage } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const LeftRightChatWrapper = React.useMemo(() => (isOurMessage ? RightChatWrapper : LeftChatWrapper), [isOurMessage]);

  return (
    <LeftRightChatWrapper message={message}>
      <>
        <span className={`${commonClasses.body15Regular}`}>
          {getAtClockText(message?.program?.ACTION)} <br />${message?.program?.daysLeft + ' Days '}
          <span className={`${commonClasses.body15Regular} ${classes.grayText}`}>left</span>
        </span>
      </>
    </LeftRightChatWrapper>
  );
};

export default React.memo(ClockMessage);
