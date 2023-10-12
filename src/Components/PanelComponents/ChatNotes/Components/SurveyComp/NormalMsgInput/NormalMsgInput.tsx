import { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { SendIcon } from '../../../../../SVGs/Common';
import { useStyles } from './NormalMsgInput.styles';
import { IProps } from './NormalMsgInput.types';

export default function NormalMsgInput(props: IProps) {
  const { placeholder, setDescriptionText } = props;

  const { classes } = useStyles();

  const [input, setInput] = useState('');
  const [rerenderFlag, setRerenderFlag] = useState(0);
  const text = useRef('');
  const focusIndex = useRef(null);

  useEffect(() => {
    focusIndex?.current?.focus();
  }, [props]);

  const handleChange = (evt) => {
    setRerenderFlag(new Date().getTime());
    text.current = evt.currentTarget.textContent;
    setInput(evt.currentTarget.textContent.trim());
  };

  const handleKeyDown = (event) => {
    let key = event.key;
    if (key === 'Enter' && text.current.trim().length > 0) {
      event.preventDefault();
      if (text.current.trim().length > 0) setDescriptionText(text.current.trim());
      return;
    }
  };

  return (
    <div className={classes.displayFlexColumn}>
      <div className={`${classes.messageBox}`}>
        <div className={classes.messageGrid}>
          <div className={classes.middleContainer}>
            <div className={classes.subWrapper}>
              <span
                key={rerenderFlag}
                className={`${classes.placeholderSpan} ${text.current ? classes.visibiltyNone : classes.visibilty}`}
              >
                {placeholder}
              </span>
              <ContentEditable
                contentEditable
                innerRef={focusIndex}
                className={classes.input}
                html={text.current}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div
            className={`${input.length > 0 ? classes.sendIcon : classes.disableSend}`}
            onClick={() => {
              if (input.length > 0) {
                setDescriptionText(text.current.trim());
              }
            }}
          >
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
