import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { DEFAULT_SNIPPETS } from '../Summary/Summary.function';
import { useStyles } from './MessageView.styles';
import { MessageHeaderProps } from './MessageView.types';

export default function MessageHeader(props: MessageHeaderProps) {
  const { heading, snippetId } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  return (
    <header className={classes.headerwrap}>
      <span>{DEFAULT_SNIPPETS[snippetId]?.iconChat || ''}</span>

      <span className={`${commonClasses.body17Medium} ${classes.headingTitle}`}>
        {DEFAULT_SNIPPETS[heading]?.headerText ||
          heading.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => {
            return str.toUpperCase();
          }) ||
          'Enter Data'}
      </span>
    </header>
  );
}
