import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { removeHtmlTagsFromSring } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { createStringWithLinks, findMatchingRegexEndIndex } from './ChatReadMore.functions';
import { useStyles } from './ChatReadMore.styles';
import { IProps } from './ChatReadMore.types';

const ChatReadMore = (props: IProps) => {
  const { text, charLimit, readMoreCustomClasses } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [clamped, setClamped] = useState(text.length > charLimit);
  const containerRef = React.useRef(null);
  const [visibleText, setVisibleText] = useState('');
  const [showingTillIndex, setShowingTillIndex] = useState<number>(charLimit);

  const textWithoutTags = useMemo(() => removeHtmlTagsFromSring(text), []);
  //
  const handleReadMore = () => {
    if (showingTillIndex + charLimit > textWithoutTags.length) {
      setShowingTillIndex(textWithoutTags.length - 1);
      setVisibleText(createStringWithLinks(textWithoutTags));
    } else {
      let toBreakAt = findMatchingRegexEndIndex(textWithoutTags, showingTillIndex + charLimit);
      if (toBreakAt > 0) {
        setShowingTillIndex(toBreakAt);
      } else {
        setVisibleText(createStringWithLinks(textWithoutTags.slice(0, showingTillIndex + charLimit)));
        setShowingTillIndex((prev) => prev + charLimit);
      }
    }
  };

  useLayoutEffect(() => {
    let toBreakAt = findMatchingRegexEndIndex(textWithoutTags, charLimit);

    if (toBreakAt > 0) {
      setVisibleText(createStringWithLinks(textWithoutTags.slice(0, toBreakAt)));
      setShowingTillIndex(toBreakAt);
    } else {
      setVisibleText(createStringWithLinks(textWithoutTags.slice(0, charLimit)));
    }
  }, []);

  useEffect(() => {
    if (textWithoutTags.length - 1 > showingTillIndex) {
      setClamped(true);
    } else {
      setClamped(false);
    }
  }, [showingTillIndex]);

  return (
    <div className={clamped ? `${classes.clamp}` : classes.longTRext}>
      <span
        data-searchable
        ref={containerRef}
        className={
          clamped
            ? `${commonClass.body15Regular} ${classes.textwrapper} ${readMoreCustomClasses} `
            : `${commonClass.body15Regular}  ${classes.hideText} ${readMoreCustomClasses}`
        }
        dangerouslySetInnerHTML={{ __html: visibleText }}
      ></span>

      {clamped && (
        <span onClick={handleReadMore} className={`${commonClass.caption12Medium} ${classes.readMoreBtn}`}>
          ... Read {clamped ? 'more' : 'less'}
        </span>
      )}
    </div>
  );
};

export default ChatReadMore;
