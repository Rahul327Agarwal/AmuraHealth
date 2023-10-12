import { Dispatch, MutableRefObject, RefObject, SetStateAction } from 'react';
import { TDataPointN } from './Components/Graph/Graph.types';
import { TLineObject } from './Components/GraphRuler/GraphRuler.types';
import { TStackedDataPoint } from './Components/StackedBar/StackedBar.types';

export interface IHomeProps {
  childEventTrigger?: any;
  injectComponent: any;
  patientId: string;
  registerEvent: any;
  unRegisterEvent: any;
  selectedClient: any;
  sessions: any;
  panel: any;
  selectedTenant: any;
  topicSnippetClick: Function;
}

export type actionsType = 'DECISION' | 'ADD_CONDITION' | 'ADD_PRESCRIPTION' | 'ADD_BIOMARKER' | 'CONDITION_HISTORY';

export interface DiagnosticConditionProps extends IHomeProps {
  setActiontype: Dispatch<SetStateAction<actionsType>>;
  setSelectedCondition: Dispatch<SetStateAction<Partial<IConditionObject>>>;
  selectedCondition: Partial<IConditionObject>;
}

export interface AddConditionProps extends IHomeProps {
  setActiontype: Dispatch<SetStateAction<actionsType>>;
  conditionOptions: Array<IConditionOptions>;
}

export interface IConditionOptions {
  label: string;
  value: string;
  ConditionId: string;
  StageId: string;
}
export interface IAddBiomarker extends IHomeProps {
  setActiontype: Dispatch<SetStateAction<actionsType>>;
  setSelectedCondition: Dispatch<SetStateAction<Partial<IConditionObject>>>;
  selectedCondition: Partial<IConditionObject>;
  patientBiomarker: Array<IBiomarkers>;
}

export interface IConditionHistoryProp extends IHomeProps {
  setActiontype: Dispatch<SetStateAction<actionsType>>;
  setSelectedCondition: Dispatch<SetStateAction<Partial<IConditionObject>>>;
  selectedCondition: Partial<IConditionObject>;
  modifedBiomarkers?: any;
}

export interface IBiomarkers {
  biomarkerId: string;
  biomarkerName: string;
  values: Array<any>;
}

export interface IDefaultAddCondition {
  Condition: string;
  Description: string;
  ConditionId: string;
  StageId: string;
}

export const defaultAddCondition: IDefaultAddCondition = {
  Condition: '',
  Description: '',
  ConditionId: '',
  StageId: '',
};

export type TRange = '1h' | '1d' | '1w' | '2w' | '1m' | '3m' | '6m' | '1y' | '2y' | '5y' | '25y';

export type TLineRange = 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years' | 'graph' | 'stackedBar';
export interface IFilterObject {
  shortKey: TRange;
  label: string;
  time: number;
}

export type TimeLineValue = Partial<Record<TLineRange, TLineObject>>;

export type GraphTimeLine = Record<TRange, TimeLineValue>;
export type RulerTimeLine = Record<TRange, Partial<Record<TLineRange, boolean>>>;

export interface IDateRangeState {
  viewMinDate: number;
  viewMaxDate: number;
  minDate: number;
  maxDate: number;
  tempMinDate: number;
  tempMaxDate: number;
  selectedFilter: TRange;
}

export interface IOpenAccordion {
  [conditionId: string]: boolean;
}

export interface IIsLoading {
  [conditionId: string]: boolean;
}
export const emptyIConditions = (): IDiagnosisCondition => ({
  Conditions: [],
  allConditions: [],
  BiomarkerUpdateOn: new Date().getTime(),
});

export const EmptyIDiagnosisCondition = emptyIConditions();

export interface IDiagnosisCondition {
  Conditions: Array<IConditionObject>;
  PatientId?: string;
  allConditions: Array<any>;
  BiomarkerUpdateOn: number;
}

export type TDiagnosisType = 'PAUSE' | 'YES' | 'NO';
export interface IConditionObject {
  ConditionId: string;
  Name: string;
  Stage: string;
  StageId: string;
  IsPrescribed: number;
  IsAvailableInActivePrescription: number;
  IsActive: number;
  MachineDiagnosis: string;
  DiagnosisExplanation: string;
  Symptoms: Array<ISymptom>;
  HumanDiagnosis: {
    diagnosis: TDiagnosisType;
    updated_by: string;
    updated_on: string;
    explanation?: string;
    history: Array<IHistoryBiomaker>;
  };
  Biomarkers: Array<IBiomarker>;
  conditionBiomarkers: TConditionBiomarkers;
  surveyQusResponses: TSurveyQusResponses[];
}

export type TConditionBiomarkers = Record<string, IBiomarkerData>;
export interface IConditionObjectResponse extends Omit<IConditionObject, 'conditionBiomarkers' | 'surveyQusResponses'> {
  conditionBiomarkers: {
    [conditionId: string]: {
      groupName: string;
      type: string;
      values: IBiomarkerValuesResponse[];
    };
  };
  surveyQusResponses: {
    surveyQuestion: string;
    answers: TAnswers[];
    questionId: string;
  }[];
}

export interface IBiomarkerValuesResponse {
  unitId: string;
  value: string;
  updatedOn: string;
}

export interface TAnswers {
  surveyDate: string;
  distributionId: string;
  surveyAnswer: string;
}
export interface TSurveyQusResponses {
  surveyQuestion: string;
  answers: TAnswers[];
  datapoints: TStackedDataPoint[];
  questionId: string;
}

export type TQuesColorMap = Record<string, string>;

export interface IBiomarkerData {
  groupName: string;
  type: string;
  values: IBiomarkerValuesResponse[];
  datapoints: TDataPointN[];
}

export interface IHistoryBiomaker {
  updated_by: string;
  updated_on: string;
  diagnosis: TDiagnosisType;
  updated_by_id?: string;
  explanation?: string;
}
export interface IBiomarker {
  Name: string;
  Id: string;
  UpdatedBy: string;
  UpdatedOn: string;
}

export interface ISymptom {
  Id: string;
  Name: string;
  NameinEnglish: string;
  Intensity: string;
  Date: string;
  MachineDiagnosis: any;
  HumanDiagnosis: any;
  History: string;
}

export interface IDraggableElementProps {
  dateRange: IDateRangeState;
  openAccordion: IOpenAccordion;
  verticalBarRef: RefObject<HTMLDivElement>;
  selectedFilter: IFilterObject;
  tooltipRef: MutableRefObject<TTooltipData>;
  graphsDataRef: MutableRefObject<TGraphsData>;
  quesBarTooltipRef: MutableRefObject<TQuesBarTooltipData>;
  quesBarDataRef: MutableRefObject<TQuesBarData>;
}

export type TGraphsData = Record<
  string,
  {
    datapoints: TDataPointN[];
    yMin: number;
    yMax: number;
  }
>;

export type TTooltipData = Record<string, MutableRefObject<HTMLDivElement>>;

export type TQuesBarData = Record<
  string,
  {
    datapoints: TStackedDataPoint[];
    xMin: number;
    xMax: number;
  }
>;

export type TQuesBarTooltipData = Record<string, MutableRefObject<HTMLDivElement>>;
