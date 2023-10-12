import React, { useEffect, useState } from 'react';
import InputField from './../../../LibraryComponents/InputField/InputField';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import { useStyles } from './HealthObjective.styles';
import { IProps } from './HealthObjective.types';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { BackArrowIcon, Edit, HeartIcon } from '../ProfileManagement.svg';
import {
  AccountDetail,
  defaultPersonal,
  foodAndHealth,
  getPersonalProfileData,
  postPersonalData,
} from '../ProfileManagement.functions';
import { AccountDetailsType, FoodAndHealthType, IDefaultPersonalTypes } from '../ProfileManagement.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const HealthObjective = (props: IProps) => {
  const { patientId, childEventTrigger, registerEvent, unRegisterEvent } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [healthAndFoodState, setHealthAndFoodState] = useState<FoodAndHealthType>(foodAndHealth);
  const [personalState, setPersonalState] = useState<IDefaultPersonalTypes>(defaultPersonal);
  const [accountDetailsState, setAccountDetailsState] = useState<AccountDetailsType>(AccountDetail);
  const [isLoading, setIsLoading] = useState(true);
  const { id: panelId } = useCurrentPanel();
  const [editable, setEditable] = useState(false);
  const handleObjective = (e: any) => {
    const Objective = e.target.value;
    setHealthAndFoodState((pre) => ({ ...pre, Objective }));
  };
  useEffect(() => {
    let myCustomerSubscription: any;
    (async () => await getPersonalProfileDataCall())();
    myCustomerSubscription = registerEvent?.(patientId, 'pms-ql-user', async () => await getPersonalProfileDataCall());
    return () => {
      unRegisterEvent?.(myCustomerSubscription);
    };
  }, []);

  const getPersonalProfileDataCall = async () => {
    const response = await getPersonalProfileData(panelId, props, patientId);
    const { personalResponse, healthAndFoodResponse, accountDetailsResponse } = response || {};
    if (personalResponse) {
      setPersonalState(personalResponse);
    }
    if (healthAndFoodResponse) {
      setIsLoading(false);
      setHealthAndFoodState(healthAndFoodResponse);
    }
    if (accountDetailsResponse) {
      setAccountDetailsState(accountDetailsResponse);
    }
  };

  const innerRef = React.useRef<any>(null);

  const handleSave = async () => {
    await postPersonalData(
      panelId,
      props,
      patientId,
      {
        ...personalState,
        ...accountDetailsState,
        ...{ ...healthAndFoodState, Objective: healthAndFoodState.Objective.trim() },
      },
      Boolean(healthAndFoodState.Objective)
    );
    setEditable(false);
  };

  const handleEdit = () => {
    setEditable(true);
  };
  const handleEditHistory = () => {
    childEventTrigger?.(null, null, 'HistorySummary', {
      sourceComponent: 'HealthObjective',
      patientId: patientId,
    });
  };

  const goBack = useDFGoBack();

  return (
    <div className={classes.container}>
      <div className={`${classes.objectContainer} ${editable ? classes.objectContainerWithButton : ''}`}>
        <div className={classes.wrapper} ref={innerRef}>
          {editable ? (
            <>
              <div className={classes.objectiveWrapper}>
                <BackArrowIcon onClick={() => goBack('S')} />
                <div className={classes.iconWrapper}>{<HeartIcon />}</div>
                <div className={classes.mainSection}>
                  <span className={commonClass.body15Medium}>Health objectives</span>
                </div>
              </div>
              <div className={classes.headerSpan}>
                <div className={classes.objWrapper}>
                  <div className={classes.mainSection2}>
                    <InputField
                      label=""
                      onChange={handleObjective}
                      value={healthAndFoodState.Objective}
                      multiline
                      maxRows={5}
                      autoFocus={true}
                      onFocus={(e) => {
                        const val = e.target.value;
                        e.target.value = '';
                        e.target.value = val;
                      }}
                    />
                  </div>
                  <div>{<span></span>}</div>
                </div>
                <div className={classes.flexEnd}>
                  <span
                    className={`${classes.edit} ${commonClass.caption12Medium}`}
                    onClick={() => {
                      handleEditHistory();
                    }}
                  >
                    View edit history{' '}
                  </span>
                </div>
              </div>
            </>
          ) : null}
          {!editable && !isLoading ? (
            <>
              <div className={classes.objectiveWrapper}>
                <BackArrowIcon onClick={() => goBack('S')} />

                <div className={classes.iconWrapper}>{<HeartIcon />}</div>
                <div className={classes.mainSection}>
                  <span className={commonClass.body15Medium}>Health objective</span>
                </div>
                <div>
                  <span onClick={handleEdit}>{<Edit />}</span>
                </div>
              </div>
              <div className={classes.headerSpan}>
                <div className={classes.objectiveWrapper1}>
                  <div></div>
                  <div className={classes.mainSection2}>
                    <div className={classes.overflowAutoDescription}>
                      <pre className={`${commonClass.body15Medium} ${classes.text}`}>
                        {!isLoading && healthAndFoodState!.Objective!.length > 0 && healthAndFoodState.Objective}
                        {!isLoading && healthAndFoodState!.Objective!.length === 0 && 'Add Health Objective'}
                      </pre>
                    </div>
                  </div>
                  {/* <div>
                    <span></span>
                  </div> */}
                </div>
                <div className={classes.flexEnd}>
                  {healthAndFoodState!.Objective!.length > 0 && (
                    <span className={`${classes.edit} ${commonClass.caption12Medium}`} onClick={handleEditHistory}>
                      View edit history{' '}
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {editable && healthAndFoodState?.Objective?.trim() && (
        <div className={classes.footer}>
          <Button onClick={handleSave} children="Save" variant="contained" size="large" fullWidth={true} />
        </div>
      )}
    </div>
  );
};

export default HealthObjective;
