import { memo } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { formatDecimalTillNthPlace } from '../ChatComponent/BloodGlucosePopUp/BloodGlucosePopUp.functions';
import { getFormattedDateString } from './HistoryDataList.functions';
import { useStyles } from './HistoryDataList.styles';
import { DownArrow, UpArrow } from './HistoryDataList.svg';
import { IProps } from './HistoryDataList.types';

const HistoryDataList = (props: IProps) => {
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const { data: historyData, type, unit, numberOfFractionalDigits } = props;

  return (
    <section className={classes.historySection}>
      <div className={`${commonClasses.body15Medium} ${classes.historyTitle}`}>History</div>
      <div className={classes.historyList}>
        {/* .............................................weight................................. */}

        {type === 'weight' &&
          historyData.map((data) => (
            <div className={`${classes.singleHistory} ${commonClasses.caption12Regular}`}>
              <div className={`${historyData.length === 1 && !data.before ? classes.onlyCurerntValue : classes.values}`}>
                <div className={classes.differenceValue}>
                  {data?.before && (
                    <>
                      {data?.before == data?.after && <span></span>}
                      {data?.before < data?.after && <UpArrow />}
                      {data?.before > data?.after && <DownArrow />}
                      <span>{Number(Math.abs(data?.after - data?.before).toFixed(numberOfFractionalDigits))}</span>
                    </>
                  )}
                </div>
                <div className={classes.current}>
                  <span className={`${classes.currentWeight}`}>{data?.after}</span>
                </div>
              </div>
              <div className={classes.unitAndDate}>
                <span>{unit}</span>
                <span>{getFormattedDateString(new Date(data?.updatedOn))}</span>
              </div>
            </div>
          ))}
        {/* .............................................bp................................. */}
        {type === 'bp' &&
          historyData.map((data) => (
            <div className={`${classes.singleHistory} ${commonClasses.caption12Regular}`}>
              <div className={` ${classes.bpvaluesContainer}`}>
                <span className={`${classes.currentWeight} ${classes.maxWidthControl}`}>{data?.after?.split(' ')[0] || 0}</span>
                <span>{unit || data?.after?.split(' ')[1] || ''}</span>
                <span>{getFormattedDateString(new Date(data?.updatedOn))}</span>
              </div>
            </div>
          ))}
        {/* .............................................fbg................................. */}
        {type === 'fbg' &&
          historyData.map((data) => (
            <div className={`${classes.singleHistory} ${commonClasses.caption12Regular}`}>
              <div className={`${historyData.length === 1 && !data.before ? classes.onlyCurerntValue : classes.values}`}>
                <div className={classes.differenceValue}>
                  {data?.before && (
                    <>
                      {data?.before == data?.after && <span></span>}
                      {data?.before < data?.after && <UpArrow />}
                      {data?.before > data?.after && <DownArrow />}
                      <span>{formatDecimalTillNthPlace(Number(Math.abs(data.after - data.before)))}</span>
                    </>
                  )}
                </div>
                <div className={classes.current}>
                  <span className={`${classes.currentWeight}`}>{formatDecimalTillNthPlace(data?.after)}</span>
                </div>
              </div>
              <div className={classes.unitAndDate}>
                <span>{unit || data?.after?.split(' ')[1] || ''}</span>
                <span>{getFormattedDateString(new Date(data?.updatedOn))}</span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default memo(HistoryDataList);
