import React, { useEffect, useState } from 'react';
import { useStyles } from '../Chat.styles';

interface IProps {
  message: string;
}
export default function ReadMore(props: IProps) {
  const { message } = props;
  const { classes } = useStyles();
  const maxCharactersToBeVisible = 700;
  const [visibleMessage, setVisibleMessage] = useState(message);
  const [counter, setCounter] = useState(1);
  const [isCompleteMessageVisible, setIsCompleteMessageVisibile] = useState(true);
  const onReadMoreClick = () => {
    let existingLength = counter;
    ++existingLength;
    existingLength *= maxCharactersToBeVisible;
    if (message && message.length > existingLength) {
      setCounter(counter + 1);
      setVisibleMessage(message.slice(0, existingLength));
    } else {
      setVisibleMessage(message);
      setIsCompleteMessageVisibile(true);
    }
  };
  useEffect(() => {
    if (message && message.length > maxCharactersToBeVisible) {
      setCounter(1);
      setVisibleMessage(message.slice(0, maxCharactersToBeVisible));
    } else {
      setVisibleMessage(message);
      setIsCompleteMessageVisibile(true);
    }
  }, [message]);
  return (
    <>
      <span>{visibleMessage}</span>
      {!isCompleteMessageVisible ? <span>...</span> : null}
      {!isCompleteMessageVisible ? (
        <span
          className={classes.readMore}
          onClick={() => {
            onReadMoreClick();
          }}
        >
          Read more
        </span>
      ) : null}
    </>
  );
}
