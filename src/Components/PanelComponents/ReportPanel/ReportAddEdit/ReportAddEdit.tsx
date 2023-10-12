import { Drawer, IconButton } from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { v4 } from 'uuid';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { PMS_LOCALE } from '../../../../Utils';
import { BiomarkersIcon, CrossIcon, DeleteIcon, HeadingIconWithoutBG, TimeIconWithoutBG, UploadIcon } from '../Report.svg';
import AddedBiomarkerCard from '../Components/AddedBiomarkerCard/AddedBiomarkerCard';
import WithIconContainer from '../Components/WithIconContainer/WithIconContainer';
import { SUCCESS_MESSAGE, getBiomarkerOptionValue, postReportsAPI } from '../Reports/Reports.functions';
import ErrorToaster from './../../../../Common/ErrorToaster';
import IndeterminateLoader from './../../../LibraryComponents/InderminateLoader/InderminateLoader';
import InputField from './../../../LibraryComponents/InputField/InputField';
import Button from './../../../LibraryComponents/MUIButton/MUIButton';
import MUIDatePicker from './../../../LibraryComponents/MUIDatePicker/MUIDatePicker';
import ModalBox from './../../../LibraryComponents/ModalBox/ModalBox';
import PageHeader from './../../../LibraryComponents/PageHeader/PageHeader';
import AddEditBiomarker from './AddEditBiomarker';
import {
  DEFAULT_REPORT_ERROR,
  DEFAULT_REPORT_STATE,
  deleteFile,
  getFileDetails,
  getModifiedData,
  uploadFile,
  validateReportFields,
} from './ReportAddEdit.functions';
import { useStyles } from './ReportAddEdit.styles';
import { IBiomarker, IEditReport, IProps, IReport, IReportErrors, IShowConfirm } from './ReportAddEdit.types';
import SuccessToaster from '../../../../Common/SuccessToaster';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const MemoMUIDatePicker = memo(MUIDatePicker);
const InputFieldMemo = memo(InputField);

const initShowConfirm: IShowConfirm = { type: null, open: false };

const ReportAddEdit = (props: IProps) => {
  const { editData: editDataFromProp, handleBack, bioIdsOptions, bioUnitIdOptions } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const { id: panelId } = useCurrentPanel();
  const [reportState, setReportState] = useState<IReport>(DEFAULT_REPORT_STATE);
  const [errors, setErrors] = useState<IReportErrors>(DEFAULT_REPORT_ERROR);
  const [biomarkers, setBiomarkers] = useState<Array<IBiomarker>>([]);
  const [openAddEditBiomarker, setOpenAddEditBiomarker] = useState(false);
  const [biomarkerEditData, setBiomarkerEditData] = useState<IBiomarker>(null);
  const [isEditScreen, setIsEditScreen] = useState(false);
  const [filteredBioIdsOptions, setFilteredBioIdsOptions] = useState(bioIdsOptions);
  const [file, setFile] = useState<File[]>([]);
  const [deletedFileDetails, setDeletedFileDetails] = useState(null);
  const [editReportDetail, setEditReportDetail] = useState(null);
  const [showConfirm, setShowConfirm] = useState<IShowConfirm>(initShowConfirm);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState<IEditReport | null>(editDataFromProp);

  useEffect(() => {
    setEditData(editDataFromProp);
  }, [editDataFromProp]);

  useEffect(() => {
    if (bioIdsOptions && biomarkers.length) {
      const options = bioIdsOptions.filter((d1) => {
        return !biomarkers.some(
          (d2) => d2.action !== 'DELETE' && d1.value === getBiomarkerOptionValue(d2?.biomarkerId, d2?.groupName, d2?.type)
        );
      });
      setFilteredBioIdsOptions(options);
    }
  }, [bioIdsOptions, biomarkers]);

  const getReportsFile = async (reportId) => {
    await getFileDetails(
      props?.selectedClient?.client_id,
      reportId,
      props?.sessions,
      props?.selectedClient,
      setIsLoading,
      setFile
    );
  };

  useEffect(() => {
    if (editData?.reportId) {
      const { reportId, biomarkers, ...reportdata }: any = editData || {};
      setIsEditScreen(true);
      setReportState(reportdata || null);
      setBiomarkers(biomarkers || []);
      getReportsFile(reportId);
    } else {
      setIsEditScreen(false);
    }
  }, [editData]);

  const isDisabled = useMemo(() => {
    return isLoading || !Boolean((reportState.reportDate || reportState.sampleDate) && reportState.labName);
  }, [reportState, isLoading]);

  const isDisabledUpdate = useMemo(() => {
    if (isDisabled) return true;
    if (!(editData?.reportDate && editData?.sampleDate && editData?.labName)) return false;
    const reportDate = getModifiedData(editData.reportDate, reportState.reportDate, true);
    const sampleDate = getModifiedData(editData.sampleDate, reportState.sampleDate, true);
    const labName = getModifiedData(editData.labName, reportState.labName);

    return !(reportDate || sampleDate || labName);
  }, [isDisabled, editData, reportState]);

  const onReportDateChange = useCallback(
    (reportDate) => {
      if (reportState.sampleDate === null || reportState.sampleDate > reportDate) {
        setReportState((pre) => ({ ...pre, reportDate, sampleDate: reportDate }));
      } else {
        setReportState((pre) => ({ ...pre, reportDate }));
      }
    },
    [reportState.sampleDate]
  );
  const onSampleDateChange = useCallback(
    (sampleDate) => {
      if (reportState.reportDate === null || reportState.reportDate < sampleDate) {
        setReportState((pre) => ({ ...pre, reportDate: sampleDate, sampleDate }));
      } else {
        setReportState((pre) => ({ ...pre, sampleDate }));
      }
    },
    [reportState.reportDate]
  );
  const onTitleChange = useCallback((e) => {
    if (e.target.value.trim()) {
      const labName = e.target.value;
      setReportState((pre) => ({ ...pre, labName }));
    } else {
      setReportState((pre) => ({ ...pre, labName: '' }));
    }
  }, []);

  const handleCloseAddEditBiomarker = () => {
    setOpenAddEditBiomarker(false);
    setBiomarkerEditData(null);
  };

  const handleOpenAddEditBiomarker = () => setOpenAddEditBiomarker(true);

  const handleThreeDotAction = async (action: string, currData: IBiomarker, currIndex: number) => {
    switch (action) {
      case 'EDIT':
        setBiomarkerEditData(currData);
        handleOpenAddEditBiomarker();
        return;
      case 'DELETE':
        setEditReportDetail(currIndex);
        setShowConfirm({ open: true, type: 'BIOMARER' });
        return;
    }
  };

  const onDeleteBiomarker = async () => {
    const deletePayload = biomarkers[editReportDetail] || null;
    const payload = biomarkers.filter((_, i) => i !== editReportDetail);
    if (deletePayload) {
      deletePayload.action = 'DELETE';
      await onBiomarkerAPICall([deletePayload], payload);
      setBiomarkers(payload);
    }
  };

  const onAddEditReport = async () => {
    let { isValid, errorsObject } = validateReportFields(reportState);
    setErrors(errorsObject);
    let reportId = isEditScreen ? editData?.reportId : v4();
    if (!isValid) return;
    let payload = {};
    if (isEditScreen) {
      payload = {
        action: 'UPDATE',
        reportId: editData.reportId,
        reportDate: getModifiedData(editData.reportDate, reportState.reportDate, true),
        sampleDate: getModifiedData(editData.sampleDate, reportState.sampleDate, true),
        labName: getModifiedData(editData.labName, reportState.labName),
        biomarkers: [],
      };
    } else {
      payload = {
        action: 'ADD',
        reportId: reportId,
        reportDate: reportState.reportDate.toISOString(),
        sampleDate: reportState.sampleDate.toISOString(),
        labName: reportState.labName,
        biomarkers: [],
      };
    }
    const response = await postReportsAPI(props, payload, panelId);
    if (response) handleBack();
  };

  const onBiomarkerAPICall = async (bioPayload: IBiomarker[], newBioPayload: IBiomarker[], filesPayload?: File[]) => {
    let { isValid, errorsObject } = validateReportFields(reportState);
    setErrors(errorsObject);
    if (!isValid) return;

    let payload: any = {};
    let reportId;
    if (isEditScreen) {
      reportId = editData.reportId;
      payload = {
        action: 'UPDATE',
        reportId: editData.reportId,
        reportDate: getModifiedData(editData.reportDate, reportState.reportDate, true),
        sampleDate: getModifiedData(editData.sampleDate, reportState.sampleDate, true),
        labName: getModifiedData(editData.labName, reportState.labName),
        biomarkers: bioPayload,
      };
    } else {
      reportId = v4();
      payload = {
        action: 'ADD',
        reportId: reportId,
        reportDate: reportState.reportDate.toISOString(),
        sampleDate: reportState.sampleDate.toISOString(),
        labName: reportState.labName,
        biomarkers: bioPayload,
      };
    }
    const isNotChangeInReport =
      payload.action === 'UPDATE' && !payload.reportDate && !payload.sampleDate && !payload.labName && !payload.biomarkers.length;

    if (filesPayload?.length) {
      filesPayload?.forEach(async (cFile) => {
        await uploadFile(panelId, props, reportId, cFile, setFile, isNotChangeInReport);
      });
    }
    if (isNotChangeInReport) {
      return;
    }
    const response = await postReportsAPI(props, payload, panelId);
    if (response) {
      setEditData({
        reportId: reportId,
        reportDate: reportState.reportDate,
        sampleDate: reportState.sampleDate,
        labName: reportState.labName,
        biomarkers: newBioPayload,
      } as any);
    }
  };

  const onUploadFile = async (eventFile: File[]) => {
    try {
      setIsLoading(true);
      const currFiles: File[] = [...Object.values(eventFile)];
      let duplicateFiles = [];
      const uniqueFiles = currFiles.filter((cdata) => {
        const isExist = file.some((pdata) => pdata?.name && pdata?.name === cdata?.name);
        if (isExist) {
          duplicateFiles.push(`${cdata.name}`);
        }
        return !isExist;
      });
      if (duplicateFiles.length) {
        ErrorToaster(`Files with this name already exists. Files: ${duplicateFiles.join(', ')}.`, panelId, 'error');
      }
      if (!uniqueFiles.length) return;
      await onBiomarkerAPICall([], biomarkers, uniqueFiles);
    } finally {
      setIsLoading(false);
    }
  };

  const onConfirmModal = async () => {
    try {
      setIsLoading(true);
      setShowConfirm(initShowConfirm);
      if (showConfirm.type === 'FILE') {
        const response = await deleteFile(
          panelId,
          deletedFileDetails?.name,
          props?.selectedClient.client_id,
          editData?.reportId,
          props?.sessions,
          props?.selectedClient
        );

        if (response) {
          SuccessToaster(SUCCESS_MESSAGE.UPDATE, panelId, 'success');
          setFile((pre) => pre?.filter((file) => file?.name !== deletedFileDetails?.name));
          await onBiomarkerAPICall([], biomarkers);
        }
      } else if (showConfirm.type === 'BIOMARER') {
        await onDeleteBiomarker();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.rootRelativeContainer}>
      <div className={classes.rootContainer}>
        <PageHeader
          handleBack={handleBack}
          headerContent={isEditScreen ? 'Edit Reports' : 'Add Reports'}
          endAdornment={
            <IconButton onClick={handleBack}>
              <CrossIcon />
            </IconButton>
          }
        />
        <div className={classes.scrollBody}>
          <WithIconContainer Icon={<TimeIconWithoutBG />}>
            <MemoMUIDatePicker
              label="Report Date"
              date={reportState.reportDate ?? reportState.sampleDate}
              helperText={errors.reportDate}
              setDate={onReportDateChange}
              maxDate={new Date()}
              // minDate={reportState.sampleDate ?? null}
            />
          </WithIconContainer>

          <WithIconContainer Icon={<TimeIconWithoutBG />}>
            <MemoMUIDatePicker
              label="Sample Date"
              date={reportState.sampleDate ?? reportState.reportDate}
              helperText={errors.sampleDate}
              setDate={onSampleDateChange}
              maxDate={new Date()}
            />
          </WithIconContainer>
          <WithIconContainer Icon={<HeadingIconWithoutBG />}>
            <InputFieldMemo label="Lab name" value={reportState.labName} helperText={errors.labName} onChange={onTitleChange} />
          </WithIconContainer>
          <WithIconContainer disabled={isDisabled} Label={'Biomarkers'} Icon={<BiomarkersIcon />}>
            <section className={classes.biomarkersWrapper}>
              {isLoading && (
                <>
                  <MUISkeleton
                    animation="wave"
                    variant="rectangular"
                    height="100px"
                    width="100%"
                    style={{ marginBottom: '8px' }}
                  />
                  <MUISkeleton
                    animation="wave"
                    variant="rectangular"
                    height="100px"
                    width="100%"
                    style={{ marginBottom: '8px' }}
                  />
                  <MUISkeleton
                    animation="wave"
                    variant="rectangular"
                    height="100px"
                    width="100%"
                    style={{ marginBottom: '8px' }}
                  />
                </>
              )}
              {biomarkers.map((data, index) => {
                if (isEditScreen && data.action === 'DELETE') return;
                return (
                  <AddedBiomarkerCard
                    key={data.biomarkerId}
                    name={data.biomarkerId}
                    unit={data.unitId}
                    value={data.value}
                    handleThreeDotAction={(value) => handleThreeDotAction(value, data, index)}
                  />
                );
              })}
              <IconButton
                className={`${commonClasses.body15Medium} ${classes.bigGrayButton}`}
                onClick={handleOpenAddEditBiomarker}
              >
                {biomarkers.length ? '+ Add another' : '+ Add biomarker'}
              </IconButton>
              {/* <span className={`${commonClasses.body14Regular} ${classes.orLabel}`}>Or</span>
              <div>
                <Button startIcon={UploadIcon}>Load from CSV file</Button>
              </div> */}
            </section>
          </WithIconContainer>
          <WithIconContainer disabled={isDisabled} Label={'Upload report'} Icon={<UploadIcon />}>
            <div>
              <div className={classes.reportdiv}>
                {file?.map((file) => (
                  <div className={`${commonClasses.body15Medium} ${classes.bigGrayButton} ${classes.attachmentWrapper}`}>
                    <span>{file?.name}</span>
                    <div
                      onClick={() => {
                        setDeletedFileDetails(file);
                        setShowConfirm({ open: true, type: 'FILE' });
                      }}
                    >
                      {<DeleteIcon inheritColors />}
                    </div>
                  </div>
                ))}
                <div key={file.length} className={classes.reportdiv}>
                  <FileUploader
                    fileOrFiles={file}
                    handleChange={onUploadFile}
                    types={['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg', 'gif']}
                    name="file"
                    multiple={true}
                  >
                    <IconButton className={`${commonClasses.body15Medium} ${classes.bigGrayButton} ${classes.fullWidth}`}>
                      + Upload File
                    </IconButton>
                  </FileUploader>
                </div>
              </div>
            </div>
          </WithIconContainer>
        </div>
        <div className={classes.footerStyle}>
          <Button disabled={isDisabledUpdate} fullWidth variant="contained" size="large" onClick={onAddEditReport}>
            {isEditScreen ? 'Update report' : 'Add report'}
          </Button>
        </div>
      </div>
      <ModalBox
        panelWidth={props.panel?.width}
        open={showConfirm.open}
        handleClose={() => {
          setDeletedFileDetails(null);
          setEditReportDetail(null);
          setShowConfirm(initShowConfirm);
        }}
        modalTitle={'Are you sure?'}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('Cancel'),
            variant: 'text',
            onClick: () => {
              setDeletedFileDetails(null);
              setEditReportDetail(null);
              setShowConfirm(initShowConfirm);
            },
          },
          {
            text: PMS_LOCALE.translate('Continue'),
            variant: 'contained',
            onClick: onConfirmModal,
          },
        ]}
      >
        <div className={classes.modalWrapper}>{'You want to delete the file'}</div>
      </ModalBox>
      {openAddEditBiomarker ? (
        <Drawer anchor="left" className={classes.overlapDrawer} variant={'persistent'} open>
          <AddEditBiomarker
            onBiomarkerAPICall={onBiomarkerAPICall}
            handleClose={handleCloseAddEditBiomarker}
            editData={biomarkerEditData}
            setBiomarkers={setBiomarkers}
            preBiomarkers={biomarkers}
            bioIdsOptions={filteredBioIdsOptions}
            bioUnitIdOptions={bioUnitIdOptions}
          />
        </Drawer>
      ) : null}
    </div>
  );
};

export default ReportAddEdit;
