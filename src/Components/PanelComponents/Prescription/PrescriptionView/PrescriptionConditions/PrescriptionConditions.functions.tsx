export const updateConditions = (
  value: Array<number>,
  conditionId: string,
  conditionData: Array<any>
) => {
  let tempObj = JSON.parse(JSON.stringify(conditionData));
  tempObj.find((valueObj) => {
    if (valueObj.ConditionId === conditionId) {
      valueObj.daysRange = value;
    }
  });
  return tempObj;
};

export const formattingConditions = (
  conditions: Array<any>,
  prescriptionLength: string,
  prescriptionKey: string
) => {
  let tempObj = JSON.parse(JSON.stringify(conditions));
  let prescriptionDays = Number(prescriptionLength);
  tempObj.map((value) => {
    value.daysRange = [1, prescriptionDays];
    value.startDate = 1;
    value.endDate = prescriptionDays;
    if (prescriptionKey) {
      value.ConditionName = value.name;
      value.ConditionId = value.name;
      value.ConditionStageId = value.stage;
    }
  });
  tempObj.sort((a, b) => a.ConditionId?.localeCompare(b.ConditionId));
  return tempObj;
};
