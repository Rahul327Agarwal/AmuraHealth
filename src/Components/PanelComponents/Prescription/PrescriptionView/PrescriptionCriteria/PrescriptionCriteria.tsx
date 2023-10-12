import { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { PMS_LOCALE } from '../../../../../Utils';
import { ResetIcon } from '../../Prescription.svg';
import { getRegions, getUserInformation, validatePrescriptionLength } from './PrescriptionCriteria.functions';
import { useStyles } from './PrescriptionCriteria.styles';
import { IProps, IRegion } from './PrescriptionCriteria.types';
import InputField from '../../../../LibraryComponents/InputField/InputField';
import MUISelect from '../../../../LibraryComponents/MUISelect/MUISelect';
import MUIButton from '../../../../LibraryComponents/MUIButton/MUIButton';
import ErrorToaster from '../../../../../Common/ErrorToaster';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function PrescriptionCriteria(props: IProps) {
  const commonClasses = useCommonStyles();
  const {
    showLoader,
    loadProtocols,
    parentProps,
    setShowLoader,
    isProtocolsLoaded,
    setIsProtocolsLoaded,
    prescriptionKey,
    prescriptionLengthFromProps,
  } = props;
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [region, setRegion] = useState('');
  const [regionObject, setRegionObject] = useState(null);
  const [cuisine, setCuisine] = useState('');
  const [prescriptionLength, setPrescriptionLength] = useState('90');
  const [prescriptionError, setPrescriptionError] = useState('');
  const [regionDropdown, setRegionDropdown] = useState([] as IRegion[]);
  const [healthType, setHealthType] = useState('');
  const daysDropdown = [
    {
      name: 'Days',
    },
  ];
  useEffect(() => {
    getRegions(panelId, parentProps).then((res) => {
      if (res) {
        setRegionDropdown(res);
      }
    });
  }, []);
  useEffect(() => {
    setPrescriptionLength(prescriptionLengthFromProps);
  }, [prescriptionLengthFromProps]);

  useEffect(() => {
    if (regionDropdown.length > 0) {
      setShowLoader(true);
      getUserInformation(parentProps)
        .then((res) => {
          let regionObj = regionDropdown.find((value) => value.Id === res.residingCountry);
          if (regionObj) {
            setRegion(regionObj.LongName);
            setRegionObject(regionObj);
            props.setRegion(regionObj);
          }
          setHealthType(res.HealthType);
        })
        .finally(() => {
          setShowLoader(false);
        });
    }
  }, [regionDropdown]);

  return (
    <div className={classes.paddingBottom15px}>
      <div className={classes.inputFields}>
        {/* <div className={`${classes.centerAlignSpan} ${classes.height31px}`}>
          <span title={'Health Type'}>{PMS_LOCALE.translate('Health Type')}</span>
        </div> */}
        <div className={classes.healthTypeInput}>
          {/* <span title={healthType}>{PMS_LOCALE.translate(healthType)}</span> */}
          <InputField value={PMS_LOCALE.translate(healthType)} label={'Health Type'} disabled={true} />
        </div>
        {/* <div className={classes.centerAlignSpan}>
          <span title={'Length'}>{PMS_LOCALE.translate('Length')}</span>
        </div> */}
        <div>
          <div className={classes.lengthGrid}>
            <div className={`${classes.widthInherit}`}>
              <InputField
                value={prescriptionLength}
                onChange={(e) => {
                  setPrescriptionLength(e.target.value.replace(/[^0-9]/g, ''));
                  setPrescriptionError('');
                  setIsProtocolsLoaded(false);
                }}
                label={'Length'}
                disabled={prescriptionKey ? true : false}
              />
            </div>
            <div>
              <MUISelect
                options={daysDropdown.map((value) => ({ label: value.name, value: value.name }))}
                disabled={true}
                labelId={'Days'}
                value={'Days'}
              />
            </div>
          </div>
          {prescriptionError ? (
            <p className={`${commonClasses.errorInTenant} ${classes.error}`} title={prescriptionError}>
              {/* <FontAwesomeIcon className={classes.errorIcon} icon={faExclamationTriangle} /> */}
              {PMS_LOCALE.translate(prescriptionError)}
            </p>
          ) : null}
        </div>
        {/* <div className={classes.centerAlignSpan}>
          <span title={'Region'}>{PMS_LOCALE.translate('Region')}</span>
        </div> */}
        <div className={classes.selectRegionWrapper}>
          <MUISelect
            disabled={prescriptionKey ? true : false}
            placeholder={'Select Region'}
            label={region ? '' : 'Select Region'}
            options={regionDropdown.map((value) => ({ label: value.LongName, value: value.Id }))}
            value={region}
            onChange={(e: any) => {
              let optionsSelected: IRegion = regionDropdown.find((value) => value.Id === e.target.value);
              if (!optionsSelected) {
                ErrorToaster('Something went wrong!', panelId, 'error');
                return;
              }
              setRegion(optionsSelected.Id);
              setRegionObject(optionsSelected);
              props.setRegion(optionsSelected);
              setIsProtocolsLoaded(false);
            }}
            labelId={'Region'}
          />
        </div>
        {/* <div className={classes.centerAlignSpan}>
          <span title={'Cuisine'}>{PMS_LOCALE.translate('Cuisine')}</span>
        </div> */}
        <div>
          <MUISelect
            disabled={true}
            placeholder={'Select Cuisine'}
            label={'Select Cuisine'}
            options={[]}
            value={cuisine}
            onChange={(e: any) => {}}
            labelId={'Cuisine'}
          />
        </div>
      </div>
      <div className={classes.buttonStyles}>
        <MUIButton
          style={{ padding: '7px 23px', margin: '0px 8px 0px 0px' }}
          disabled={prescriptionKey ? true : false}
          variant="contained"
          // className={prescriptionKey ? classes.disabledCancelIcon : ''}
          onClick={() => {
            setIsProtocolsLoaded(false);
            setRegion('');
            setPrescriptionLength('90');
            setRegionObject(null);
          }}
          title={'Reset'}
        >
          <ResetIcon />
        </MUIButton>
        <MUIButton
          disabled={!region || isProtocolsLoaded || showLoader || prescriptionKey ? true : false}
          variant="contained"
          onClick={() => {
            if (validatePrescriptionLength(prescriptionLength)) {
              setPrescriptionError(validatePrescriptionLength(prescriptionLength));
            } else {
              loadProtocols(parentProps, Number(prescriptionLength), regionObject.Id, cuisine);
            }
          }}
        >
          {PMS_LOCALE.translate('Load Protocols')}
        </MUIButton>
      </div>
    </div>
  );
}
