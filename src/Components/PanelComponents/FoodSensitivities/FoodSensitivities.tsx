import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { setFoodSensitivities } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from '../../../DisplayFramework/State/store';
import { doesUserHaveClickAccess, doesUserHaveViewAccess } from '../../../Utilities/AccessPermissions';
import { PMS_LOCALE } from '../../../Utils';
import { BackArrowIconLight, PlusIcon } from './FoodSensitivities.svg';
import PanelFooter from '../Prescription/PrescriptionView/Components/PanelFooter/PanelFooter';
import PanelHeader from '../Prescription/PrescriptionView/Components/PanelHeader/PanelHeader';
import { AddFoodSensitivityCard } from './AddSensitivityCard';
import './FoodSensitivities.css';
import { useStyles } from './FoodSensitivities.styles';
import { IFoodSensitivities, IFoodSensitivityData, IProps } from './FoodSensitivities.types';
import { addNewSensitivity, getData, getListOfAllSensitivities } from './FoodSensitivity.functions';
import { SensitivityCard } from './SensitivityCard';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function FoodSensitivities(props: IProps) {
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const { patientId, registerEvent, unRegisterEvent, sessions, selectedClient, panel } = props;
  const dispatch = useDispatch();
  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  const data = {
    ...useSelector((state: IRootState) => state.dashboard.foodSensitivities),
  };
  const allSensitivities = useSelector((state: IRootState) => state.dashboard.sensitivitiesList);
  const [loadingFlag, setLoadingFlag] = useState(data?.Sensitivitys.length === 0 ? true : false);
  const [openAddSnippet, setOpenAddSnippet] = useState(false);
  let sensitivitySubscription: any, allSensitivitySubscription: any;

  const goBack = useDFGoBack();
  useEffect(() => {
    if (data?.Sensitivitys.length === 0) {
      getData(patientId, dispatch, setLoadingFlag, sessions, selectedClient);
    }
    getListOfAllSensitivities(dispatch, sessions, selectedClient);
    sensitivitySubscription = registerEvent(patientId, 'pms-ql-sensitivity', () => {
      getData(patientId, dispatch, setLoadingFlag, sessions, selectedClient);
    });
    allSensitivitySubscription = registerEvent('all-sensitivity', 'pms-ql-list-sensitivity', () => {
      getListOfAllSensitivities(dispatch, sessions, selectedClient);
    });
    return () => {
      unRegisterEvent(sensitivitySubscription);
      unRegisterEvent(allSensitivitySubscription);
    };
  }, []);

  return (
    <div className={classes.AllergensPanel}>
      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'FoodSensitivities', 'FoodSensitivities') && (
        <>
          {doesUserHaveViewAccess(accessPermissionsForThisClient, 'FoodSensitivities', 'FoodSensitivities.1') && (
            <PanelHeader
              injectComponent={
                <BackArrowIconLight onClick={() => goBack('S')} style={{ marginRight: '15px', cursor: 'pointer' }} />
              }
              title={'Food Sensitivities'}
              loadingFlag={loadingFlag}
            />
            // <PanelHeader injectComponent={props.injectComponent} title={'Food Sensitivities'} loadingFlag={loadingFlag} />
          )}
          {doesUserHaveViewAccess(accessPermissionsForThisClient, 'FoodSensitivities', 'FoodSensitivities.2') && (
            <div className={classes.AllergensBody}>
              {data.Sensitivitys && Object.keys(data.Sensitivitys).length != 0 ? (
                <div className={classes.AllergiesList}>
                  {data.Sensitivitys.length
                    ? data.Sensitivitys.map((value: IFoodSensitivityData) => {
                        return (
                          <SensitivityCard
                            selectedClient={selectedClient}
                            sessions={sessions}
                            sensitivityName={value.ShortName}
                            data={JSON.parse(JSON.stringify(value))}
                            parentData={data}
                            patientId={patientId}
                            setLoadingFlag={setLoadingFlag}
                            callBack={(e: IFoodSensitivities) => dispatch(setFoodSensitivities(e))}
                            panelWidth={panel?.width || ''}
                          />
                        );
                      })
                    : null}
                </div>
              ) : !loadingFlag && !openAddSnippet ? (
                <div>
                  <span className={classes.noData} title={'No data avaliable'}>
                    {PMS_LOCALE.translate('No data avaliable')}
                  </span>
                </div>
              ) : null}
              {openAddSnippet &&
              doesUserHaveViewAccess(accessPermissionsForThisClient, 'FoodSensitivities', 'FoodSensitivities.5') ? (
                <AddFoodSensitivityCard
                  panelWidth={panel?.width}
                  sessions={sessions}
                  AllSensitivities={allSensitivities}
                  sensitivity={JSON.parse(JSON.stringify(data.Sensitivitys))}
                  onAddSensitivity={(ev) => {
                    setLoadingFlag(true);
                    addNewSensitivity(
                      panelId,
                      patientId,
                      ev,
                      setLoadingFlag,
                      setOpenAddSnippet,
                      dispatch,
                      JSON.parse(JSON.stringify(data)),
                      allSensitivities,
                      sessions,
                      selectedClient
                    );
                  }}
                  loadingFlag={loadingFlag}
                  handleClose={setOpenAddSnippet}
                />
              ) : null}
            </div>
          )}
          {doesUserHaveViewAccess(accessPermissionsForThisClient, 'FoodSensitivities', 'FoodSensitivities.3') && (
            <PanelFooter
              plusIcon={<PlusIcon />}
              panelWidth={panel?.width}
              disablePlus={!doesUserHaveClickAccess(accessPermissionsForThisClient, 'FoodSensitivities', 'FoodSensitivities.3A')}
              onPlusIconClick={() => {
                if (doesUserHaveClickAccess(accessPermissionsForThisClient, 'FoodSensitivities', 'FoodSensitivities.3A')) {
                  if (openAddSnippet) {
                    let element = document.getElementById('AddAllergenContainer');
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                  setOpenAddSnippet(true);
                }
              }}
              titleToBeDisplayed={'Add food sensitivity'}
            />
          )}
        </>
      )}
    </div>
  );
}
