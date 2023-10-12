import React from 'react';
// import { List, ListItem } from "../../Common/ChatComponents/ConstantComponents";
import { useStyles } from '../Chat.styles';
import { IComponentMessage } from '../Chat.types';
import { getDisplayDate } from '../ChatUtils/chatUtils';
interface IProps {
  index: number;
  message: IComponentMessage;
}

export default function Date(props: IProps) {
  const { index, message } = props;
  const { classes } = useStyles();
  return (
    // TODO: <ListItem key={`message-${index}`}>
    <div className={classes.dayDiv} id={`message-${index}`}>
      <hr className={classes.dayHr}></hr>
      <span className={classes.daySpan}>{getDisplayDate(message.ReceivedTime)}</span>
      <hr className={classes.dayHr}></hr>
    </div>
    // </ListItem> }
  );
}
