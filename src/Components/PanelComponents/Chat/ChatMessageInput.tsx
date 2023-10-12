import React, { RefObject } from 'react';
import { withStyles } from 'tss-react/mui';
import { TextField } from '@mui/material';
import { PMS_LOCALE } from '../../../Utils';
import { scrollIntoView } from './Chat.functions';
const ValidationTextField = withStyles(TextField, {
  root: {
    '& input:valid + fieldset': {
      // width:'80%',
      borderRadius: '5px',
      borderWidth: 1,
      padding: '0px 0px !important',
      boxShadow: '0px 4px 13px rgba(0, 0, 0, 0.25)',
    },
    '& .MuiOutlinedInput-input': {
      padding: '14px !important',
      backgroundColor: '#141415 !important',
      borderRadius: '4px',
    },
    '& .MuiOutlinedInput-inputMarginDense': {
      paddingTop: '0px !important',
      paddingBottom: '0px !important',
      paddingRight: '0px !important',
      color: '#FFF !important',
      height: '40px',
      fontSize: '12px !important',
      borderRadius: '4px !important',
      background: '#141415 !important',
    },
    '& input:valid:focus + fieldset': {
      border: '1px solid #00FFC2',
      padding: '4px !important',
    },
    '& input:valid:hover + fieldset': {
      border: '1px solid #00FFC2',
      padding: '4px !important',
    },
  },
});

interface IProps {
  messageRef?: any;
  placeHolder: string;
  value: string;
  onChange: Function;
  onHitEnter: Function;
  suggestionOpened: boolean;
  setSuggestionOpen: Function;
  suggestedUser: Array<any>;
  highlightedIndex: number;
  setHighlightedIndex: Function;
  isInputFromFileUpload: boolean;
}
export default function ChatMessageInput(props: IProps) {
  return (
    <ValidationTextField
      inputRef={props.messageRef ?? null}
      variant="outlined"
      value={props.value}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      placeholder={PMS_LOCALE.translate(props.placeHolder)}
      style={{
        width: '100%',
        backgroundColor: '#171D20',
        borderRadius: '4px',
        margin: '8px',
      }}
      InputProps={{
        style: {
          color: '#ffffff !important',
          backgroundColor: '#171D20 !important',
        },
      }}
      // onBlur={(event) => {
      //   if (props.setSuggestionOpen) {
      //     props.setSuggestionOpen(false);
      //   }
      // }}
      onKeyDown={(event) => {
        // if (!props.isInputFromFileUpload) {
        if (event.keyCode === 13 && !props.suggestionOpened) {
          props.onHitEnter();
        }
        if (event.keyCode === 13 && props.suggestionOpened) {
          let tempValue = props.value;
          tempValue = tempValue.slice(0, tempValue.lastIndexOf('@') + 1);
          props.onChange(`${tempValue}${props.suggestedUser[props.highlightedIndex].name} `);
          props.setSuggestionOpen(false);
        }
        if (event.keyCode === 38 && props.highlightedIndex) {
          scrollIntoView(`tag-${props.highlightedIndex - 1}`);
          props.setHighlightedIndex(props.highlightedIndex - 1);
        }
        if (event.keyCode === 40 && props.highlightedIndex !== props.suggestedUser.length - 1) {
          scrollIntoView(`tag-${props.highlightedIndex + 1}`);
          props.setHighlightedIndex(props.highlightedIndex + 1);
        }
        //Commented because of technical issue

        // if (event.keyCode === 8) {
        //   let tempValue = props.value;
        //   let lastIndexOfTag = tempValue.lastIndexOf("@");
        //   let lastIndexSpace = tempValue.lastIndexOf(" ");
        //   tempValue = tempValue.slice(lastIndexOfTag, lastIndexSpace);
        //   tempValue = tempValue.slice(1, lastIndexSpace);
        //   let isTagged = false;
        //   if (
        //     tempValue &&
        //     props.suggestedUser.find((value) => value.name === tempValue)
        //   ) {
        //     isTagged = true;
        //   }
        //   tempValue =
        //     isTagged && lastIndexSpace === props.value.length - 1
        //       ? props.value.slice(0, lastIndexOfTag)
        //       : props.value.slice(0, props.value.length - 1);
        //   props.onChange(`${tempValue}`);
        // }
        // }
      }}
    />
  );
}
