import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useStyles } from './ReadMore.styles';
import { IProps } from './ReadMore.types';

const ReadMore = (props: IProps) => {
  const { text } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [clamped, setClamped] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [hide, setHide] = useState(false);
  const containerRef = React.useRef(null);
  const handleClick = () => {
    setClamped(!clamped);
    setHide(!hide);
  };
  useEffect(() => {
    const hasClamping = (el: HTMLElement) => {
      const { clientHeight, scrollHeight, offsetHeight } = el;
      if (scrollHeight > 40) {
        return true;
      } else {
        return false;
      }
    };
    const checkButtonAvailability = () => {
      if (containerRef.current) {
        // const hadClampClass = containerRef.current.classList.contains("clamp");
        setShowButton(hasClamping(containerRef.current));
        setHide(true);
      }
    };
    checkButtonAvailability();
  }, [containerRef, text]);

  return (
    <div className={clamped ? `${classes.clamp}` : classes.longTRext}>
      <p
        ref={containerRef}
        className={
          hide ? `${commonClass.body15Regular} ${classes.textwrapper} ` : `${commonClass.body15Regular}  ${classes.hideText}`
        }
      >
        {text}
      </p>
      {showButton && (
        <button onClick={handleClick} className={`${commonClass.caption12Medium} ${classes.readMoreBtn}`}>
          Read {clamped ? 'more' : 'less'}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
