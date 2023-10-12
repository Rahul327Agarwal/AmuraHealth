import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuccessToaster from '../../../../Common/SuccessToaster';
import { useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import {
  setAppliedAmbroProducts,
  setAppliedConditionsPrescription,
  setAppliedProductsPrescription,
  setIsPrescriptionApproved,
  setIsPreviewDisabled,
  setIsProtocolsLoaded,
  setPrescriptionFileName,
  setPrescriptionLength,
  setTreatedConditions,
  setTreatedProducts,
} from '../../../../DisplayFramework/State/Slices/PrescriptionSlice';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { doesUserHaveDisabledAccess } from '../../../../Utilities/AccessPermissions';
import { PMS_LOCALE } from '../../../../Utils';
import PanelHeader from '../../../LibraryComponents/PanelHeaderForWhite/PanelHeaderForWhite';
import TopSheet from '../../../LibraryComponents/TopSheet/TopSheet';
import { BackArrowIcon, CopyIcon, ExportFileIcon } from '../Prescription.svg';
// import ModalBox from './Components/ModalBox/ModalBox';
import ModalBoxWithConfirm from './Components/ModalBox/ModalBoxWithConfirm';
import Header from './Components/PanelHeader/PanelHeader';
import PrescriptionConditions from './PrescriptionConditions/PrescriptionConditions';
import PrescriptionCriteria from './PrescriptionCriteria/PrescriptionCriteria';
import PrescriptionDietProtocol from './PrescriptionDietProtocol/PrescriptionDietProtocol';
import PrescriptionFooter from './PrescriptionFooter/PrescriptionFooter';
import PrescriptionNutritionProtocol from './PrescriptionNutritionProtocol/PrescriptionNutritionProtocol';
import { setNoRamping, splitProducts } from './PrescriptionNutritionProtocol/PrescriptionNutritionProtocol.functions';
import {
  fetchLatestPrescription,
  formatCondtions,
  formatProducts,
  generatePrescription,
  invokeApprovePrescriptionAPI,
  isRampingApplied,
  isRampingExceedingPrescriptionLength,
  previewPrescription,
} from './PrescriptionView.functions';
import { useStyles } from './PrescriptionView.styles';
import { IProps } from './PrescriptionView.types';
// import './prescription.css';
import ModalBox from '../../../LibraryComponents/ModalBox/ModalBox';
import IndeterminateLoader from '../../../LibraryComponents/InderminateLoader/InderminateLoader';
import { getUserNameFromES } from '../../../../Common/Common.functions';
import moment from 'moment';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function PrescriptionView(props: IProps) {
  const {
    patientId,
    registerEvent,
    unRegisterEvent,
    topicSnippetClick,
    prescriptionKey,
    sessions,
    selectedClient,
    topicSnippetForHistory,
    panel,
    openDiagnosticCondition,
  } = props;

  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const dashboard = useSelector((state: IRootState) => state.prescription);
  const dispatch = useDispatch();
  const {
    appliedConditionsPrescription,
    appliedProductsPrescription,
    isPreviewDisabled,
    isProtocolsLoaded,
    prescriptionFileName,
    treatedConditions,
    treatedProducts,
    prescriptionHistory,
    prescriptionLength,
    isPrescriptionApproved,
    appliedAmbroProducts,
  } = dashboard;

  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  const [showLoader, setShowLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRampingNotSelected, setIsRampingNotSelected] = useState(false);
  const [region, setRegion] = useState(null);
  const [defaultNoRamping, setDefaultNoRamping] = useState(null);
  const [anchorel, setAnchorel] = useState(null);
  const [prescriptionURL, setPrescriptionURL] = useState('');
  const [isOldPrescription, setIsOldPrescription] = useState(true);

  const [showPopUp, setShowPopUp] = useState(false);

  const goBack = useDFGoBack();

  let eventSubscription: any;
  let urlSubscription: any;
  let getDetails = async (url: string) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    try {
      const data = await response.json();
      if (data?.Status === 'Failure') {
        throw new Error('Error');
      }
      console.log('data', data);
      setIsOldPrescription(false);
    } catch (e) {
      setIsOldPrescription(true);
    }
  };
  const handleCancelModal = () => {
    setShowPopUp(false);
  };
  useEffect(() => {
    if (prescriptionKey) {
      let dataFn = async () => {
        let data: any = await fetchLatestPrescription(sessions, selectedClient, patientId, prescriptionKey, dispatch);
        if (data.prescriptionUniqueId) {
          let patientName = await getUserNameFromES(patientId);
          patientName = patientName.replace(/ /g, '_');
          await getDetails(`${import.meta.env.VITE_GET_PRESCRIPTION_INFO_BY_HEX}${data.prescriptionUniqueId}`);
          let urlToOpen = `/PrescriptionPage?h=${data.prescriptionUniqueId}&n=${patientName}_${moment(
            data.prescriptionStartDate
          ).format('YYYY-MM-DD')}`;
          setPrescriptionURL(urlToOpen);
          return;
        }
        if (data.serialNumber && !data?.prescriptionUniqueId) {
          await getDetails(`${import.meta.env.VITE_GET_PRESCRIPTION_INFO}${patientId}/${data.serialNumber}`);
          let urlToOpen = `/PrescriptionPage?p=${patientId}&u=${data.serialNumber}`;
          setPrescriptionURL(urlToOpen);
          return;
        }
      };
      dataFn();
    }
    eventSubscription = registerEvent(patientId, 'pms-prescription-s3-upload', () => {
      dispatch(setIsPreviewDisabled(false));
      setShowLoader(false);
    });
    urlSubscription = registerEvent(patientId, 'pms-client-prescription-info', async (data) => {
      if (data) {
        console.log(data, 'pms-client-prescription-info');
        if (data.url) {
          let patientName = await getUserNameFromES(patientId);
          patientName = patientName.replace(/ /g, '_');
          setPrescriptionURL(`/PrescriptionPage${data.url}&n=${patientName}_${moment(new Date()).format('YYYY-MM-DD')}`);
          setIsOldPrescription(false);
        }
      }
    });
    return () => {
      unRegisterEvent(eventSubscription);
      unRegisterEvent(urlSubscription);
    };
  }, []);

  const loadProtocols = (props: IProps, prescriptionDays: number, region: string, cuisine: string) => {
    setShowLoader(true);
    dispatch(setPrescriptionLength(prescriptionDays.toString()));
    setDefaultNoRamping(null);
    generatePrescription(panelId, props, region, cuisine)
      .then((res) => {
        if (res) {
          dispatch(
            setAppliedConditionsPrescription(
              res.Conditions.filter((eachConditon) => eachConditon.IsPrescribed === 0 || eachConditon.MachineDiagnosis === 'YES')
            )
          );
          dispatch(setAppliedProductsPrescription(res.Products));
          dispatch(setIsProtocolsLoaded(true));
          let startDay = new Date();
          let endDay = new Date();
          endDay.setDate(endDay.getDate() + prescriptionDays);
          let splittedProd = splitProducts(
            res.ambroProducts,
            String(prescriptionDays),
            () => {},
            () => {},
            '',
            ''
          );
          console.log('Ambro splitted', splittedProd);
          let noRamped = setNoRamping(splittedProd);
          console.log('no ramped', noRamped);
          dispatch(setAppliedAmbroProducts(noRamped));
        }
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  const validatePrescription = (
    props: IProps,
    prescriptionDays: number,
    region: string,
    appliedConditionsPrescription: Array<any>,
    appliedDietProtocols: Array<any>,
    appliedProductsPrescription: Array<any>
  ) => {
    if (!isRampingApplied(appliedProductsPrescription)) {
      setIsRampingNotSelected(true);
    } else if (isRampingExceedingPrescriptionLength(appliedProductsPrescription)) {
      setErrorMessage('The prescription period is too short for the selected ramping.');
      setShowPopUp(true);
    } else {
      dispatch(setIsPrescriptionApproved(true));
      approvePrescription(
        props,
        prescriptionDays,
        region,
        appliedConditionsPrescription,
        [],
        appliedProductsPrescription,
        appliedAmbroProducts
      );
    }
  };

  const approvePrescription = (
    props: IProps,
    prescriptionDays: number,
    region: any,
    conditionsPayLoad: Array<any>,
    protocolPayLoad: Array<any>,
    productsPayload: Array<any>,
    ambroProductsPayload: Array<any>
  ) => {
    setShowLoader(true);
    dispatch(setIsPreviewDisabled(true));
    let conditionRequest = formatCondtions(conditionsPayLoad);
    let productRequest = formatProducts(productsPayload);
    let ambroProductRequest = formatProducts(ambroProductsPayload);
    // console.log("Generate Prescription :: Request Object ", conditionRequest);
    // console.log(productRequest);
    invokeApprovePrescriptionAPI(
      panelId,
      props,
      prescriptionDays,
      region,
      conditionRequest,
      protocolPayLoad,
      productRequest,
      ambroProductRequest
    )
      .then((res) => {
        if (res) {
          dispatch(setPrescriptionFileName(res.File));
          setSuccessMessage('Prescription approved and will be available soon');
          setShowPopUp(true);
        }
      })
      .catch(() => {
        dispatch(setIsPrescriptionApproved(false));
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    if (!isProtocolsLoaded) {
      dispatch(setAppliedConditionsPrescription([]));
      dispatch(setAppliedProductsPrescription([]));
      dispatch(setTreatedProducts([]));
      dispatch(setTreatedConditions([]));
      dispatch(setIsPrescriptionApproved(false));
    }
  }, [isProtocolsLoaded]);

  // useEffect(() => {
  //   dispatch(setAppliedConditionsPrescription([]));
  //     dispatch(setAppliedProductsPrescription([]));
  //     dispatch(setTreatedProducts([]));
  //     dispatch(setTreatedConditions([]));
  //     dispatch(setIsPrescriptionApproved(false));
  // }, [prescriptionKey]);
  return (
    <div className={classes.component}>
      {showLoader && <IndeterminateLoader panelWidth={panel.width} />}
      <PanelHeader
        injectComponent={<BackArrowIcon onClick={() => goBack('S')} />}
        title="Generate Prescription"
        isShadow={false}
      />

      <TopSheet
        variant="bottom"
        children={
          <div>
            {isOldPrescription ? (
              <ul className={classes.dropdownItem}>
                <li
                  className={`${classes.dropdownListItemOld}`}
                  onClick={() => {
                    previewPrescription(props, prescriptionFileName || prescriptionHistory?.fileName, 'prescription');
                  }}
                >
                  <span className={classes.listTitle}>
                    <span className={classes.listItemText}>{PMS_LOCALE.translate('Download Prescription')}</span>
                  </span>
                </li>
                <li
                  className={`${classes.dropdownListItemOld}`}
                  onClick={() => {
                    previewPrescription(props, prescriptionFileName || prescriptionHistory?.fileName, 'shoppingList');
                  }}
                >
                  <span className={classes.listTitle}>
                    <span className={classes.listItemText}>{PMS_LOCALE.translate('Download ShoppingList')}</span>
                  </span>
                </li>
                <li
                  className={`${classes.dropdownListItemOld}`}
                  onClick={() => {
                    previewPrescription(props, prescriptionFileName || prescriptionHistory?.fileName, 'consumption 1-7d');
                  }}
                >
                  <span className={classes.listTitle}>
                    <span className={classes.listItemText}>
                      <span>{`${PMS_LOCALE.translate('Download Consumption')} 1-7d`}</span>
                      <span className={classes.potraitSpan}>P</span>
                    </span>
                  </span>
                </li>
                <li
                  className={`${classes.dropdownListItemOld}`}
                  onClick={() => {
                    previewPrescription(props, prescriptionFileName || prescriptionHistory?.fileName, 'consumption 8d+');
                  }}
                >
                  <span className={classes.listTitle}>
                    <span className={classes.listItemText}>
                      <span>{`${PMS_LOCALE.translate('Download Consumption')} 8d+ `}</span>
                      <span className={classes.landScapeSpan}>L</span>
                    </span>
                  </span>
                </li>
                <li
                  className={`${classes.dropdownListItemOld}`}
                  onClick={() => {
                    previewPrescription(props, prescriptionFileName || prescriptionHistory?.fileName, 'downloadAll');
                  }}
                >
                  <span className={classes.listTitle}>
                    <span className={classes.listItemText}>{PMS_LOCALE.translate('Download all')}</span>
                  </span>
                </li>
              </ul>
            ) : (
              <ul className={classes.dropdownItem}>
                <li
                  className={`${classes.dropdownListItem}`}
                  onClick={() => {
                    let urlToOpen = `${prescriptionURL}`;
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = urlToOpen;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <span className={classes.listIcon}>
                    <ExportFileIcon />
                  </span>
                  <span className={classes.listTitle}>
                    <span className={classes.listItemText}>{'Open prescriptions'}</span>
                  </span>
                </li>
                <li
                  className={`${classes.dropdownListItem}`}
                  onClick={() => {
                    let urlToOpen = `${window.location.protocol}//${window.location.host}${prescriptionURL}`;
                    navigator.clipboard.writeText(urlToOpen);
                    SuccessToaster('Link copied to clipboard', panelId, 'success');
                  }}
                >
                  <span className={classes.listIcon}>
                    <CopyIcon />
                  </span>
                  <span className={classes.listTitle}>
                    <span className={classes.listItemText}>{'Copy prescription link'}</span>
                  </span>
                </li>
              </ul>
            )}
          </div>
        }
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
      />
      <div style={{ display: 'flex' }}>
        {prescriptionKey ? (
          <div
            className={classes.backArrow}
            onClick={() => {
              topicSnippetForHistory('protocol');
            }}
          >
            <BackArrowIcon />
          </div>
        ) : (
          ''
        )}
        {prescriptionKey && (
          <Header
            injectComponent={props.injectComponent}
            title={prescriptionKey ? `Prescription: ${prescriptionHistory.prescriptionNumber || ''}` : ''}
          />
        )}
      </div>
      <div className={classes.prescriptionForm}>
        <PrescriptionCriteria
          showLoader={showLoader}
          loadProtocols={loadProtocols}
          parentProps={props}
          setShowLoader={setShowLoader}
          setRegion={setRegion}
          isProtocolsLoaded={isProtocolsLoaded}
          prescriptionLengthFromProps={prescriptionLength}
          setIsProtocolsLoaded={(e: any) => {
            dispatch(setIsProtocolsLoaded(e));
          }}
          prescriptionKey={prescriptionKey}
        />
        {isProtocolsLoaded ? (
          <div className={classes.prescriptionBody}>
            <PrescriptionConditions
              conditions={appliedConditionsPrescription}
              setTreatedConditions={(e) => {
                dispatch(setTreatedConditions(e));
              }}
              setShowLoader={setShowLoader}
              prescriptionLength={prescriptionLength}
              prescriptionKey={prescriptionKey}
            />
            <PrescriptionDietProtocol setShowLoader={setShowLoader} />
            <PrescriptionNutritionProtocol
              products={appliedProductsPrescription}
              setTreatedProducts={(e: any) => {
                dispatch(setTreatedProducts(e));
              }}
              setShowLoader={setShowLoader}
              defaultNoRamping={defaultNoRamping}
              prescriptionLength={prescriptionLength}
              setIsPrescriptionApproved={(e) => dispatch(setIsPrescriptionApproved(e))}
              setIsProtocolsLoaded={setIsProtocolsLoaded}
              errorMessages={errorMessage}
              setErrorMessages={setErrorMessage}
              prescriptionKey={prescriptionKey}
              prescriptionHistory={prescriptionHistory}
            />
          </div>
        ) : null}
      </div>
      <PrescriptionFooter
        panelWidth={panel?.width}
        disableApprove={
          !isProtocolsLoaded || treatedProducts.length === 0 || isPrescriptionApproved || prescriptionKey ? true : false
        }
        disablePreview={
          isPreviewDisabled ||
          (!isOldPrescription && !prescriptionURL) ||
          (prescriptionKey
            ? doesUserHaveDisabledAccess(accessPermissionsForThisClient, 'PrescriptionView', 'PrescriptionView.6C')
            : false)
        }
        disableConditions={prescriptionKey ? true : false}
        previewService={(event) => {
          setIsOpen(true);
        }}
        addConditions={() => {
          topicSnippetClick('conditions');
          goBack('S');
          // openDiagnosticCondition();
        }}
        approvePrescription={() => {
          validatePrescription(props, Number(prescriptionLength), region.Id, treatedConditions, [], treatedProducts);
        }}
      />

      {successMessage ? (
        <ModalBox
          panelWidth={panel?.width}
          open={showPopUp}
          handleClose={handleCancelModal}
          modalTitle={'Success'}
          buttonConfig={[
            // {
            //   text: PMS_LOCALE.translate('Cancel'),
            //   variant: 'text',
            //   onClick:handleCancelModal
            // },
            {
              text: PMS_LOCALE.translate('OK'),
              variant: 'contained',
              onClick: () => {
                setSuccessMessage('');
              },
            },
          ]}
        >
          <div className={classes.modalWrapper}>{successMessage}</div>
        </ModalBox>
      ) : (
        // <ModalBox
        //   messageType="Succcess"
        //   errorMsgDialog={successMessage}
        //   handleClosePopOver={() => {
        //     setSuccessMessage('');
        //   }}
        // />
        ''
      )}
      {errorMessage ? (
        // <ModalBox
        //   errorMsgDialog={errorMessage}
        //   handleClosePopOver={() => {
        //     setErrorMessage('');
        //   }}
        // />
        <ModalBox
          panelWidth={panel?.width}
          open={showPopUp}
          handleClose={handleCancelModal}
          modalTitle={'Error'}
          buttonConfig={[
            {
              text: PMS_LOCALE.translate('OK'),
              variant: 'contained',
              onClick: () => {
                setErrorMessage('');
              },
            },
          ]}
        >
          <div className={classes.modalWrapper}>{errorMessage}</div>
        </ModalBox>
      ) : (
        ''
      )}
      <ModalBoxWithConfirm
        panelWidth={props.panelWidth}
        open={isRampingNotSelected}
        handleClosePopOver={() => {
          setIsRampingNotSelected(false);
        }}
        handleSubmitPopOver={() => {
          setDefaultNoRamping(new Date().getTime());
          setIsRampingNotSelected(false);
          validatePrescription(
            props,
            Number(prescriptionLength),
            region.Id,
            treatedConditions,
            [],
            setNoRamping(treatedProducts)
          );
        }}
        warningMessage={'Rampings not selected. You want to proceed ?'}
      />
    </div>
  );
}
