import { Fab } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { IRootState } from '../../../DisplayFramework/State/store';
import { doesUserHaveClickAccess } from '../../../Utilities/AccessPermissions';
import TabSwiper from '../../LibraryComponents/GrabSwiper/GrabSwiper';
import MUIButton from '../../LibraryComponents/MUIButton/MUIButton';
import PageHeader from '../../LibraryComponents/PageHeader/PageHeader';
import ThreeDotMenu from '../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import { BackArrowIcon, PlusIcon } from '../../SVGs/Common';
import DraggableElement from './Components/DraggableElement';
import { GraphRuler } from './Components/GraphRuler/GraphRuler';
import RenderConditions from './Components/RenderConditions';
import { ACTION_OPTIONS_DIAGNOSTIC, getConditionTitle } from './DiagnosticCondition.functions';
import useCondition from './DiagnosticCondition.hook';
import { useStyles } from './DiagnosticCondition.styles';
import { DiagnosticConditionProps, IConditionObject, IFilterObject, IOpenAccordion } from './DiagnosticCondition.types';
import { CANVAS_WIDTH, DEFAULT_FILTER, DRAGGABLE_BAR_MAX, FILTER_BUTTONS, RULER_HEIGHT } from './DiagnosticCondition.utils';
import { ExpandIcon, ExpandIcon2 } from './DiagnosticCondition.svg';

const DiagnosticCondition = (props: DiagnosticConditionProps) => {
  const { setActiontype, topicSnippetClick } = props;
  const { classes } = useStyles(props);
  const verticalBarRef = useRef<HTMLDivElement>(null);

  const [selectedFilter, setSelectedFilter] = useState<IFilterObject>(DEFAULT_FILTER);
  const [openAccordion, setOpenAccordion] = useState<IOpenAccordion>({});
  const [triggerRender, setTriggerRender] = useState(0);

  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );

  let checkAccessForClickPlus = doesUserHaveClickAccess(accessPermissionsForThisClient, 'Diagnosis', 'Diagnosis.3');
  let checkAccessForClickPrescription = doesUserHaveClickAccess(accessPermissionsForThisClient, 'Diagnosis', 'Diagnosis.3A');
  let checkAccessForClickCondition = doesUserHaveClickAccess(accessPermissionsForThisClient, 'Diagnosis', 'Diagnosis.3B');
  let checkAccessForAddData = doesUserHaveClickAccess(accessPermissionsForThisClient, 'Diagnosis', 'Diagnosis.2B');

  const {
    appliedConditions,
    diagnosticData,
    dateRange,
    isLoading,
    setDateRange,
    tooltipRef,
    graphsDataRef,
    quesBarDataRef,
    quesBarTooltipRef,
    quesColorMap,
  } = useCondition(props);

  const onFilterChange = (data: IFilterObject) => {
    const xPosition = Number(verticalBarRef.current.getAttribute('data-xposition') ?? DRAGGABLE_BAR_MAX);

    const xRadio = xPosition / CANVAS_WIDTH;
    const diffDate = dateRange.viewMaxDate - dateRange.viewMinDate;
    const focusTime = dateRange.viewMinDate + diffDate * xRadio;

    const c1 = data.time * xRadio;
    const c2 = data.time * (1 - xRadio);

    const _viewMinDate = focusTime - c1;
    const _viewMaxDate = focusTime + c2;

    setSelectedFilter(data);
    const tempMaxDate = Math.max(dateRange.maxDate, _viewMaxDate);
    const tempMinDate = Math.min(dateRange.minDate, _viewMinDate);
    setDateRange((pre) => ({
      ...pre,
      selectedFilter: data.shortKey,
      viewMinDate: _viewMinDate,
      viewMaxDate: _viewMaxDate,
      tempMaxDate,
      tempMinDate,
    }));
  };

  const handleExpand = () => {
    // if expanded view open
    if (diagnosticData.length === Object.keys(openAccordion).length) {
      setOpenAccordion({});
    } else {
      const tempObj = {};
      diagnosticData?.forEach((data: IConditionObject) => {
        const key = getConditionTitle(data.Name, data.Stage);
        tempObj[key] = 'isopen';
      });

      setOpenAccordion(tempObj);
    }
  };

  useEffect(() => {
    if (triggerRender > 10) return;
    const ele = document.querySelector(`#ID-${selectedFilter.shortKey}`);
    if (!ele) {
      setTimeout(() => {
        setTriggerRender((pre) => pre + 1);
      }, 500);
      return;
    }
    setTimeout(() => {
      ele.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }, 100);
  }, [selectedFilter.shortKey, triggerRender]);

  const goBack = useDFGoBack();

  return (
    <div className={classes.rootContainer}>
      <PageHeader
        startAdornment={
          <span className={classes.backButton}>
            <BackArrowIcon onClick={() => goBack('S')} />
          </span>
        }
        headerContent={'Diagnostic decision'}
        endAdornment={
          diagnosticData.length === Object.keys(openAccordion).length ? (
            <ExpandIcon onClick={handleExpand} />
          ) : (
            <ExpandIcon2 onClick={handleExpand} />
          )
        }
      />

      {diagnosticData.length ? (
        <>
          <div className={classes.filterButtonWrapper}>
            <TabSwiper>
              {FILTER_BUTTONS.map((data) => {
                const isSelected = selectedFilter.shortKey === data.shortKey;
                return (
                  <div
                    key={data.shortKey}
                    id={`ID-${data.shortKey}`}
                    onClick={() => {
                      if (isSelected) return;
                      onFilterChange(data);
                    }}
                  >
                    <MUIButton className={classes.filterButton} variant={isSelected ? 'outlined' : 'text'}>
                      <span className={classes.buttonLabelStyle}>
                        <span data-selected={isSelected} className={classes.labelStyle}>
                          {data.label}
                        </span>
                        <span data-selected={isSelected} className={classes.shortKeyStyle}>
                          {data.shortKey}
                        </span>
                      </span>
                    </MUIButton>
                  </div>
                );
              })}
            </TabSwiper>
          </div>
          <GraphRuler height={RULER_HEIGHT} width={CANVAS_WIDTH} dateRange={dateRange} setDateRange={setDateRange} />
          <DraggableElement
            dateRange={dateRange}
            openAccordion={openAccordion}
            verticalBarRef={verticalBarRef}
            selectedFilter={selectedFilter}
            tooltipRef={tooltipRef}
            graphsDataRef={graphsDataRef}
            quesBarTooltipRef={quesBarTooltipRef}
            quesBarDataRef={quesBarDataRef}
          />
        </>
      ) : null}
      <RenderConditions
        appliedConditions={appliedConditions}
        isLoading={isLoading}
        checkAccessForAddData={checkAccessForAddData}
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
        dateRange={dateRange}
        diagnosticData={diagnosticData}
        tooltipRef={tooltipRef}
        quesBarTooltipRef={quesBarTooltipRef}
        quesColorMap={quesColorMap}
        {...props}
      />
      <div className={classes.addButtonWrapper}>
        <ThreeDotMenu
          isRotate
          isDivider
          options={ACTION_OPTIONS_DIAGNOSTIC(checkAccessForClickCondition, checkAccessForClickPrescription)}
          disable={!checkAccessForClickPlus}
          handleClick={(event) => {
            if (event === 'ADD_PRESCRIPTION') {
              return topicSnippetClick('generatePrescription');
            }
            setActiontype(event);
          }}
          customStyle={classes.menuStyle}
          renderButton={
            <Fab className={checkAccessForClickPlus ? classes.actionButton : classes.disableActionButton}>{<PlusIcon />}</Fab>
          }
        />
      </div>
    </div>
  );
};
export default DiagnosticCondition;
