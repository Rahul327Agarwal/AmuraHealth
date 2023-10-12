import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { PMS_LOCALE, PMS_S3 } from '../../../Utils';
import { setDisabledButton, setIsEditOpen } from './../../../DisplayFramework/State/Slices/RolesSlice';
import MUIAutoSelect from './../../LibraryComponents/MUIAutoSelect/MUIAutoSelect';
import ModalBox from './../../LibraryComponents/ModalBox/ModalBox';
import PageHeader from './../../LibraryComponents/PageHeader/PageHeader';
import PannelFooter from './../../LibraryComponents/PannelFooter/PannelFooter';
import Reporting from './../../LibraryComponents/Reporting/Reporting';
import ShiftSegmentNew from './ShiftSegment/ShiftSegmentNew';
import { AddIcon, CrossIcon } from './UserRoleAssignmentNew.svg';

import { useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import MUIButton from '../../LibraryComponents/MUIButton/MUIButton';
import Checkbox from '../../LibraryComponents/MUICheckbox/MUICheckbox';
import {
  addRoleAPI,
  convertDaysToUTCDays,
  convertRoleObjectToOptionNew,
  convertUserObjectsToOptionsNew,
  defaultStartEndDate,
  formatRoleOptions,
  formatUserOptions,
  updateRoleAPI,
} from './UserRoleAssignment.functions';
import { useStyles } from './UserRoleAssignment.styles';
import {
  IOptionNew,
  IProps,
  IRolesError,
  IShiftSegment,
  createDefaultError,
  createDefaultShiftSegment,
  roleActualObject,
  userActualObject,
} from './UserRoleAssignment.types';
import {
  getBlueDotsOfAStaffForAnyPatient,
  getClientDetailsForAStaff,
} from '../../LibraryComponents/ChatComponent/BlueDotPopUp/BlueDotClosePopUp/BlueDotClosePopUp.functions';
import ErrorToaster from '../../../Common/ErrorToaster';
import { IRootState } from '../../../DisplayFramework/State/store';
import { getAllStaffRoles } from '../MyListPanel/MyList/MyList.function';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function UserRoleAssignmentNew(props: IProps) {
  const {
    roleId,
    roleName,
    reportsTo,
    reportees,
    roles,
    shiftSegments,
    isEdit,
    selectedClient,
    sessions,
    panel,
    patientId,
    is_active,
    handleSubmitButton,
    handleBackButton,
    childEventTrigger,
    autoAssignment,
    manualAssignment,
    handleActiveState,
  } = props;
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const allUserRole = useSelector((state: IRootState) => state.dashboard.allUserRoles);

  const [selectedRole, setSelectedRole] = useState<IOptionNew>(
    convertRoleObjectToOptionNew({
      roleId: roleId,
      roleName: roleName,
    })
  );
  const [selectedReportsTo, setSelectedReportsTo] = useState(convertUserObjectsToOptionsNew(reportsTo || []));
  const [errorState, setErrorState] = useState<IRolesError>(createDefaultError());
  const [shiftSegmentsOriginal, setShiftSegmentsOriginal] = useState<IShiftSegment[]>(
    [...JSON.parse(JSON.stringify(shiftSegments || []))].map((value) => {
      value.weekDays = convertDaysToUTCDays(value.startTime, value.weekDays, false);
      return value;
    }) || []
  );
  const [shiftSegmentsState, setShiftSegmentsState] = useState<IShiftSegment[]>(
    [...JSON.parse(JSON.stringify(shiftSegments || []))].map((value) => {
      value.weekDays = convertDaysToUTCDays(value.startTime, value.weekDays, false);
      return value;
    }) || []
  );
  const [showReportees, setShowReportees] = useState(false);
  const [roleOptions, setRoleOptions] = useState<IOptionNew[]>([]);
  const [reportsToOptions, setReportsToOptions] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [reRender, setRerender] = useState(0);
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [assignmentStatus, setAssigmentStatus] = useState({
    autoAssignment: Boolean(autoAssignment),
    manualAssignment: Boolean(manualAssignment),
  });
  const deleteReportee = () => {
    setOpenDeleteModal(true);
  };
  let getRoleID = roles.map((data) => {
    return data.roleId;
  });
  useEffect(() => {
    setErrorState(createDefaultError());
    setShowReportees(false);
    if (props.isEdit == true) {
      dispatch(setIsEditOpen(true));
      setShowReportees(true);
    }
    setSelectedRole(
      convertRoleObjectToOptionNew({
        roleId: roleId,
        roleName: roleName,
      })
    );
    setSelectedReportsTo(convertUserObjectsToOptionsNew(reportsTo));
    setShiftSegmentsOriginal(
      JSON.parse(
        JSON.stringify([
          ...[...JSON.parse(JSON.stringify(shiftSegments || []))].map((value) => {
            value.weekDays = convertDaysToUTCDays(value.startTime, value.weekDays, false);
            return value;
          }),
        ])
      )
    );
    setShiftSegmentsState(
      JSON.parse(
        JSON.stringify([
          ...[...JSON.parse(JSON.stringify(shiftSegments || []))].map((value) => {
            value.weekDays = convertDaysToUTCDays(value.startTime, value.weekDays, false);
            return value;
          }),
        ])
      )
    );
  }, [props]);

  useEffect(() => {
    setRerender(new Date().getTime());
  }, [roleId]);

  useEffect(() => {
    // (async () => {
    //   let response = await getRolesInfoFromES();
    //   let data = response.filter((value) => !getRoleID.includes(value.roleId));
    //   setRoleOptions(formatRoleOptions(data));
    //   let staffData = await getStaffDataFromS3(props);
    //   setReportsToOptions(formatUserOptions(staffData));
    // })();
    (async () => {
      let rolesData: roleActualObject[] = await getAllStaffRoles(panelId, props);
      let data = rolesData.filter((value: any) => !getRoleID.includes(value.roleId));
      setRoleOptions(formatRoleOptions(data));
    })();

    // PMS_S3.getObject(
    //   `pms-ql-roles/${selectedClient?.tenant_id || ''}/allRoles.json`,
    //   import.meta.env.VITE_CLIENT_BUCKET,
    //   {
    //     TenantId: selectedClient?.tenant_id || '',
    //     Locale: sessionStorage.getItem('locale'),
    //     url: import.meta.env.VITE_S3_FETCH_API,
    //     token: sessions.id_token,
    //     headers: {},
    //   },
    //   []
    // ).then((res: roleActualObject[] | any) => {
    //   if (!res.Error) {
    //     let data = res.filter((value: any) => !getRoleID.includes(value.roleId));
    //     setRoleOptions(formatRoleOptions(data));
    //   }
    // });
    PMS_S3.getObject(
      `pms-ql-roles/${selectedClient?.tenant_id || ''}/staffList.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: selectedClient?.tenant_id || '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: sessions.id_token,
        headers: {},
      },
      []
    ).then((res: userActualObject[] | any) => {
      if (!res.Error) {
        let formatedData = res.map((data, index) => {
          let RoleName = allUserRole.find((value) => value.roleId === data.roleId)?.roleName;
          return { ...data, roleName: RoleName };
        });
        setReportsToOptions((formatUserOptions as any)(formatedData as any));
      }
    });
  }, []);
  const handleUpdate = async () => {
    if (isEdit) {
      try {
        let bluedots = await getBlueDotsOfAStaffForAnyPatient(
          panelId,
          props.sessions,
          selectedRole.value,
          selectedClient.client_id
        );
        if (bluedots.length > 0) {
          ErrorToaster('The staff you are trying to disable has unresolved bluedots', panelId, 'error');
          throw new Error('Something went wrong! Please try again');
        }
      } catch (e) {
        throw new Error('Something went wrong! Please try again');
      }
      let requestSegment = JSON.parse(JSON.stringify([...shiftSegmentsState]));
      requestSegment = requestSegment.map((value: any) => {
        value.weekDays = convertDaysToUTCDays(value.startTime, value.weekDays, true);
        return value;
      });
      updateRoleAPI(
        {
          roleId: selectedRole.value,
          roleName: selectedRole.label,
          reportingTo: [
            {
              userId: (selectedReportsTo.length > 0 && selectedReportsTo[0]?.value) || '',
              userName: (selectedReportsTo.length > 0 && selectedReportsTo[0]?.label) || '',
              roleId: (selectedReportsTo.length > 0 && selectedReportsTo[0]?.roleId) || '',
              roleName: (selectedReportsTo.length > 0 && selectedReportsTo[0]?.subLabel) || '',
            },
          ],
          reportees: [],
          shiftSegments: JSON.parse(JSON.stringify(requestSegment)),
          isEdit,
          is_active,
          autoAssignment: assignmentStatus.autoAssignment,
          manualAssignment: assignmentStatus.manualAssignment,
        },
        roles,
        selectedClient,
        sessions
      )
        .then(() => {
          // childEventTrigger(null, null, 'onCancelRole', {});
          handleSubmitButton();
          dispatch(setIsEditOpen(false));
          dispatch(setDisabledButton(false));
          goBack('S');
        })
        .catch((error) => {
          if (error?.statusCode === 504) {
            setErrorState(error.error);
          }
        })
        .finally(() => {
          setShowLoader(false);
        });
    } else {
      setShowLoader(true);
      let requestSegment = JSON.parse(JSON.stringify([...shiftSegmentsState]));
      requestSegment = requestSegment.map((value: any) => {
        value.weekDays = convertDaysToUTCDays(value.startTime, value.weekDays, true);
        return value;
      });
      addRoleAPI(
        {
          roleId: selectedRole.value,
          roleName: selectedRole.label,

          reportingTo: [
            {
              userId: (selectedReportsTo.length > 0 && selectedReportsTo[0]?.value) || '',
              userName: (selectedReportsTo.length > 0 && selectedReportsTo[0]?.label) || '',
              roleId: (selectedReportsTo.length > 0 && selectedReportsTo[0]?.roleId) || '',
              roleName: (selectedReportsTo.length > 0 && selectedReportsTo[0]?.subLabel) || '',
            },
          ],

          reportees: [],
          shiftSegments: requestSegment,
          is_active,
          isEdit,
          autoAssignment: assignmentStatus.autoAssignment,
          manualAssignment: assignmentStatus.manualAssignment,
        },
        roles,
        props
      )
        .then(() => {
          dispatch(setDisabledButton(false));
          dispatch(setIsEditOpen(false));
          handleSubmitButton();
          goBack('S');
        })
        .catch((error) => {
          console.log(error, 'error at catch');
          if (error?.statusCode === 504) {
            setErrorState(error.error);
          }
        })
        .finally(() => {
          setShowLoader(false);
        });
    }
  };
  const handleCancel = () => {
    setOpenModal(true);
  };
  const goBack = useDFGoBack();

  const handleDiscard = () => {
    goBack('S');
    dispatch(setDisabledButton(false));
    dispatch(setIsEditOpen(false));
    setOpenModal(false);
  };
  const handleDeleteReportee = async () => {
    if (is_active) {
      let bluedots = await getBlueDotsOfAStaffForAnyPatient(
        panelId,
        props.sessions,
        selectedRole.value,
        selectedClient.client_id
      );
      let clients = await getClientDetailsForAStaff(panelId, props.sessions, selectedRole.value, selectedClient.client_id);
      if (bluedots.length > 0 || clients.length > 0) {
        ErrorToaster(
          'The reporting person cannot be changed as the staff has unresolved bluedots or client assigned',
          panelId,
          'error'
        );
        setOpenDeleteModal(false);
        throw new Error('Something went wrong! Please try again');
      }
    }
    setSelectedReportsTo([]);
    setOpenDeleteModal(false);
  };
  const handleAssignmentStatus = (assignmentType: string) => {
    if (assignmentType === 'manual') {
      setAssigmentStatus((pre) => ({ ...pre, manualAssignment: !pre?.manualAssignment }));
    } else setAssigmentStatus((pre) => ({ ...pre, autoAssignment: !pre?.autoAssignment }));
  };

  return (
    <div className={classes.wrapper}>
      <PageHeader
        headerContent={isEdit ? `Edit Role` : `Add Role`}
        customStyle={classes.headerStyle}
        endAdornment={
          <i
            onClick={() => {
              handleCancel();
            }}
            className={classes.pointerStyle}
          >
            {<CrossIcon />}
          </i>
        }
        handleBack={() => {
          handleCancel();
        }}
      />
      <div className={classes.container}>
        <div className={`${classes.divider} ${classes.mb30}`}>
          <div className={`${classes.divider} ${!is_active && classes.isInactive}`}>
            <div>
              <MUIAutoSelect
                options={roleOptions}
                InputProps={{ label: 'Role name ', placeholder: 'Select role' }}
                error={errorState?.roleName ? true : false}
                onChange={(e: any, role: any) => {
                  setErrorState((pre) => ({ ...pre, roleName: '' }));
                  setSelectedRole(role);
                }}
                value={selectedRole}
                disabled={isEdit}
              />
              {errorState?.roleName ? (
                <div>
                  <span className={classes.errorText}>{errorState?.roleName}</span>
                </div>
              ) : null}
            </div>
            {
              <div className="">
                <span className={`${commonStyles.body15Medium} ${classes.allowLabel}`}>Allow</span>
                <div className={classes.checkboxCon}>
                  <span className={classes.checkBoxContainer} onClick={() => handleAssignmentStatus('manual')}>
                    <Checkbox checked={Boolean(assignmentStatus.manualAssignment)} />
                    <span className={`${commonStyles.body15Regular} ${classes.addPeople}`}>Manual Assignment</span>
                  </span>
                  <span className={classes.checkBoxContainer} onClick={() => handleAssignmentStatus('auto')}>
                    <Checkbox checked={Boolean(assignmentStatus.autoAssignment)} />
                    <span className={`${commonStyles.body15Regular} ${classes.addPeople}`}>Auto Assignment</span>
                  </span>
                </div>
              </div>
            }
            {(!isEdit || selectedReportsTo.length === 0) && !showReportees && (
              <span
                className={`${classes.addPeople} ${commonStyles.caption12Medium}`}
                onClick={() => {
                  setShowReportees(true);
                }}
              >
                {' '}
                {<AddIcon />} Add a person
              </span>
            )}
            <div>
              {showReportees && selectedReportsTo.length === 0 && (
                <MUIAutoSelect
                  options={reportsToOptions}
                  error={errorState?.reportsTo ? true : false}
                  InputProps={{ label: 'Reporting to', placeholder: 'Select person' }}
                  disableClearable
                  onChange={(e, report) => {
                    setErrorState((pre) => ({ ...pre, reportsTo: '' }));
                    setSelectedReportsTo([report]);
                  }}
                  value={selectedReportsTo.length > 0 ? selectedReportsTo[0] : []}
                />
              )}
              {errorState?.reportsTo ? (
                <div>
                  <span className={classes.errorText}>{errorState?.reportsTo}</span>
                </div>
              ) : null}
            </div>
            {selectedReportsTo.length > 0 && showReportees && <span className={commonStyles.body15Medium}>Reporting to</span>}

            {selectedReportsTo.length > 0 && showReportees && (
              <Reporting
                reportee={selectedReportsTo[0].label}
                client="Amura"
                role={selectedReportsTo[0]?.subLabel || selectedReportsTo[0]?.roleId || ''}
                isDeleted={true}
                deleteReportee={deleteReportee}
              />
            )}
          </div>

          <div className={`${classes.divider} ${!is_active && classes.isInactive}`}>
            <div className={`${classes.shiftHeader}`}>
              <span className={`${classes.labelNew} ${commonStyles.body15Medium} ${classes.flexauto}`}>{'Shift segments'}</span>
              <Add
                className={classes.addIcon}
                onClick={() => {
                  let addNewSegment = {
                    ...createDefaultShiftSegment(),
                    segmentId: uuid(),
                  };
                  setShiftSegmentsOriginal([addNewSegment, ...shiftSegmentsOriginal]);
                  setShiftSegmentsState([addNewSegment, ...shiftSegmentsState]);
                }}
              />
            </div>
            <div key={reRender}>
              {shiftSegmentsState.map((segment, ind) => {
                let endTime = segment.endTime;
                let startDate = new Date(segment.startDate);
                startDate.setHours(0, 0, 0, 0);
                if (segment.endTime) {
                  endTime = new Date(segment.endTime);
                  if (
                    segment.startTime &&
                    new Date(segment.startTime).toString() !== 'Invalid Date' &&
                    new Date(segment.startTime).getDate() !== endTime.getDate()
                  ) {
                    endTime.setDate(endTime.getDate() - 1);
                  }
                  endTime = endTime.toISOString();
                }
                return (
                  <div className={classes.divider}>
                    <ShiftSegmentNew
                      {...segment}
                      panel={panel}
                      endDate={segment.endDate}
                      startDate={startDate.toISOString()}
                      endTime={endTime}
                      error={errorState.shiftSegments.find((value) => value.segmentId === segment.segmentId)}
                      handleReset={(id) => {
                        setShiftSegmentsState((prevState) => {
                          let newState = [...prevState];
                          newState = newState.map((segment) => {
                            if (segment.segmentId === id) {
                              return shiftSegmentsOriginal.find((segment) => segment.segmentId === id);
                            }
                            return segment;
                          });
                          return newState;
                        });
                      }}
                      handleDelete={(id) => {
                        setShiftSegmentsState((prevState) => {
                          return prevState.filter((value) => value.segmentId !== id);
                        });
                        setShiftSegmentsOriginal((prevState) => {
                          return prevState.filter((value) => value.segmentId !== id);
                        });
                      }}
                      handleChange={(id, key, value) => {
                        setShiftSegmentsState((prevState) => {
                          let newState = JSON.parse(JSON.stringify(prevState));
                          newState = newState.map((segment, mainIndex) => {
                            if (segment.segmentId === id) {
                              segment[key] = value;
                              segment = defaultStartEndDate(segment, key);
                              setErrorState((error) => {
                                return {
                                  ...error,
                                  shiftSegments: error.shiftSegments.map((shift, index) => {
                                    if (index === mainIndex) {
                                      return { ...shift, [key]: '' };
                                    } else {
                                      return shift;
                                    }
                                  }),
                                };
                              });
                              return segment;
                            }
                            return segment;
                          });

                          return newState;
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {isEdit && (
          <MUIButton
            onClick={() => handleActiveState(props)}
            disableRipple
            variant="text"
            className={classes.activeStateToggleBtn}
          >
            {`${is_active ? 'Deactivate' : 'Activate'} this role`}
          </MUIButton>
        )}
      </div>
      <PannelFooter
        customStyle={classes.footerStyle}
        handleAdd={handleUpdate}
        handleCancel={handleCancel}
        buttonOneTitle="Cancel"
        buttonTwoTitle={isEdit ? 'Update' : 'Add'}
      />
      <ModalBox
        panelWidth={panel?.width}
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
        }}
        modalTitle={'Discard Changes'}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('Cancel'),
            variant: 'text',
            onClick: () => {
              setOpenModal(false);
            },
          },
          {
            text: PMS_LOCALE.translate('Discard'),
            variant: 'contained',
            onClick: handleDiscard,
          },
        ]}
      >
        <div className={classes.modalWrapper}>Are you sure you want to discard the changes?</div>
      </ModalBox>
      <ModalBox
        panelWidth={panel?.width}
        open={openDeleteModal}
        handleClose={() => {
          setOpenDeleteModal(false);
        }}
        modalTitle={'Discard Changes'}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('No'),
            variant: 'text',
            onClick: () => {
              setOpenDeleteModal(false);
            },
          },
          {
            text: PMS_LOCALE.translate('Yes'),
            variant: 'contained',
            onClick: handleDeleteReportee,
          },
        ]}
      >
        <div className={classes.modalWrapper}>Are you sure to remove the reporting person</div>
      </ModalBox>
    </div>
  );
}
