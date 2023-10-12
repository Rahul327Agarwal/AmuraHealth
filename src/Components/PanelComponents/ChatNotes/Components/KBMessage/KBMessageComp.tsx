import { memo } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import ChatReadMore from '../../../../LibraryComponents/ChatComponent/ChatReadMore/ChatReadMore';
import { IChatMessage } from '../../ChatMessage/ChatMessage.types';
import { useStyles } from './KBMessage.styles';

const KBMessageComp = (props: IChatMessage['knowledgeBasePost']) => {
  const { knowledgeBasePostTopics: { heading, description } = {} as any } = props || {};

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <div className={classes.chatMessage}>
      <div className={commonClasses.body20Medium}>{heading?.snippet || ''}</div>
      <ChatReadMore
        text={description?.snippet || ''}
        charLimit={750}
        readMoreCustomClasses={`${commonClasses.body15Regular} ${classes.readMoreMessage}`}
      />
    </div>
  );
};

export default memo(KBMessageComp);
