import { useEffect, useState } from 'react';
import { PMS_LOCALE } from '../../../../../Utils';
import SliderMaterialUI from '../Components/SliderMaterialUI';
import { formattingConditions, updateConditions } from './PrescriptionConditions.functions';
import { useStyles } from './PrescriptionConditions.styles';
import { IProps } from './PrescriptionConditions.types';

export default function PrescriptionConditions(props: IProps) {
  const { conditions, setTreatedConditions, prescriptionLength, prescriptionKey } = props;
  const [conditionData, setConditionData] = useState([]);

  useEffect(() => {
    setConditionData(formattingConditions(conditions, prescriptionLength, prescriptionKey));
  }, [conditions]);

  useEffect(() => {
    setTreatedConditions(conditionData);
  }, [conditionData]);

  const { classes } = useStyles();
  return (
    <div className={classes.prescriptioncmpsection}>
      <div className={classes.prescriptionCard}>
        <div>
          <h3 className={classes.conditionHeader}>{PMS_LOCALE.translate('Conditions')}</h3>
        </div>
        {conditionData?.length > 0 ? (
          conditionData.map((conditionObj, index) => (
            <div className={classes.conditionContainer}>
              <div className={`${classes.textOverflow} ${classes.conditionTitle}`}>
                <span
                  title={`${conditionObj.ConditionName} ${conditionObj.ConditionStageId ? conditionObj.ConditionStageId : ''}`}
                >
                  {PMS_LOCALE.translate(
                    `${conditionObj.ConditionName}   ${conditionObj.ConditionStageId ? conditionObj.ConditionStageId : ''}`
                  )}
                </span>
              </div>
              <SliderMaterialUI
                disableSlider={prescriptionKey ? true : false}
                value={JSON.parse(JSON.stringify(conditionObj.daysRange))}
                handleChange={(value) => {
                  setConditionData(updateConditions(value, conditionObj.ConditionId, conditionData));
                }}
                initialIndex={conditionObj.startDate}
                lastIndex={conditionObj.endDate}
              />
              <div className={classes.daysLabel}>
                <span title={`Day ${conditionObj.daysRange[0]} - Day ${conditionObj.daysRange[1]}`}>
                  {PMS_LOCALE.translate(`Day ${conditionObj.daysRange[0]} - Day ${conditionObj.daysRange[1]}`)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.noConditions}>
            <span>{PMS_LOCALE.translate('No Conditions assigned.')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
