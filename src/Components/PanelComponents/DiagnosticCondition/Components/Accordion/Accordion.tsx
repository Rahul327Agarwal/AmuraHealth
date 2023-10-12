import { useSelector } from 'react-redux';
import { HUMAN_ICON, MACHINE_ICON } from '../../DiagnosticCondition.functions';
import { useStyles } from './Accordion.styles';
import { AccordionProps } from './Accordion.types';
import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import MUISkeleton  from '../../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { doesUserHaveClickAccess } from '../../../../../Utilities/AccessPermissions';
import { IRootState } from '../../../../../DisplayFramework/State/store';

export default function Accordion(props: AccordionProps) {
  const {
    isLoading,
    title,
    machineIcon,
    humanIcon,
    description,
    onAccordionTitleClicked,
    children,
    onHumanIconClick,
    onThreeDotMenuSelect,
    openAccordion,
    setAccordionOpen,
  } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );

  let checkAccessForClickIcons = doesUserHaveClickAccess(accessPermissionsForThisClient, 'Diagnosis', 'Diagnosis.2A');

  return (
    <div className={classes.accordionContainer}>
      <div className={'header'}>
        <div className={`arrowIcon`}>{MACHINE_ICON[machineIcon] || ''}</div>
        <div className="headerBox">
          <div className="contentBox">
            <div className={`${commonClasses.body17Medium} title`} onClick={() => setAccordionOpen(!openAccordion)}>
              {title}
            </div>
            <div className="diagnosticIcon">{''}</div>
            <div
              className={checkAccessForClickIcons ? 'diagnosticIcon' : 'disableCursorStyle'}
              onClick={(e) => {
                e.stopPropagation();
                if (checkAccessForClickIcons) onHumanIconClick();
              }}
            >
              {HUMAN_ICON[humanIcon] || ''}
            </div>
            {/* <div className="tripledotIcon">
              <ThreeDotMenu
                isDivider
                options={[{ label: 'Add a biomarker', value: 'ADD_BIOMRAKER', icon: PlusIcon }]}
                handleClick={onThreeDotMenuSelect}
              />
            </div> */}
          </div>
          {openAccordion && !isLoading ? (
            <div
              className={`${commonClasses.body15Regular} description`}
              onClick={(e) => {
                e.stopPropagation();
                onAccordionTitleClicked(e);
              }}
            >
              {description}
            </div>
          ) : null}
          {/* <div className={classes.linebarBox}>
            <div className="barlength" style={{ width: "70%", background: "#CC444B" }} />
            <div className="barlength" style={{ width: "30%", background: "#52B788" }} />
          </div> */}
        </div>
      </div>
      {openAccordion ? (
        <>
          {!isLoading ? (
            <>
              <div className={'childrenBody'}>
                <div></div>
                <div>{children}</div>
              </div>
              {/* <div className="bottomBox">
            <div className="bottomQuestion">How’s your knee pain?</div>
            <span className="buttonWrapper">
              <Button size="small" label={'Very high doctor'} handleClick={() => {}} />
            </span>{' '}
            <div className={classes.linebarBox}>
              <div className="barlength" style={{ width: '10%', background: '#CC444B' }} />
              <div className="barlength" style={{ width: '8%', background: '#F3752B' }} />
              <div className="barlength" style={{ width: '12%', background: '#F3752B' }} />
              <div className="barlength" style={{ width: '40%', background: '#CC444B' }} />
              <div className="barlength" style={{ width: '30%', background: '#52B788' }} />
            </div>{' '}
            <div className="bottomContentBox">
              <div className={`${commonClasses.caption12Medium} title`}>View doctor’s reply</div>
              <div className="diagnosticIcon">{getMachineIcon('YES')}</div>
              <div className="diagnosticIcon">{getHumanIcon('PAUSE')}</div>
            </div>
          </div> */}
            </>
          ) : (
            <MUISkeleton animation="wave" variant="rectangular" height="100px" width="100%" />
          )}
        </>
      ) : null}
    </div>
  );
}
