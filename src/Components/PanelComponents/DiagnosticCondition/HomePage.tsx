import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddBiomarker from './Components/AddBiomarker';
import DiagnosticCondition from './DiagnosticCondition';
import { getListOfAllConditions, getPatientBiomarker } from './DiagnosticCondition.functions';
import { useStyles } from './DiagnosticCondition.styles';
import { IConditionObject, IConditionOptions, IHomeProps, actionsType } from './DiagnosticCondition.types';
import { IRootState } from '../../../DisplayFramework/State/store';
import { Drawer } from '@mui/material';
import AddConditions from './Components/AddConditions';
import ConditionHistory from './Components/ConditionHistory';

export default function HomePage(props: IHomeProps) {
  const { classes } = useStyles(props);

  const [actiontype, setActiontype] = useState<actionsType>('DECISION');
  const [selectedCondition, setSelectedCondition] = useState<Partial<IConditionObject>>(null);
  const [patientBiomarker, setPatientBiomarker] = useState([]);
  const [modifedBiomarkers, setModifedBiomarkers] = useState({});
  const [conditionOptions, setConditionOptions] = useState<Array<IConditionOptions>>([]);

  const { Conditions = [] } = useSelector((state: IRootState) => state.dashboard.appliedConditionsNew);

  useEffect(() => {
    (async () => {
      const response = await getPatientBiomarker(props);
      setPatientBiomarker(response || []);
      let biomarkerObj: any;

      response.forEach((each) => {
        biomarkerObj = { ...biomarkerObj, [`${each.biomarkerId}`]: each.biomarkerName };
      });
      setModifedBiomarkers(biomarkerObj);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const options = await getListOfAllConditions(props);
      let unPrescribedConditions = Conditions.filter((condition) => condition.IsPrescribed === 0);
      const filteredOptions = options?.filter(
        (d2) => !unPrescribedConditions.some((d1) => d1.ConditionId === d2.ConditionId && d1.StageId === d2.StageId)
      );
      setConditionOptions(filteredOptions || []);
    })();
  }, [Conditions]);

  return (
    <div className={classes.rootRelativeContainer}>
      <DiagnosticCondition
        setActiontype={setActiontype}
        setSelectedCondition={setSelectedCondition}
        selectedCondition={selectedCondition}
        {...props}
      />
      {actiontype === 'ADD_CONDITION' ? (
        <Drawer anchor="left" className={classes.overlapDrawer} variant={'persistent'} open>
          <AddConditions conditionOptions={conditionOptions} setActiontype={setActiontype} {...props} />
        </Drawer>
      ) : actiontype === 'ADD_BIOMARKER' ? (
        <Drawer anchor="left" className={classes.overlapDrawer} variant={'persistent'} open>
          <AddBiomarker
            patientBiomarker={patientBiomarker}
            setActiontype={setActiontype}
            selectedCondition={selectedCondition}
            setSelectedCondition={setSelectedCondition}
            {...props}
          />
        </Drawer>
      ) : actiontype === 'CONDITION_HISTORY' ? (
        <Drawer anchor="left" className={classes.overlapDrawer} variant={'persistent'} open>
          <ConditionHistory
            setActiontype={setActiontype}
            setSelectedCondition={setSelectedCondition}
            selectedCondition={selectedCondition}
            modifedBiomarkers={modifedBiomarkers}
            {...props}
          />
        </Drawer>
      ) : null}
    </div>
  );
}
