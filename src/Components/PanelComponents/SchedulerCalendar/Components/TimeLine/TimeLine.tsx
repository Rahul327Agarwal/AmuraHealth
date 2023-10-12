import React, { useEffect, useState } from "react";
import { getTimeLineHeight, getTimeElaspedFrom12 } from "./TimeLine.function";
import { useStyles } from "./TimeLine.styles";
import { IProps } from "./TimeLine.types";

export default function CalendarTimeLine(props: IProps) {
  const { magnifyCounter, elementProps } = props;

  const { classes } = useStyles(props);

  const [timeElaspsed, setTimeElapsed] = useState(getTimeElaspedFrom12());

  useEffect(() => {
    let timer = setInterval(() => {
      setTimeElapsed(getTimeElaspedFrom12());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div {...elementProps} className={classes.relativePosition} style={getTimeLineHeight(timeElaspsed, magnifyCounter)}>
      <div className={classes.viewGrid}>
        <div className={classes.justifyContentEnd}>
          <div className={classes.hour} />
        </div>
        <div className={classes.width} />
      </div>
    </div>
  );
}
