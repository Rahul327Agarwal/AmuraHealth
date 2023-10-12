import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { SendIcon } from '../../../SVGs/Common';
import ContentEditable from 'react-contenteditable';
import { useStyles } from './NormalMsgInput.styles';
import { IProps } from './NormalMsgInput.types';
import { checkPrivacy } from '../../../PanelComponents/Notes/Notes.functions';

export default function NormalMsgInput(props: IProps) {
  const { tagOptions, placeholder, setDescriptionText } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const lastMessageRef = React.useRef(null);
  const [input, setInput] = useState('');
  const text = React.useRef('');
  const files = React.useRef([]);
  const suggestionsRef = React.useRef([]);
  const focusIndex = React.useRef(null);
  const inputRef: any = React.useRef(null);
  const disableSendButton: any = React.useRef(false);
  const [rerenderFlag, setRerenderFlag] = useState(0);
  const [disableSend, setDisableSend] = useState(false);

  useEffect(() => {
    focusIndex?.current?.focus();
  }, [props]);

  useEffect(() => {
    disableSendButton.current = props.disableSend;
  }, [props.disableSend]);

  useEffect(() => {
    disableSendButton.current = disableSend;
  }, [disableSend]);

  const handleChange = (evt) => {
    setRerenderFlag(new Date().getTime());
    text.current = evt.currentTarget.textContent;
    setInput(evt.currentTarget.textContent.trim());
  };

  const handleKeyDown = (event, tagOptions) => {
    let key = event.key;
    if (key === 'Enter' && text.current.trim().length > 0) {
      event.preventDefault();
      let { messageToSend } = checkPrivacy(text.current, tagOptions);
      if (
        // !disableInput(props.parentProps, disableSendButton.current, input, tagOptions, files.current.length > 0) &&
        // !propdDisableButton.current &&
        text.current.trim().length > 0
      )
        setDescriptionText(text.current.trim());
      return;
    }
  };

  const resetInput = () => {
    setInput('');
    text.current = '';
    suggestionsRef.current = tagOptions;
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
                contentEditable={true}
                innerRef={focusIndex}
                className={classes.input}
                html={text.current}
                onChange={(e) => {
                  handleChange(e);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e, suggestionsRef.current);
                }}
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
            {<SendIcon />}
          </div>
        </div>
      </div>
    </div>
  );
}
