import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import InputField from './../../../LibraryComponents/InputField/InputField';
import { DEFAULT_SNIPPETS } from '../Summary/Summary.function';
import { useStyles } from './ChatNote.styles';
import { IChatNoteInputProps } from './ChatNote.types';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { SendIcon } from '../../../SVGs/Common';

const ChatNoteInput = (props: IChatNoteInputProps) => {
  const { snippetId, headerText, handleSend, InputProps, isPercent } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [inputValue, setInputValue] = useState('');

  const isNumeric = (value: any) => {
    return /^\d+$/.test(value);
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    if (headerText === 'Certain number of people have voted') {
      if (value == '') {
        setInputValue(value);
        return;
      }
      if (!isNumeric(value)) return;
    }
    if (isPercent) {
      if (value == '') {
        setInputValue(value);
        return;
      }
      if (!isNumeric(value)) return;

      if (parseInt(value) > 100 || parseInt(value) < 1) return;
    }
    setInputValue(value);
  };
  const onSend = () => {
    handleSend({ value: inputValue });
  };
  const onEnterSend = (event: any) => {
    if (event.key === 'Enter' && inputValue !== '') handleSend({ value: inputValue });
  };
  return (
    <div className={classes.inputDrawerBox}>
      <div className={`${commonClasses.body17Medium} ${classes.questionHeader}`}>
        <span>{DEFAULT_SNIPPETS[snippetId]?.iconChat || ''}</span>
        <span>{headerText}</span>
      </div>
      <div className={classes.selectInputWrapperWithlabel}>
        <InputField {...InputProps} value={inputValue} onKeyDown={onEnterSend} onChange={handleChange} />
        <IconButton className={classes.sendButton} disabled={!inputValue} onClick={onSend}>
          {<SendIcon />}
        </IconButton>
      </div>
    </div>
  );
};

export default ChatNoteInput;
