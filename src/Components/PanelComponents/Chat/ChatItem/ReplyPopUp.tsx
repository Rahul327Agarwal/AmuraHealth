import React from 'react';
import { getUserNameById } from './../../../../Common/Common.functions';
import { removeExtentionFromFileName, splitTaggedPersonFromMessage } from '../Chat.functions';
import { useStyles } from '../Chat.styles';
import { IComponentMessage } from '../Chat.types';
import { getFileExtention } from '../ChatUtils/chatUtils';
import { isMeCallout, isTeamCallout } from '../ChatUtils/validations';
interface IProps {
  replyingMessageIndex: string;
  message: IComponentMessage;
  usersInTheChannel: Array<any>;
  users: Array<any>;
  searchIndices: Array<any>;
  currentSearchIndex: number;
  hightLightSearch: string;
  colorsForUsername: any;
  sessions: any;
}
export default function ReplyPopUp(props: IProps) {
  const { message, usersInTheChannel, users, colorsForUsername, sessions } = props;
  const { classes } = useStyles();
  const taggedMessage = (message: string, users: Array<any>) => {
    let formattedMessage = splitTaggedPersonFromMessage(message, users);
    return (
      <div>
        <span className={classes.taggedPerson}>{formattedMessage[0]}</span>
        <span>{formattedMessage[1]}</span>
      </div>
    );
  };
  return (
    <div className={classes.chatMessage}>
      <div className={`${classes.rceMboxLeft} ${message.IsFirstMessage ? classes.rceMboxLeftFirst : ''}`}>
        <div className={`${classes.replyBody}`}>
          <div
            className={`${classes.rceMboxText} ${classes.messageSenderText}`}
            style={{
              fontSize: '12px !important',
              color: `${colorsForUsername[message.SenderId]}`,
            }}
          >
            {message.SenderId === sessions.user.id ? 'You' : getUserNameById(message.SenderId, users)}
          </div>
          {message?.AttachmentURL ? (
            <div className={`${classes.rceMboxText} right ${classes.marginB5} ${classes.messageContent}`}>
              <div className={classes.filenameView}>
                <span className={classes.extentionSpan}>{getFileExtention(message.AttachmentURL).toLocaleUpperCase()}</span>
                <span className={classes.filename}>{removeExtentionFromFileName(message.AttachmentURL)}</span>
              </div>
            </div>
          ) : null}
          {message.Message ? (
            <div className={`${classes.rceMboxText} left  ${classes.marginB5} ${classes.replyHeight} ${classes.messageContent}`}>
              {message.CalloutTo && !(isTeamCallout(message.CalloutTo) || isMeCallout(message.CalloutTo))
                ? taggedMessage(message.Message, usersInTheChannel)
                : message.Message}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
