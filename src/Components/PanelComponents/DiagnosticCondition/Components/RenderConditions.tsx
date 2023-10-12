import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { setAppliedConditionsNew } from '../../../../DisplayFramework/State/Slices/DashboardSlice';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { AddCircleIcon } from '../../../SVGs/Common';
import {
  getConditionTitle,
  getUniqueGraphkey,
  getUpdateStatusObject,
  updateConditionStatus,
} from '../DiagnosticCondition.functions';
import { HistoryIcon } from '../DiagnosticCondition.svg';
import {
  DiagnosticConditionProps,
  IBiomarkerData,
  IConditionObject,
  IDateRangeState,
  IDiagnosisCondition,
  IIsLoading,
  IOpenAccordion,
  TQuesBarTooltipData,
  TQuesColorMap,
  TTooltipData,
} from '../DiagnosticCondition.types';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../DiagnosticCondition.utils';
import Accordion from './Accordion/Accordion';
import AddReasonDrawer from './AddReasonDrawer/AddReasonDrawer';
import { ISubmitData } from './AddReasonDrawer/AddReasonDrawer.types';
import { useStyles } from './Components.styles';
import { Graph } from './Graph/Graph';
import InvestigationDrawer from './InvestigationDrawer/InvestigationDrawer';
import StackedBar from './StackedBar/StackedBar';
import InViewWrapper from './InViewWrapper';

interface IProps extends DiagnosticConditionProps {
  appliedConditions: IDiagnosisCondition;
  isLoading: IIsLoading;
  checkAccessForAddData: boolean;
  openAccordion: IOpenAccordion;
  setOpenAccordion: Dispatch<SetStateAction<IOpenAccordion>>;
  dateRange: IDateRangeState;
  diagnosticData: IConditionObject[];
  tooltipRef: MutableRefObject<TTooltipData>;
  quesBarTooltipRef: MutableRefObject<TQuesBarTooltipData>;
  quesColorMap: TQuesColorMap;
}

const RenderConditions = (props: IProps) => {
  const {
    setActiontype,
    selectedCondition,
    setSelectedCondition,
    appliedConditions,
    isLoading,
    checkAccessForAddData,
    openAccordion,
    setOpenAccordion,
    dateRange,
    diagnosticData,
    tooltipRef,
    quesBarTooltipRef,
    quesColorMap,
  } = props;
  const { classes } = useStyles(props);
  const dispatch = useDispatch();
  const commonClasses = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const [statusChangeState, setStatusChangeState] = useState({ open: false, existingStatus: '' });
  const [drawerState, setDrawerState] = useState<{ open: boolean; payload: any }>({ open: false, payload: {} });

  const onAccordionTitleClicked = (e, currData: IConditionObject) => {
    e.stopPropagation();
    setDrawerState({
      open: true,
      payload: {
        title: getConditionTitle(currData?.Name, currData?.Stage),
        description: currData?.DiagnosisExplanation,
        userId: currData?.HumanDiagnosis?.updated_by,
        updatedBy: currData?.HumanDiagnosis?.updated_by,
        updatedOn: currData?.HumanDiagnosis?.updated_on,
      },
    });
  };

  const onReasonDrawerClose = () => {
    setStatusChangeState((pre) => ({ ...pre, open: false }));
  };
  const onReasonDrawerSubmit = async (data: ISubmitData) => {
    const payload = {
      ConditionId: selectedCondition?.ConditionId,
      StageId: selectedCondition?.Stage,
      HumanDiagnosis: data.status,
      DiagnosisExplanation: data.reason,
    };
    const response = await updateConditionStatus(panelId, props, payload);
    if (response) {
      const Conditions = getUpdateStatusObject(appliedConditions.Conditions, response);
      dispatch(setAppliedConditionsNew({ ...appliedConditions, Conditions }));
    }
  };

  const handleAddData = (data: IConditionObject) => {
    setSelectedCondition(data);
    setActiontype('ADD_BIOMARKER');
  };
  const handleHistory = (data: IConditionObject) => {
    setSelectedCondition(data);
    setActiontype('CONDITION_HISTORY');
  };

  if (isLoading.mainAccordion) {
    return (
      <div className={classes.canvasAccordion}>
        <MUISkeleton animation="wave" variant="rectangular" height="90px" width="100%" />
        <MUISkeleton animation="wave" variant="rectangular" height="90px" width="100%" />
        <MUISkeleton animation="wave" variant="rectangular" height="90px" width="100%" />
        <MUISkeleton animation="wave" variant="rectangular" height="90px" width="100%" />
      </div>
    );
  }

  return (
    <>
      <section className={classes.scrollBody}>
        <div className={classes.canvasAccordion}>
          {diagnosticData?.map((data: IConditionObject) => {
            const key = getConditionTitle(data.Name, data.Stage);
            return (
              <Accordion
                key={key}
                title={key}
                machineIcon={data?.MachineDiagnosis || 'NO'}
                humanIcon={data?.HumanDiagnosis?.diagnosis}
                description={data?.DiagnosisExplanation}
                onHumanIconClick={() => {
                  setSelectedCondition(data);
                  setStatusChangeState({ open: true, existingStatus: data?.HumanDiagnosis?.diagnosis });
                }}
                onAccordionTitleClicked={(e) => onAccordionTitleClicked(e, data)}
                isLoading={isLoading[key]}
                onThreeDotMenuSelect={() => {}}
                openAccordion={Boolean(openAccordion[key])}
                setAccordionOpen={(isopen: boolean) => setOpenAccordion((pre) => ({ ...pre, [key]: isopen }))}
              >
                {Object.entries(data?.conditionBiomarkers || {})?.map(([biomarkerName, biomarker]: [string, IBiomarkerData]) => {
                  if (!biomarker) return null;
                  const uniqueId = getUniqueGraphkey(data.Name, data.Stage, biomarkerName);
                  return (
                    <div className={classes.graphBox}>
                      <InViewWrapper
                        fallbackUI={
                          <MUISkeleton animation="wave" variant="rectangular" height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />
                        }
                      >
                        <Graph
                          datapoints={biomarker?.datapoints || []}
                          dateRange={dateRange}
                          tooltipRef={tooltipRef.current[uniqueId]}
                        />
                      </InViewWrapper>
                      <div className={`${commonClasses.body15Medium} ${classes.biomarkerName}`}>{biomarkerName} </div>
                    </div>
                  );
                })}
                {data.surveyQusResponses?.map((qes) => {
                  const uniqueId = getUniqueGraphkey(data.Name, data.Stage, qes.questionId);
                  return (
                    <div className={classes.questionGrapBox}>
                      <InViewWrapper
                        fallbackUI={<MUISkeleton animation="wave" variant="rectangular" height={8} width={CANVAS_WIDTH} />}
                      >
                        <StackedBar
                          width={CANVAS_WIDTH}
                          height={8}
                          datapoints={qes.datapoints}
                          dateRange={dateRange}
                          tooltipRef={quesBarTooltipRef.current[uniqueId]}
                          configOption={{
                            showTimeLine: true,
                          }}
                          quesColorMap={quesColorMap}
                        />
                      </InViewWrapper>
                      <div className={`${commonClasses.body15Medium} ${classes.biomarkerName}`}>{qes.surveyQuestion || ''} </div>
                    </div>
                  );
                })}
                <div className={classes.bottomButtonWrapper}>
                  {checkAccessForAddData ? (
                    <MUIButton onClick={() => handleAddData(data)} startIcon={<AddCircleIcon />}>
                      Add Data
                    </MUIButton>
                  ) : (
                    <span></span>
                  )}
                  <MUIButton onClick={() => handleHistory(data)} startIcon={<HistoryIcon />}>
                    Edit History
                  </MUIButton>
                </div>
              </Accordion>
            );
          })}
        </div>
      </section>
      <InvestigationDrawer
        open={drawerState.open}
        onClose={() => setDrawerState((pre) => ({ ...pre, open: false }))}
        title={drawerState?.payload?.title}
        description={drawerState?.payload?.description}
        userId={drawerState?.payload?.userId}
        updatedBy={drawerState?.payload?.updatedBy}
        updatedOn={drawerState?.payload?.updatedOn}
      />
      {statusChangeState.open && (
        <AddReasonDrawer
          open={statusChangeState.open}
          onClose={onReasonDrawerClose}
          onSubmitModal={onReasonDrawerSubmit}
          headerTitle={'Reason for updating'}
          existingStatus={statusChangeState.existingStatus}
        />
      )}
    </>
  );
};

export default RenderConditions;
