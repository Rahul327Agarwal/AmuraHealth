import React, { useEffect, useState } from 'react';
import { IProps } from './Interface/IBiomarkerEntry';
import { InvestigationReport, IPatientBiomarker } from './Interface/IInvestigationReport';
import { useSelector, useDispatch } from 'react-redux';
// import FileUpload from "../Common/FileUpload/FileUpload";
// import ClickAndConfirm from "../LibraryComponents/ClickAndConfirm/ClickAndConfirm";
import {
  addBiomarker,
  createEmptyBiomarker,
  deleteBiomarker,
  deleteFile,
  editPatientBiomarker,
  getBiomarkers,
  getLab,
  getPatientBiomarker,
  getPatientReportList,
  getUpdatedPatientBio,
  updateBiomarker,
  updateField,
} from './ReportEntry.functions';
import { IRootState } from './../../../DisplayFramework/State/store';
import {
  setBiomarker,
  setInvestigationReport,
  setLoadingFlag,
  setFilesList,
  setEditReport,
  setLabs,
} from './../../../DisplayFramework/State/Slices/InvestigationEntrySlice';
import { useStyles } from './ReportEntry.styles';
// import PanelHeader from "./../../../Common/PanelHeader/PanelHeader";
import { EmptyBiomarkerRow } from './EmptyBiomarkerRow/EmptyBiomarkerRow';
import ReportEntryBiomarkerRow from './ReportEntryBiomarkerRow/ReportEntryBiomarkerRow';
import ReportAttachments from './ReportAttachments/ReportAttachments';
import ReportMeta from './ReportMeta/ReportMeta';
import PanelHeader from '../../LibraryComponents/PanelHeaderForWhite/PanelHeaderForWhite';
import { EditIcon } from '../../SVGs/Common';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function ReportEntry(props: IProps) {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const investigationState = useSelector((state: IRootState) => state.investigationEntry);
  const {
    patientId,
    registerEvent,
    unRegisterEvent,
    sessions,
    selectedClient,
    isNew,
    investigationReportId,
    injectComponent,
    deleteInvestigationReport,
  } = props;
  const InvestigationReport = investigationState.investigationReport;
  const [reportId, setReportId] = useState(InvestigationReport.InvestigationReportId);
  const [lab, setLab] = useState(InvestigationReport.InvestigationReportVendorName);
  const [reportDate, setReportDate] = useState(InvestigationReport.InvestigationReportReportDate);
  const [sampleDate, setSampleDate] = useState(InvestigationReport.InvestigationReportSampleDate);
  const [sidNumber, setSidNumber] = useState(InvestigationReport.SidNumber);
  const biomarkers = investigationState.biomarker;
  const setLabState = (value: any) => {
    dispatch(setLabs(value));
  };
  const setBiomarkerState = (value: any) => {
    dispatch(setBiomarker(value));
  };
  const filesList = investigationState.filesList;
  const setFilesListState = (value: any) => {
    dispatch(setFilesList(value));
  };
  const [patientBiomarker, setPatientBiomarker] = useState([]);
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateState, setUpdateState] = useState(true);
  const [rerenderFlag, setRerenderFlag] = useState(0);
  const vendors = investigationState?.labs?.Vendors ? JSON.parse(JSON.stringify(investigationState.labs.Vendors)) : [];
  const biomarker = Object.keys(biomarkers).length != 0 ? biomarkers?.Biomarkers : [];
  let labSubcription: any, biomarkerSubscription: any, patientBiomarkerSubscription: any, reportListSubscription: any;
  const getPatientReports = (patientId: any, investigationReportId: any) => {
    getPatientReportList(patientId, investigationReportId, filesList, setFilesListState, sessions, dispatch, selectedClient);
  };
  const setInvestigationReports = (value: InvestigationReport) => {
    dispatch(setInvestigationReport(value));
  };

  const onNewReportAdd = (reportId: string) => {
    patientBiomarkerSubscription = registerEvent(patientId, 'pms-ql-bmentry', () => {
      getPatientBiomarker(panelId, patientId, reportId, setInvestigationReports, sessions, selectedClient, dispatch);
    });
    reportListSubscription = registerEvent(patientId, 'pms-ql-bmreport', () => {
      getPatientReportList(patientId, reportId, filesList, setFilesListState, sessions, dispatch, selectedClient);
    });
    return () => {
      unRegisterEvent(patientBiomarkerSubscription);
      unRegisterEvent(reportListSubscription);
    };
  };

  useEffect(() => {
    let biomarker = Object.keys(InvestigationReport).length != 0 ? getUpdatedPatientBio(InvestigationReport) : [];
    setPatientBiomarker(biomarker as any);
  }, [investigationState.investigationReport]);
  const editClicked = () => {
    dispatch(setEditReport(true));
    setPatientBiomarker(createEmptyBiomarker(patientBiomarker));
  };

  const updateReportId = (reportId: string, lab: string, sidNumber: string, reportDate: string, sampleDate: string) => {
    setPatientBiomarker(createEmptyBiomarker(patientBiomarker));
    setReportDate(reportDate);
    setSampleDate(sampleDate);
    setSidNumber(sidNumber);
    setLab(lab);
    dispatch(setEditReport(true));
    setReportId(reportId);
  };

  const addBiomarkerValue = (e: IPatientBiomarker, index: number) => {
    addBiomarker(
      panelId,
      e,
      index,
      reportId,
      reportDate,
      patientId,
      patientBiomarker,
      setPatientBiomarker,
      setEditReport,
      sessions,
      selectedClient,
      dispatch
    );
  };
  useEffect(() => {
    getBiomarkers(setBiomarkerState, sessions, selectedClient);
    getLab(sessions, selectedClient, setLabState, dispatch);
    if (investigationReportId.trim() !== '') {
      getPatientBiomarker(panelId, patientId, investigationReportId, setInvestigationReports, sessions, selectedClient, dispatch);
      getPatientReportList(patientId, investigationReportId, filesList, setFilesListState, sessions, dispatch, selectedClient);
      patientBiomarkerSubscription = registerEvent(patientId, 'pms-ql-bmentry', () => {
        getPatientBiomarker(
          panelId,
          patientId,
          investigationReportId,
          setInvestigationReports,
          sessions,
          dispatch,
          selectedClient
        );
      });
      reportListSubscription = registerEvent(patientId, 'pms-ql-bmreport', () => {
        getPatientReportList(patientId, investigationReportId, filesList, setFilesListState, sessions, dispatch, selectedClient);
      });
    }
    labSubcription = registerEvent('all-labs', 'pms-ql-lab', () => {
      getLab(sessions, selectedClient, setLabState, dispatch);
    });
    biomarkerSubscription = registerEvent('all-biomarkers', 'pms-ql-biomarker', () => {
      getBiomarkers(setBiomarkerState, sessions, selectedClient);
    });

    return () => {
      unRegisterEvent(labSubcription);
      unRegisterEvent(biomarkerSubscription);
      if (investigationReportId.trim() !== '') {
        unRegisterEvent(patientBiomarkerSubscription);
        unRegisterEvent(reportListSubscription);
      }
    };
  }, []);
  useEffect(() => {
    if (open) {
      let element: any = document.getElementById('fileUploadContainer');
      element.scrollTo({ top: 0 });
    }
  }, [open]);
  useEffect(() => {
    setReportId(InvestigationReport.InvestigationReportId);
    setLab(InvestigationReport.InvestigationReportVendorName);
    setReportDate(InvestigationReport.InvestigationReportReportDate);
    setSampleDate(InvestigationReport.InvestigationReportSampleDate);
    setSidNumber(InvestigationReport.SidNumber);
  }, [InvestigationReport.InvestigationReportId]);
  useEffect(() => {
    if (investigationState.editReport) {
      let patientBio = JSON.parse(JSON.stringify(investigationState.investigationReport.Biomarkers || []));
      let emptyRec: IPatientBiomarker = {
        BiomarkerId: '',
        BiomarkerShortName: '',
        BiomarkerLongName: '',
        BiomarkerDescription: '',
        BiomarkerReportValue: '',
        BiomarkerType: '',
        IsBiomarkerValueActive: 0,
        BiomarkerUnitId: '',
        UnitId: '',
        UnitShortName: '',
        UnitLongName: '',
        BiomarkerGroupId: '',
        state: 'write',
        isDirty: true,
      };
      patientBio.push(emptyRec);
      setPatientBiomarker(JSON.parse(JSON.stringify(patientBio)));
    }
  }, [investigationState.investigationReport.Biomarkers]);
  return (
    <div className={classes.biomarkerEntryCmp}>
      <div className={classes.reportDetailCmp}>
        <PanelHeader
          injectComponent={injectComponent}
          title={isNew || investigationState.editReport ? 'Enter Report Details' : 'Report Details'}
          loadingFlag={investigationState.loadingFlag}
          iconTray={
            <div className={classes.deleteButtonContainer}>
              {investigationState.editReport || isNew || investigationState.loadingFlag ? null : (
                <div
                  onClick={() => {
                    editClicked();
                  }}
                >
                  {<EditIcon />}
                </div>
              )}
              {/* TODO: {isNew || !investigationState.editReport ? null : (
                <ClickAndConfirm
                  confirmationHeader={"Warning"}
                  confirmLabel="Delete"
                  cancelLabel="Cancel"
                  clickableElement={deleteIcon}
                  confirmationMessage={"Are sure you want to delete?"}
                  onConfirm={() => {
                    deleteReport(
                      reportId,
                      patientId,
                      deleteInvestigationReport,
                      sessions,
                      selectedClient,
                      dispatch
                    );
                  }}
                  onCancel={() => {}}
                />
              )} */}
            </div>
          }
        />
        <div className={'InvestigationEntryBody'}>
          <ReportMeta
            lab={lab}
            reportId={reportId}
            reportDate={reportDate}
            sampleDate={sampleDate}
            sidNumber={sidNumber}
            enableEdit={isNew && !investigationState.loadingFlag ? true : investigationState.editReport}
            vendors={vendors}
            patientId={patientId}
            loadingFlag={investigationState.loadingFlag}
            updateReportId={updateReportId}
            updateReportDate={(e) => {
              updateField(panelId, 'ReportDate', e, setReportDate, reportId, patientId, sessions, selectedClient, dispatch);
            }}
            updateSampleDate={(e) => {
              updateField(panelId, 'SampleDate', e, setSampleDate, reportId, patientId, sessions, selectedClient, dispatch);
            }}
            updateLabName={(e) => {
              updateField(panelId, 'VendorName', e, setLab, reportId, patientId, sessions, selectedClient, dispatch);
            }}
            isNew={isNew}
            updateSid={(e) => {
              updateField(panelId, 'SidNumber', e, setSidNumber, reportId, patientId, sessions, selectedClient, dispatch);
            }}
            sessions={sessions}
            selectedClient={selectedClient}
            onNewReportAdd={onNewReportAdd}
          />

          <div
            key="Details"
            style={{
              marginTop: '30px',
              marginBottom: '15px',
              marginLeft: '5px',
            }}
          >
            {patientBiomarker?.length
              ? patientBiomarker.map((patientBio: IPatientBiomarker, index: number) => {
                  if (
                    patientBio.state === 'read' ||
                    patientBio.state === 'update' ||
                    !patientBio.state ||
                    !investigationState.editReport
                  ) {
                    return (
                      <div key={index}>
                        <EmptyBiomarkerRow
                          index={index}
                          editReport={investigationState.editReport}
                          patientBiomarker={patientBio}
                          editPatientBiomarker={(e) => {
                            editPatientBiomarker?.(index, patientBiomarker, setPatientBiomarker);
                            setUpdateState(!updateState);
                          }}
                          deletePatientBiomarker={(e) => {
                            dispatch(setLoadingFlag(true));
                            deleteBiomarker(
                              panelId,
                              e,
                              reportId,
                              patientId,
                              patientBiomarker,
                              setPatientBiomarker as any,
                              sessions,
                              selectedClient,
                              dispatch
                            );
                            setUpdateState(!updateState);
                          }}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div key={index}>
                        <ReportEntryBiomarkerRow
                          index={index}
                          cmpstate={patientBio.state || ''}
                          biomarkers={biomarker || []}
                          defaultUnitId={patientBio.UnitId}
                          patientBiomarker={patientBio}
                          updateBiomarker={(e) => {
                            dispatch(setLoadingFlag(true));
                            updateBiomarker(
                              panelId,
                              e,
                              index,
                              reportId,
                              reportDate,
                              patientId,
                              patientBiomarker,
                              setPatientBiomarker,
                              sessions,
                              selectedClient,
                              dispatch
                            );
                          }}
                          patientBiomarkers={patientBiomarker}
                          defaultBioMarkerId={patientBio.BiomarkerId}
                          defaultBioMarkerDisplayName={patientBio.BiomarkerLongName}
                          addPatientBiomarker={(e) => {
                            dispatch(setLoadingFlag(true));
                            addBiomarkerValue(e, index);
                            setUpdateState(!updateState);
                          }}
                          defaultBioMarkerGroupId={patientBio.BiomarkerGroupId}
                          sessions={sessions}
                          selectedClient={selectedClient}
                        />
                      </div>
                    );
                  }
                })
              : ''}
            {reportId ? (
              <ReportAttachments
                reportId={reportId}
                fileList={filesList}
                open={open}
                editReport={investigationState.editReport}
                deleteFile={(objKey) => {
                  deleteFile(panelId, objKey, patientId, reportId, props, sessions, selectedClient, dispatch, getPatientReports);
                }}
                handleOpen={() => {
                  setOpen(true);
                }}
                sessions={sessions}
              />
            ) : (
              ''
            )}

            {/* TODO: <FileUpload
              open={open}
              uploadFile={() => {
                uploadFile(
                  props,
                  reportId,
                  files,
                  setFiles,
                  setRerenderFlag,
                  setOpen,
                  sessions,
                  getPatientReports,
                  dispatch
                );
              }}
              handleSave={(files) => {
                validateFiles(files, setRerenderFlag, setFiles);
              }}
              handleClose={() => {
                setOpen(false),
                  setFiles([]),
                  setRerenderFlag(new Date().getTime());
              }}
              files={files}
              rerenderFlag={rerenderFlag}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
