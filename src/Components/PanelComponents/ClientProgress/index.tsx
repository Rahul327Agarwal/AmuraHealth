import React from 'react';
import { useEffect, useState } from 'react';
import { getPatientObject } from './../../../Common/Common.functions';
import { EmptyChart, IEmptyChartData } from './ClientProgress.types';
import { PMS_LOCALE } from '../../../Utils';
import { makeStyles } from 'tss-react/mui';
import LineGraph from './LineGraph';
import { setGraphValues } from './ClientProgress.functions';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from './../../../DisplayFramework/State/store';
import PanelHeader  from '../../LibraryComponents/PanelHeaderForWhite/PanelHeaderForWhite';

interface IProps {
  injectComponent: any;
  patientId: string;
  topicSnippetClick?: any;
  registerEvent: any;
  unRegisterEvent: any;
  selectedClient: any;
  sessions: any;
}

const useStyles = makeStyles()(() => ({
  root: {
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
  },

  fromDate: {
    paddingLeft: '8px',
    paddingTop: '3px',
    height: '30px',
    background: '#F1F1F1',
    textAlign: 'left',
    color: '#252427',
  },

  toDate: {
    paddingRight: '8px',
    height: '30px',
    paddingTop: '3px',
    background: '#F1F1F1',
    textAlign: 'right',
    color: '#252427',
  },

  buttonStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    padding: '7.5px 0px 7.5px 0px',
    border: '1px solid black',
    cursor: 'pointer',
    fontSize: '12px !important',
    background: 'linear-gradient(180deg, #414344 0%, #2B2D2E 100%)',
    boxShadow: '0px 3px 5px rgb(0 0 0 / 40%), inset 0px 1px 0px rgb(255 255 255 / 30%)',
    borderRadius: '4px',
    height: '35px',
  },

  textDisplay: {
    color: '#252427',
    fontSize: '12px',
  },

  graphContainer: {
    height: 'calc(100% - 100px)',
    overflow: 'auto',
  },

  container: {
    height: 'inherit',
    backgroundColor: '#FFFFFF',
  },
}));

export default function ClientProgress(props: IProps) {
  const { patientId, registerEvent, unRegisterEvent, sessions, selectedClient } = props;
  const { classes } = useStyles();
  // const [data, setData] = useState(EmptyChart);

  const data = useSelector((state: IRootState) => state.dashboard.clienProgress);
  const clientId = useSelector((state: IRootState) => state.dashboard.patientId);
  const dispatch = useDispatch();
  const [weight, setWeight] = useState<IEmptyChartData>({} as IEmptyChartData);
  const [glucose, setGlucose] = useState<IEmptyChartData>({} as IEmptyChartData);
  const [bpData, setBPData] = useState<IEmptyChartData>({} as IEmptyChartData);
  const [weightIndex, setWeightIndex] = useState(1);
  const [glucoseIndex, setGlucoseIndex] = useState(1);
  const [loadingFlag, setLoadingFlag] = useState(data?.Dates?.length === 0 ? true : false);

  let clientProgressSubscription: any;

  const { Glucose, BP_DIA, BP_SYS, Weight, Dates, StartDate, EndDate } = data;

  const glucoseMeasurement: any = Glucose?.Measurements.length > 0 ? Glucose?.Measurements : [];
  const bpSYSMeasurement: any = BP_SYS?.Measurements.length > 0 ? BP_SYS?.Measurements : [];
  const bpDIAMeasurement: any = BP_DIA?.Measurements.length > 0 ? BP_DIA?.Measurements : [];
  const weightMeasurement: any = Weight?.Measurements.length > 0 ? Weight?.Measurements : [];
  useEffect(() => {
    if (data?.Dates?.length === 0) {
      getPatientObject(
        `pms-ql-patient-progress/${clientId}/patientProgress.json`,
        dispatch,
        setLoadingFlag,
        sessions,
        selectedClient,
        EmptyChart
      );
    }
    clientProgressSubscription = registerEvent(clientId, 'pms-ql-patient-progress', () => {
      getPatientObject(
        `pms-ql-patient-progress/${clientId}/patientProgress.json`,
        dispatch,
        setLoadingFlag,
        sessions,
        selectedClient,
        EmptyChart
      );
      setWeightIndex(1);
      setGlucoseIndex(1);
    });
    return () => {
      unRegisterEvent(clientProgressSubscription);
    };
  }, [patientId]);

  useEffect(() => {
    // data;
    setWeight(setGraphValues(Dates, weightMeasurement?.length > 0 ? weightMeasurement[0] : {}, ''));
    setGlucose(setGraphValues(Dates, glucoseMeasurement?.length > 0 ? glucoseMeasurement[0] : {}, ''));
    setBPData(
      setGraphValues(
        Dates,
        bpSYSMeasurement?.length > 0 ? bpSYSMeasurement[0] : {},
        bpDIAMeasurement?.length > 0 ? bpDIAMeasurement[0] : {}
      )
    );
  }, [data]);

  const dataSetOfWeight = weight?.datasets?.length > 0 && weight.datasets[0]?.data?.length > 0 ? weight.datasets[0]?.data : [];

  let firstValue = null;
  let lastValue = null;
  for (let i = 0; i < dataSetOfWeight.length; i++) {
    if (dataSetOfWeight[i] && !firstValue) {
      firstValue = dataSetOfWeight[i];
    }
    if (dataSetOfWeight[dataSetOfWeight.length - 1 - i] && !lastValue) {
      lastValue = dataSetOfWeight[dataSetOfWeight.length - 1 - i];
    }
  }
  const isGlucoseExists =
    glucoseMeasurement.length > 0
      ? glucoseMeasurement[0]?.Values?.filter((eachValue: any) => eachValue !== '' && eachValue !== null).length !== 0
      : false;
  const isWeightExists =
    weightMeasurement.length > 0
      ? weightMeasurement[0]?.Values?.filter((eachValue: any) => eachValue !== '' && eachValue !== null).length !== 0
      : false;
  const isBPSysExists =
    bpSYSMeasurement.length > 0
      ? bpSYSMeasurement[0]?.Values?.filter((eachValue: any) => eachValue !== '' && eachValue !== null).length !== 0
      : false;
  const isBPDiaExists =
    weightMeasurement.length > 0
      ? bpDIAMeasurement[0]?.Values?.filter((eachValue: any) => eachValue !== '' && eachValue !== null).length !== 0
      : false;
  return (
    <div className={classes.container}>
      <PanelHeader
        injectComponent={props.injectComponent}
        title={PMS_LOCALE.translate('Daily Progress')}
        loadingFlag={loadingFlag}
      />
      {StartDate && EndDate ? (
        <div className={classes.root}>
          <div className={classes.fromDate}>{`From ${StartDate}`}</div>
          <div className={classes.toDate}>{`To ${EndDate}`}</div>
        </div>
      ) : (
        ''
      )}
      <div className={classes.graphContainer}>
        {isGlucoseExists || isWeightExists || isBPDiaExists || isBPSysExists ? (
          <>
            <LineGraph
              isDisabled={isWeightExists}
              title="Weight"
              messageProps={
                firstValue && lastValue
                  ? ` ${Number(firstValue) % 1 === 0 ? Number(firstValue) : Number(firstValue).toFixed(2)} ${weight.units} to ${
                      Number(lastValue) && Number(lastValue) % 1 === 0 ? Number(lastValue) : Number(lastValue).toFixed(2)
                    } ${weight.units}`
                  : ''
              }
              buttonProps={
                weight.units ? (
                  <div
                    onClick={() => {
                      setWeightIndex(weightMeasurement.length - 1 > weightIndex ? weightIndex + 1 : 0);
                      setWeight(setGraphValues(Dates, weightMeasurement?.length > 0 ? weightMeasurement[weightIndex] : [], ''));
                    }}
                    className={classes.buttonStyle}
                  >
                    {weight.units}
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginLeft: '6px' }}
                    >
                      <path
                        d="M0.86501 4.10252C0.663486 4.30405 0.663486 4.63992 0.86501 4.77427C1.06653 4.97579 1.33523 4.97579 1.53675 4.77427L4.08938 2.08729L6.64201 4.77427C6.84353 4.97579 7.11223 4.97579 7.31375 4.77427C7.51527 4.57275 7.51527 4.23687 7.31375 4.10252L4.42525 1.07968C4.35808 1.0125 4.22373 0.94533 4.08938 0.94533C3.95503 0.94533 3.82068 1.0125 3.75351 1.07968L0.86501 4.10252ZM7.31375 7.86429C7.51527 7.66277 7.51527 7.32689 7.31375 7.19255C7.11223 6.99102 6.84353 6.99102 6.64201 7.19255L4.08938 9.87952L1.53675 7.19255C1.33523 6.99102 1.06653 6.99102 0.86501 7.19255C0.663486 7.39407 0.663486 7.72994 0.86501 7.86429L3.75351 10.8871C3.82068 10.9543 3.95503 11.0215 4.08938 11.0215C4.22373 11.0215 4.35808 10.9543 4.42525 10.8871L7.31375 7.86429Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                ) : (
                  ' '
                )
              }
              data={weight}
            />
            <LineGraph
              isDisabled={isGlucoseExists}
              title="FBG"
              buttonProps={
                glucose.units ? (
                  <div
                    onClick={() => {
                      setGlucoseIndex(glucoseMeasurement.length - 1 > glucoseIndex ? glucoseIndex + 1 : 0);
                      setGlucose(
                        setGraphValues(Dates, glucoseMeasurement?.length > 0 ? glucoseMeasurement[glucoseIndex] : [], '')
                      );
                    }}
                    className={classes.buttonStyle}
                  >
                    {glucose.units}
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginLeft: '6px' }}
                    >
                      <path
                        d="M0.86501 4.10252C0.663486 4.30405 0.663486 4.63992 0.86501 4.77427C1.06653 4.97579 1.33523 4.97579 1.53675 4.77427L4.08938 2.08729L6.64201 4.77427C6.84353 4.97579 7.11223 4.97579 7.31375 4.77427C7.51527 4.57275 7.51527 4.23687 7.31375 4.10252L4.42525 1.07968C4.35808 1.0125 4.22373 0.94533 4.08938 0.94533C3.95503 0.94533 3.82068 1.0125 3.75351 1.07968L0.86501 4.10252ZM7.31375 7.86429C7.51527 7.66277 7.51527 7.32689 7.31375 7.19255C7.11223 6.99102 6.84353 6.99102 6.64201 7.19255L4.08938 9.87952L1.53675 7.19255C1.33523 6.99102 1.06653 6.99102 0.86501 7.19255C0.663486 7.39407 0.663486 7.72994 0.86501 7.86429L3.75351 10.8871C3.82068 10.9543 3.95503 11.0215 4.08938 11.0215C4.22373 11.0215 4.35808 10.9543 4.42525 10.8871L7.31375 7.86429Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                ) : (
                  ''
                )
              }
              data={glucose}
            />
            <LineGraph
              isDisabled={isBPDiaExists || isBPSysExists}
              title="FBP"
              buttonProps={<div className={classes.textDisplay}>{bpData.units ? 'mmHg' : ''}</div>}
              data={bpData}
            />
          </>
        ) : (
          <div>
            <span
              style={{
                display: 'block',
                width: '50%',
                margin: '70% auto',
                textAlign: 'center',
                color: '#252427',
                wordBreak: 'break-word',
              }}
              title={'No data avaliable'}
            >
              No data avaliable
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
