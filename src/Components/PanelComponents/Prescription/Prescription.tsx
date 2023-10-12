import moment from 'moment';
import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserNameFromES } from '../../../Common/Common.functions';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import { IRootState } from '../../../DisplayFramework/State/store';
import { doesUserHaveViewAccess } from '../../../Utilities/AccessPermissions';
import IndeterminateLoader from '../../LibraryComponents/InderminateLoader/InderminateLoader';
import ErrorToaster from './../../../Common/ErrorToaster';
import Button from './../../LibraryComponents/MUIButton/MUIButton';
import CalendarDrawer from './../../LibraryComponents/MUIDatePicker/CalendarDrawer';
import MUIDrawer from './../../LibraryComponents/MUIDrawer/MUIDrawer';
import Token from './../../LibraryComponents/MUIToken/MUIToken';
import PageHeader from './../../LibraryComponents/PageHeader/PageHeader';
import PanelFooter from './../../LibraryComponents/PanelFooter/PanelFooter';
import Select from './../../LibraryComponents/Select/Select';
import ThreeDotMenu from './../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import Medicine from './Medicine/Medicine';
import PDFGenerator from './PDFGenerator/PDFGenerator';
import {
  copyToClipboard,
  dayOptions,
  getNthDayOfPrescription,
  getPrescriptionData,
  initCustomDate,
  initTimeFilterTrue,
  initTimeFilterfalse,
  openPrescriptionInNewTab,
  previewPrescription,
  startPrescriptionAPI,
  timeOptions,
} from './Prescription.function';
import { useStyles } from './Prescription.styles';
import { BackArrowIcon, CopyIcon, DownloadIcon, ExportFileIcon } from './Prescription.svg';
import { IProps } from './Prescription.types';

const MemoPDFGenerator = memo(PDFGenerator);

const Prescription = (props: IProps) => {
  const { prescriptionKey, patientId } = props;
  const commonClasses = useCommonStyles();
  const { classes } = useStyles();
  const [openPrescription, setOpenPrescription] = useState(false);
  const { id: panelId } = useCurrentPanel();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [localDayOptions, setLocalDayOptions] = useState(dayOptions);
  const [day, setDay] = useState('all');
  const [time, setTime] = useState('W');
  const [customDate, setCustomDate] = useState(initCustomDate);
  const [timeFilter, setTimeFilter] = useState(initTimeFilterfalse);
  const [iProducts, setIProducts] = useState([]);
  const [products, setProducts] = useState(iProducts);
  const componentRef = useRef();
  const [isOldPrescription, setIsOldPrescription] = useState(true);
  const [prescriptionURL, setPrescriptionURL] = useState('');
  const [prescription, setPrescription] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);
  const [renderer, setRenderer] = useState(0);
  const [isCallingStartPrescritionAPI, setIsCallingStartPrescritionAPI] = useState(false);

  const accessPermissionsForThisClient = useSelector(
    (state: IRootState) => state.accessPermissions.accessPermissionsForThisClient
  );
  let checkAccessForStartPrescriptionClick = doesUserHaveViewAccess(
    accessPermissionsForThisClient,
    'PrescriptionGenerate',
    'PrescriptionGenerate.1'
  );
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

      setIsOldPrescription(false);
    } catch (e) {
      setIsOldPrescription(true);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        let prescriptionData: any = await getPrescriptionData(props);
        if (!prescriptionData) return;
        let patientName = await getUserNameFromES(patientId);
        patientName = patientName.replace(/ /g, '_');
        if (prescriptionData.prescriptionUniqueId) {
          await getDetails(`${import.meta.env.VITE_GET_PRESCRIPTION_INFO_BY_HEX}${prescriptionData.prescriptionUniqueId}`);
          let urlToOpen = `/PrescriptionPage?h=${prescriptionData.prescriptionUniqueId}&n=${patientName}_${moment(
            prescriptionData.prescriptionStartDate
          ).format('YYYY-MM-DD')}`;
          setPrescriptionURL(urlToOpen);
        }
        if (prescriptionData.serialNumber && !prescriptionData?.prescriptionUniqueId) {
          await getDetails(`${import.meta.env.VITE_GET_PRESCRIPTION_INFO}${patientId}/${prescriptionData.serialNumber}`);
          let urlToOpen = `/PrescriptionPage?p=${patientId}&u=${prescriptionData.serialNumber}`;
          setPrescriptionURL(urlToOpen);
        }
        const response = prescriptionData.products.map((data: any) => ({
          ...data,
          preStartDate: moment(prescriptionData.prescriptionStartDate)
            .add(Number(data.startDay) - 1, 'day')
            .format('YYYY-MM-DD'),
          preEndDate: moment(prescriptionData.prescriptionStartDate).add(Number(data.endDay), 'day').format('YYYY-MM-DD'),
        }));
        setIProducts(response);
        setProducts(response);
        setPrescription(prescriptionData);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [prescriptionKey]);

  useEffect(() => {
    if (time && day) {
      const modifyFilter = time === 'W' ? initTimeFilterTrue : { ...initTimeFilterfalse, [time]: true };
      setTimeFilter(modifyFilter);
      if (time !== 'W' || day !== 'all') {
        const productFiltered = iProducts.filter((data1: any) =>
          data1.dose.some((data2: any) => filterCondition({ time, day, data1, data2 }))
        );
        setProducts(productFiltered);
      } else {
        setProducts(iProducts);
      }
    }
    if (day !== 'custom') {
      setCustomDate(initCustomDate);
      setLocalDayOptions(dayOptions);
    }
  }, [iProducts, time, day, customDate]);

  const filterCondition = ({ time, day, data1, data2 }: any) => {
    const dateselected = Date.parse((customDate as any)[day]);
    const timeCondition = time !== 'W' ? data2.part_of_the_day === time : true;
    const dateCondition =
      day !== 'all' ? Date.parse(data1.preStartDate) <= dateselected && Date.parse(data1.preEndDate) >= dateselected : true;
    return timeCondition && dateCondition;
  };

  const handleNo = () => setOpenPrescription(false);
  const handleYes = async () => {
    setIsCallingStartPrescritionAPI(true);
    let response: any = await startPrescriptionAPI(props);
    if (response?.Error) {
      ErrorToaster('Unable to start prescription!', panelId, 'error');
      return;
    }
    setPrescription((pre: any) => ({
      ...pre,
      prescriptionStarted: true,
      prescriptionStartDate: new Date().getTime(),
    }));
    const products = prescription.products.map((data: any) => ({
      ...data,
      preStartDate: moment(new Date().getTime())
        .add(Number(data.startDay) - 1, 'day')
        .format('YYYY-MM-DD'),
      preEndDate: moment(new Date().getTime()).add(Number(data.endDay), 'day').format('YYYY-MM-DD'),
    }));
    setIProducts(products);
    setProducts(products);
    setOpenPrescription(false);
    setTimeFilter(initTimeFilterTrue);
    setIsCallingStartPrescritionAPI(false);
  };
  const handleClear = () => {
    setDay('all');
    setTime('W');
    setCustomDate(initCustomDate);
    setLocalDayOptions(dayOptions);
    setProducts(iProducts);
  };

  const handleSetDate = (date: any) => {
    setCustomDate((pre) => ({
      ...pre,
      custom: new Date(moment(date).format('YYYY-MM-DD')),
    }));
    const datestring = moment(date).format('ddd DD, MMM YYYY');
    setLocalDayOptions((pre) => {
      const modified = pre.map((data) => (data.value === 'custom' ? { ...data, label: datestring } : data));
      return [...modified];
    });
    setDay('custom');
    setRenderer(new Date().getTime());
  };

  const handleCalenderSelect = () => setOpenCalendar(true);
  const handlePrescriptionOpen = () => setOpenPrescription(true);
  const handlePrescriptionClose = () => setOpenPrescription(false);

  const newPrescriptionOptions = [
    {
      label: 'Open prescriptions',
      value: 'Open prescriptions',
      icon: <span className={classes.iconStyles}>{<ExportFileIcon />} </span>,
    },
    {
      label: 'Copy prescription link',
      value: 'Copy prescription link',
      icon: <span className={classes.iconStyles}> {<CopyIcon />} </span>,
    },
  ];
  const oldPrescriptionOptions = [
    {
      label: 'Prescription',
      value: 'prescription',
      icon: <span className={classes.iconStyles}>{<DownloadIcon />} </span>,
    },
    {
      label: 'ShoppingList',
      value: 'shoppingList',
      icon: <span className={classes.iconStyles}>{<DownloadIcon />} </span>,
    },
    {
      label: 'Consumption 1-7d',
      value: 'consumption 1-7d',
      icon: <span className={classes.iconStyles}>{<DownloadIcon />} </span>,
    },
    {
      label: `Consumption 8d+ `,
      value: `consumption 8d+`,
      icon: <span className={classes.iconStyles}>{<DownloadIcon />} </span>,
    },
    {
      label: 'Download all',
      value: 'downloadAll',
      icon: <span className={classes.iconStyles}>{<DownloadIcon />} </span>,
    },
  ];

  const optionHandler = (value: any) => {
    let options = isOldPrescription ? oldPrescriptionOptions : newPrescriptionOptions;
    if (options.find((option) => option.value === value)) {
      if (value === 'Open prescriptions') {
        openPrescriptionInNewTab(prescriptionURL);
        return;
      }
      if (value === 'Copy prescription link') {
        copyToClipboard(prescriptionURL, panelId);
        return;
      }
      if (prescription?.fileName) {
        previewPrescription(props, prescription.fileName, value);
      }
    }
  };

  const goBack = useDFGoBack();
  return (
    <div className={classes.rootContainer}>
      {(isCallingStartPrescritionAPI || isLoading) && <IndeterminateLoader panelWidth={props?.panel?.width} />}
      {!isLoading && (
        <>
          <div className={classes.padding1Rem}>
            <PageHeader
              customStyle={classes.header}
              startAdornment={<BackArrowIcon className={classes.backArrowMargin} onClick={() => goBack('S')} />}
              endAdornment={
                <>
                  <ThreeDotMenu
                    options={isOldPrescription ? oldPrescriptionOptions : newPrescriptionOptions}
                    handleClick={(value: any) => {
                      optionHandler(value);
                    }}
                    isReverse={false}
                    isDivider={true}
                  />
                  {/*TODO: <IconButton onClick={handleDownloadPDF}>{DownloadPDF}</IconButton> */}
                </>
              }
              headerContent="Prescription"
              bottomContainer={
                <div className={`${classes.subHeader} ${commonClasses.caption12Regular}`}>
                  {moment(prescription.prescription_start_date).format('DD MMM YYYY')} | Prescription No :{' '}
                  {prescription.prescriptionNumber}
                </div>
              }
              titleAlignment="left"
            />
          </div>

          <div
            className={`${prescription?.prescriptionStarted ? classes.mainWrapperWhenStarted : classes.mainWrapper} ${
              prescription?.prescriptionStarted
                ? ''
                : checkAccessForStartPrescriptionClick
                ? classes.mainHeaderMaxHeight
                : classes.mainHeaderMaxHeightWithOutBtn
            }`}
          >
            <div className={`${classes.summaryPanel} ${classes.mainWrapper}`}>
              <div className={`${classes.summaryTitle} ${commonClasses.body15Medium}`}>Finding Summary</div>
              <div className={`${classes.summaryDescription} ${commonClasses.body15Regular}`}>
                {(prescription?.conditions || []).reduce((prev: any, condition: any, index: any) => {
                  return (
                    prev +
                    (condition?.stage?.trim() ? condition.name + ' - ' + condition.stage : condition.name) +
                    (index !== (prescription?.conditions || []).length - 1 ? ', ' : '.')
                  );
                }, '')}

                {/* Adrenal Fatigue, Hypothyroidism, Micronutrient Replenishment, Pancreatic Insult */}
              </div>
              <Token
                label={prescription?.prescriptionStarted ? 'Prescripton started' : 'Prescription is not yet started'}
                disabled={!prescription?.prescriptionStarted}
                active={!prescription?.prescriptionStarted}
              />
            </div>
            <div className={`${classes.medicineContent} ${classes.padding1Rem}`}>
              {prescription?.prescriptionStarted && (
                <div className={`${classes.filterWraper}`}>
                  <div key={renderer}>
                    <Select
                      placeholder="Day"
                      headerTitle={'Select Day'}
                      options={localDayOptions}
                      values={day}
                      setValues={setDay}
                      optionsType={'radio'}
                      position={'bottom'}
                      isDivider
                      isAutoOk
                      handleCustomType={() => {
                        handleCalenderSelect();
                      }}
                      isCalender={day === 'custom'}
                    />
                  </div>

                  <Select
                    placeholder="Time"
                    headerTitle={'Select Time'}
                    options={timeOptions}
                    values={time}
                    setValues={setTime}
                    optionsType={'radio'}
                    position={'bottom'}
                    isDivider
                    isAutoOk
                  />
                  {day !== 'all' || time !== 'W' ? (
                    <Button className={classes.clearButton} onClick={handleClear}>
                      Clear All
                    </Button>
                  ) : null}
                </div>
              )}
              <Medicine
                timeFilter={timeFilter}
                products={products}
                time={time}
                today={customDate.today}
                prescriptionStarted={prescription?.prescriptionStarted}
                prescriptionStartDate={prescription?.prescriptionStartDate || new Date()}
                nthDay={getNthDayOfPrescription(
                  prescription?.prescriptionStarted ? day : '',
                  new Date(customDate?.custom || new Date()),
                  new Date(prescription?.prescriptionStartDate || new Date())
                )}
              />
            </div>
          </div>
          {checkAccessForStartPrescriptionClick && !prescription?.prescriptionStarted && (
            <div className={classes.startPrescriptionBtn}>
              <Button
                onClick={() => {
                  handlePrescriptionOpen();
                }}
                variant="contained"
                size="large"
                fullWidth
              >
                Start Prescription
              </Button>
            </div>
          )}
          <div className={classes.hidden}>
            <MemoPDFGenerator
              ref={componentRef as any}
              products={iProducts}
              time={'W'}
              today={customDate.today}
              prescriptionStarted={false}
              prescriptionNumber={prescription?.prescriptionNumber || ''}
              prescriptionStartDate={prescription?.prescriptionStartDate || new Date()}
              nthDay={-1}
            />
          </div>
          {openCalendar && (
            <CalendarDrawer
              date={customDate.custom}
              setDate={handleSetDate}
              isOpen={openCalendar}
              setIsOpen={setOpenCalendar}
              minDate={prescription?.prescriptionStarted ? new Date(prescription?.prescriptionStartDate) : new Date()}
              maxDate={
                prescription?.prescriptionStarted
                  ? new Date(moment(new Date(prescription?.prescriptionStartDate)).add(90, 'd').format())
                  : new Date()
              }
            />
          )}
          <MUIDrawer
            anchor="bottom"
            open={openPrescription}
            handleOpen={handlePrescriptionOpen}
            handleClose={handlePrescriptionClose}
          >
            <div className={`${commonClasses.body15Regular} ${classes.prescriptionWarning}`}>
              Are you sure to start prescription?
            </div>
            <PanelFooter
              customStyle={classes.prescriptionFooter}
              leftButtonText={'No'}
              righButtontText={'Yes'}
              handleLeftButton={() => {
                handleNo();
              }}
              handleRightButton={() => {
                handleYes();
              }}
              btnStyle={classes.btnHeight}
              disableRightButton={isCallingStartPrescritionAPI}
              disableLeftButton={isCallingStartPrescritionAPI}
            />
          </MUIDrawer>
          <div className={classes.hidden}>
            <MemoPDFGenerator
              ref={componentRef as any}
              products={iProducts}
              time={'W'}
              today={customDate.today}
              prescriptionStarted={false}
              prescriptionNumber={prescription?.prescriptionNumber || ''}
              prescriptionStartDate={prescription?.prescriptionStartDate || new Date()}
              nthDay={-1}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Prescription;
