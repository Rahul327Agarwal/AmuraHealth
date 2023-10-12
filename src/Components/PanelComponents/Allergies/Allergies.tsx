import { AddAllergenCard } from './AllergenAddCard';
import { IAllergenData, IAllergens, IProps } from './Allergies.types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { setAllergens } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from '../../../DisplayFramework/State/store';
import {
  doesUserHaveClickAccess,
  doesUserHaveDisabledAccess,
  doesUserHaveViewAccess,
} from '../../../Utilities/AccessPermissions';
import { PMS_LOCALE } from '../../../Utils';
import { BackArrowIconLight, PlusIcon } from './Allergies.svg';
import { AllergenCard } from './AllergenCard';
import { addNewAllergen, getData, getListOfAllAllergens } from './Allergies.functions';
import { useStyles } from './Allergies.styles';
import PanelHeader from '../Prescription/PrescriptionView/Components/PanelHeader/PanelHeader';
import PanelFooter from '../Prescription/PrescriptionView/Components/PanelFooter/PanelFooter';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function Allergies(props: IProps) {
  const { classes } = useStyles();
  const { patientId, registerEvent, unRegisterEvent, sessions, selectedClient, panel } = props;
  const data = useSelector((state: IRootState) => state.dashboard.allergens);
  const allAllergens = useSelector((state: IRootState) => state.dashboard.allergensList);
  const dispatch = useDispatch();
  const [loadingFlag, setLoadingFlag] = useState(data?.Allergens.length === 0 ? true : false);
  const [openAddSnippet, setOpenAddSnippet] = useState(false);
  const { id: panelId } = useCurrentPanel();
  let allergensSubscription: any, allAllergensSubscription: any;
  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  const goBack = useDFGoBack();
  useEffect(() => {
    if (data?.Allergens.length === 0) {
      getData(patientId, dispatch, setLoadingFlag, sessions, selectedClient);
    }
    getListOfAllAllergens(dispatch, sessions, selectedClient);
    allergensSubscription = registerEvent(patientId, 'pms-ql-allergens', () => {
      getData(patientId, dispatch, setLoadingFlag, sessions, selectedClient);
    });
    allAllergensSubscription = registerEvent('all-allergens', 'pms-ql-list-allergens', () => {
      getListOfAllAllergens(dispatch, sessions, selectedClient);
    });
    return () => {
      unRegisterEvent(allergensSubscription);
      unRegisterEvent(allAllergensSubscription);
    };
  }, []);

  return (
    <div className={classes.AllergensPanel}>
      {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Allergies', 'Allergies') && (
        <>
          {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Allergies', 'Allergies.1') && (
            // <PanelHeader injectComponent={props.injectComponent} title={'Allergies'} loadingFlag={loadingFlag} />
            <PanelHeader
              injectComponent={
                <BackArrowIconLight onClick={() => goBack('S')} style={{ marginRight: '15px', cursor: 'pointer' }} />
              }
              title={'Allergies'}
              loadingFlag={loadingFlag}
            />
          )}
          {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Allergies', 'Allergies.2') && (
            <div className={classes.AllergensBody}>
              {data?.Allergens && Object.keys(data.Allergens).length != 0 ? (
                <div className={'AllergiesList'}>
                  {data.Allergens.length
                    ? data.Allergens.map((value: IAllergenData) => {
                        return (
                          <AllergenCard
                            selectedClient={selectedClient}
                            sessions={sessions}
                            allergenName={value.ShortName}
                            data={JSON.parse(JSON.stringify(value))}
                            parentData={data}
                            patientId={patientId}
                            setLoadingFlag={setLoadingFlag}
                            callBack={(e: IAllergens) => dispatch(setAllergens(e))}
                            panelWidth={props?.panel?.width || ''}
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
              {openAddSnippet && doesUserHaveViewAccess(accessPermissionsForThisClient, 'Allergies', 'Allergies.5') ? (
                <AddAllergenCard
                  panelWidth={panel?.width}
                  AllAllergens={JSON.parse(JSON.stringify(allAllergens))}
                  Allergens={JSON.parse(JSON.stringify(data.Allergens))}
                  onAddAlergen={(ev) => {
                    setLoadingFlag(true);
                    addNewAllergen(
                      panelId,
                      patientId,
                      ev,
                      setLoadingFlag,
                      setOpenAddSnippet,
                      dispatch,
                      JSON.parse(JSON.stringify(data)),
                      allAllergens,
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
          {doesUserHaveViewAccess(accessPermissionsForThisClient, 'Allergies', 'Allergies.3') && (
            <PanelFooter
              panelWidth={panel?.width}
              plusIcon={<PlusIcon />}
              disablePlus={doesUserHaveDisabledAccess(accessPermissionsForThisClient, 'Allergies', 'Allergies.3A')}
              onPlusIconClick={() => {
                if (doesUserHaveClickAccess(accessPermissionsForThisClient, 'Allergies', 'Allergies.3A')) {
                  if (openAddSnippet) {
                    let element: any = document.getElementById('AddAllergenContainer');
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                  setOpenAddSnippet(true);
                }
              }}
              titleToBeDisplayed={'Add Allergy'}
            />
          )}
        </>
      )}
    </div>
  );
}
