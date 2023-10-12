import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useStyles } from './SummaryPanel.styles';
import { ReadMoreProps } from './SummaryPanel.types';
// import { useElementSize } from "usehooks-ts";

const ReadMore = (props: ReadMoreProps) => {
  // const [descriptRef, { height }] = useElementSize();
  const { text } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [clamped, setClamped] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [hide, setHide] = useState(false);
  const handleClick = (e: any) => {
    e.stopPropagation();
    setClamped(!clamped);
    setHide(!hide);
  };
  // useEffect(() => {
  // TODO: if (height > 40) {
  //   setShowButton(true);
  //   setClamped(true);
  // } else {
  //   setShowButton(false);
  // }
  // }, [height, text]);

  return (
    <div className={clamped && showButton ? `${classes.position} ${classes.clamp}` : `${classes.position} ${classes.longTRext}`}>
      {/* <p ref={descriptRef} className={`${commonClass.body15Regular} ${classes.textOver}`}>
        {text}
      </p> */}
      <p className={`${commonClass.body15Regular} ${classes.featureText}`}>{text}</p>
      {/* {showButton && (
        <div className={classes.readMoreButton}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }}
            className={`${commonClass.caption12Medium} ${classes.readMoreBtn}`}
          >
            Read {clamped ? "more" : "less"}
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ReadMore;
