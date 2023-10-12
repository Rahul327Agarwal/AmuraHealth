import React, { useMemo, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useStyles } from './ReadMoreReadLess.styles';
import { IProps, ReadButtonProps } from './ReadMoreReadLess.types';

const ReadMoreReadLess = (props: IProps) => {
  const { children, ellipsis, readMoreText, readLessText, charLimit, readMoreClassName, readLessClassName } = props;

  const [showMore, setShowMore] = useState(false);

  const shortText = useMemo(
    () => children?.slice(0, charLimit) + (charLimit >= children?.length ? '' : ellipsis || '...'),
    [children, charLimit, ellipsis]
  );
  const isHidden = useMemo(() => charLimit >= children?.length, [children, charLimit]);

  return (
    <div>
      {showMore ? children : shortText}{' '}
      {showMore ? (
        <ReadButton
          isHidden={isHidden}
          customStyle={readLessClassName}
          content={readLessText || 'Read Less'}
          handleClick={(e) => {
            e.stopPropagation();
            setShowMore(false);
          }}
        />
      ) : (
        <ReadButton
          isHidden={isHidden}
          content={readMoreText || 'Read More'}
          customStyle={readMoreClassName}
          handleClick={(e) => {
            e.stopPropagation();
            setShowMore(true);
          }}
        />
      )}
    </div>
  );
};

export default ReadMoreReadLess;

const ReadButton = (props: ReadButtonProps) => {
  const { isHidden, content, customStyle, handleClick } = props;
  const commonClass = useCommonStyles();
  const { classes } = useStyles();

  return isHidden ? null : (
    <span className={`${commonClass.caption12Medium} ${classes.pointer} ${customStyle}`} onClick={handleClick}>
      {content}
    </span>
  );
};
