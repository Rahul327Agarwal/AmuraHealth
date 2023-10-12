import { debounce } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAppliedConditionsNew } from '../../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from '../../../LibraryComponents/PanelFooter/PanelFooter';
import SearchField from '../../../LibraryComponents/SearchField/SearchField';
import { getAddBiomarkerObject, updateBiomarkerCondition } from '../DiagnosticCondition.functions';
import { useStyles } from '../DiagnosticCondition.styles';
import { IAddBiomarker } from '../DiagnosticCondition.types';
import BiomarkerCard from './BiomarkerCard/BiomarkerCard';
import { NoSearchIcon } from '../../../SVGs/Common';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function AddBiomarker(props: IAddBiomarker) {
  const { setActiontype, selectedCondition, setSelectedCondition, patientBiomarker } = props;
  const { classes } = useStyles(props);
  const dispatch = useDispatch();
  const { id: panelId } = useCurrentPanel();
  const commanClass = useCommonStyles();
  const appliedConditions = useSelector((state: IRootState) => state.dashboard.appliedConditionsNew);

  const [selectedBiomarkers, setSelectedBiomarkers] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('No data to display');

  const searchedBiomarkers = useMemo(() => {
    const value = search.toLowerCase();
    if (value.length >= 3) setErrorMsg('No result found');
    else setErrorMsg('No data to display');
    const biomarkerIds = selectedCondition?.Biomarkers?.map((data) => data.Id) || [];
    return patientBiomarker.filter((data) => {
      const isSearch = value.length >= 3 ? data?.biomarkerName?.toLowerCase().includes(value) : true;
      return !biomarkerIds.includes(data?.biomarkerId) && isSearch;
    });
  }, [patientBiomarker, search]);

  const onBiomarkerSelect = (biomarkerId: string) => {
    let modifiedBiomarker = [...selectedBiomarkers];
    if (selectedBiomarkers.indexOf(biomarkerId) > -1) {
      modifiedBiomarker = modifiedBiomarker.filter((value) => value !== biomarkerId);
    } else {
      modifiedBiomarker.push(biomarkerId);
    }
    setSelectedBiomarkers(modifiedBiomarker);
  };

  const handleOnBack = () => {
    setActiontype('DECISION');
  };

  const handleOnPush = async () => {
    try {
      const payload = {
        ConditionId: selectedCondition?.ConditionId,
        StageId: selectedCondition?.StageId,
        biomarkers: selectedBiomarkers,
      };
      setIsLoading(true);
      const response = await updateBiomarkerCondition(panelId, props, payload);
      if (response) {
        const Conditions = getAddBiomarkerObject(appliedConditions.Conditions, response);
        dispatch(setAppliedConditionsNew({ ...appliedConditions, BiomarkerUpdateOn: new Date().getTime(), Conditions }));
      }
      handleOnBack();
    } finally {
      setIsLoading(false);
    }
  };

  const debounceFun: Function = debounce(setSearch);

  return (
    <div className={classes.rootContainer}>
      <PageHeader handleBack={handleOnBack} headerContent={'Add data'} />
      <section className={classes.scrollBody}>
        <SearchField placeholder={'Search data points'} isInputVariant handleSearch={debounceFun} autoFocus />
        <div className={classes.biomarkerCardWrapper}>
          {searchedBiomarkers.map((data) => (
            <BiomarkerCard
              key={data.biomarkerId}
              biomarkerName={data.biomarkerName}
              isSelected={selectedBiomarkers.indexOf(data.biomarkerId) > -1}
              onClick={() => onBiomarkerSelect(data.biomarkerId)}
            />
          ))}
        </div>
        {!isLoading && searchedBiomarkers.length === 0 && (
          <div className={classes.noSearch}>
            <div className={classes.wrap}>
              <NoSearchIcon />
              <span className={`${classes.span} ${commanClass.body20Medium}`}>{errorMsg}</span>
            </div>
          </div>
        )}
      </section>
      <PanelFooter
        paddingX="20px"
        customStyle={classes.footerStyle}
        leftButtonText={'Back'}
        righButtontText={'Push'}
        disableRightButton={selectedBiomarkers.length === 0 || isLoading}
        handleLeftButton={handleOnBack}
        handleRightButton={handleOnPush}
      />
    </div>
  );
}
