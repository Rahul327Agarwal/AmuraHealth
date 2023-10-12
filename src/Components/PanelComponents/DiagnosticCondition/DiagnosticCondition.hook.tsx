import moment from 'moment';
import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import { setAppliedConditionsNew, setHealthType } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from '../../../DisplayFramework/State/store';
import { TDataPointN } from './Components/Graph/Graph.types';
import { Y_PADDING } from './Components/Graph/Graph.utils';
import { TStackedDataPoint } from './Components/StackedBar/StackedBar.types';
import {
  dummy_surveyQusResponses,
  getDiagnosticCondition,
  getQuesColors,
  getUniqueGraphkey,
  getUserInformation,
  updateHealthType,
} from './DiagnosticCondition.functions';
import {
  DiagnosticConditionProps,
  IBiomarkerValuesResponse,
  IConditionObject,
  IConditionObjectResponse,
  IDateRangeState,
  IIsLoading,
  TGraphsData,
  TQuesBarData,
  TQuesBarTooltipData,
  TQuesColorMap,
  TTooltipData,
  emptyIConditions,
} from './DiagnosticCondition.types';
import { DEFAULT_DATE_RANGE, getFirstOfNextMonth } from './DiagnosticCondition.utils';

const useCondition = (props: DiagnosticConditionProps) => {
  const { patientId, registerEvent, unRegisterEvent, sessions } = props;

  const dispatch = useDispatch();
  const { id: panelId } = useCurrentPanel();
  const tooltipRef = useRef<TTooltipData>({});
  const graphsDataRef = useRef<TGraphsData>({});
  const quesBarDataRef = useRef<TQuesBarData>({});
  const quesBarTooltipRef = useRef<TQuesBarTooltipData>({});

  const appliedConditions = useSelector((state: IRootState) => state.dashboard.appliedConditionsNew);

  const [isLoading, setIsLoading] = useState<IIsLoading>({ mainAccordion: false });
  const [showAllConditions, setShowAllConditions] = useState(false);
  const [dateRange, setDateRange] = useState<IDateRangeState>(DEFAULT_DATE_RANGE);
  const [quesColorMap, setQuesColorMap] = useState<TQuesColorMap>({});

  const diagnosticData = useMemo(() => {
    const conditions = appliedConditions.Conditions?.filter(
      (data, index) => index === appliedConditions.Conditions.findIndex((d) => d.ConditionId === data.ConditionId)
    );
    if (showAllConditions) return conditions;
    return conditions?.filter((data) => data.IsPrescribed === 0 || data.MachineDiagnosis === 'YES');
  }, [appliedConditions.Conditions, showAllConditions]);

  let subscription: any;
  useEffect(() => {
    getDescisionCondition();
    getUserInformation(props)
      .then((res) => {
        if (res) {
          dispatch(setHealthType(res));
        } else {
          dispatch(setHealthType('Normal'));
          updateHealthType(panelId, props, 'Normal');
        }
      })
      .catch(() => {
        dispatch(setHealthType('Normal'));
        updateHealthType(panelId, props, 'Normal');
      });
    subscription = registerEvent(patientId, 'pms-ql-diagnostic-decision', () => {
      getDescisionCondition();
    });
    return () => {
      unRegisterEvent(subscription);
    };
  }, [patientId]);

  useEffect(() => {
    if (!sessions) return;
    getQuesColors(sessions).then((res) => {
      setQuesColorMap(res || {});
    });
  }, [sessions]);

  const getDescisionCondition = async () => {
    try {
      setIsLoading((pre) => ({ ...pre, mainAccordion: true }));
      const response = await getDiagnosticCondition(props);
      if (!response?.conditions) return;

      const _graphsDataRef: TGraphsData = {};
      const _tooltipRef: TTooltipData = {};
      const _quesBarDataRef: TQuesBarData = {};
      const _quesBarTooltipRef: TQuesBarTooltipData = {};

      let minDate: number | undefined;
      let maxDate: number | undefined;
      const Conditions: IConditionObject[] = response?.conditions?.map((data: IConditionObjectResponse) => {
        const conditionBiomarkers: any = {};

        Object.entries(data?.conditionBiomarkers || {})?.forEach(([biomarkerName, biomarker]) => {
          const _datapoints: TDataPointN[] = [];
          const sortedValues = [...biomarker?.values].sort((a: IBiomarkerValuesResponse, b: IBiomarkerValuesResponse) => {
            return new Date(a.updatedOn).getTime() - new Date(b.updatedOn).getTime();
          });

          sortedValues.forEach((data) => {
            if (!isNaN(Number(data.value))) {
              _datapoints.push({
                x: new Date(data.updatedOn).getTime(),
                y: Number(data.value),
                yOriginal: data.value,
              });
            }
          });

          const xMin = _datapoints.at(0)?.x;
          const xMax = _datapoints.at(-1)?.x;

          let yMin = Math.min(..._datapoints.map((p) => p.y));
          let yMax = Math.max(..._datapoints.map((p) => p.y));

          yMin -= Y_PADDING;
          yMax += Y_PADDING;

          const datapoints: TDataPointN[] = _datapoints.map((p) => ({
            x: p.x,
            y: (p.y - yMin) / (yMax - yMin),
            yOriginal: p.yOriginal,
          }));

          if (!minDate && xMin) {
            minDate = xMin;
          }
          if (!maxDate && xMax) {
            maxDate = xMax;
          }
          if (minDate && xMin) {
            minDate = minDate <= xMin ? minDate : xMin;
          }
          if (maxDate && xMax) {
            maxDate = maxDate >= xMax ? maxDate : xMax;
          }

          const uniqueId = getUniqueGraphkey(data.Name, data.Stage, biomarkerName);

          _graphsDataRef[uniqueId] = { datapoints, yMax, yMin };
          _tooltipRef[uniqueId] = createRef();

          conditionBiomarkers[biomarkerName] = { ...biomarker, datapoints };
        });

        const surveyQusResponses =
          data?.surveyQusResponses?.map((v) => {
            // dummy_surveyQusResponses?.map((v) => {
            const uniqueQuesId = getUniqueGraphkey(data.Name, data.Stage, v.questionId);
            _quesBarTooltipRef[uniqueQuesId] = createRef();
            const datapoints: TStackedDataPoint[] =
              v.answers.map((a) => {
                return {
                  id: a.distributionId,
                  x: new Date(a.surveyDate).getTime(),
                  xLabel: a.surveyAnswer,
                };
              }) || [];
            datapoints.sort((a, b) => a.x - b.x);
            const xMin = datapoints.at(0).x;
            const xMax = new Date().getTime();
            _quesBarDataRef[uniqueQuesId] = { datapoints, xMin, xMax };
            return { ...v, datapoints };
          }) || [];

        return { ...data, conditionBiomarkers, surveyQusResponses };
      });
      minDate = minDate ? new Date(new Date(minDate).setHours(0, 0, 0, 0)).setDate(1) : undefined;
      maxDate = maxDate ? new Date(moment(maxDate).add(1, 'month').toDate().setHours(0, 0, 0, 0)).setDate(1) : undefined;
      const _viewMaxDate = getFirstOfNextMonth(1);
      maxDate = maxDate >= _viewMaxDate ? maxDate : _viewMaxDate;

      tooltipRef.current = _tooltipRef;
      graphsDataRef.current = _graphsDataRef;
      quesBarDataRef.current = _quesBarDataRef;
      quesBarTooltipRef.current = _quesBarTooltipRef;

      setDateRange((pre) => ({
        ...pre,
        maxDate,
        minDate,
        tempMaxDate: maxDate,
        tempMinDate: minDate,
        // viewMaxDate: maxDate,
      }));
      const EmptyIDiagnosisCondition = emptyIConditions();
      dispatch(setAppliedConditionsNew(JSON.parse(JSON.stringify({ ...EmptyIDiagnosisCondition, Conditions }))));
    } finally {
      setIsLoading((pre) => ({ ...pre, mainAccordion: false }));
    }
  };

  return {
    quesColorMap,
    appliedConditions,
    diagnosticData,
    dateRange,
    isLoading,
    graphsDataRef,
    tooltipRef,
    quesBarDataRef,
    quesBarTooltipRef,
    setDateRange,
  };
};

export default useCondition;
