import React, { useEffect, useState } from 'react';
import { PMS_LOCALE, PMS_S3 } from '../../../Utils';
// import BrowseRole from '../LibraryComponents/HRComponents/BrowseRole/BrowseRole';
import PageHeader from './../../LibraryComponents/PageHeader/PageHeader';
// import { convertDaysToUTCDays, updateRoleAPI } from '../UserRoleAssignment/UserRoleAssignment.functions';
// import { createDefaultRoleObject, IRole } from '../UserRoleAssignment/UserRoleAssignment.types';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid, v4 } from 'uuid';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
// import { PlusIcon } from '../../SVGs/Common';
import { useDFGoBack } from '../../../DisplayFramework/Events/DFEvents';
import BrowseRole from '../HRComponents/BrowseRole/BrowseRole';
import { createDefaultRoleObject } from '../HRComponents/BrowseRole/BrowseRole.types';
import { convertDaysToUTCDays, updateRoleAPI } from '../UserRoleAssignment/UserRoleAssignment.functions';
import { IRole } from '../UserRoleAssignment/UserRoleAssignment.types';
import { setDisabledButton, setIsEditOpen } from './../../../DisplayFramework/State/Slices/RolesSlice';
import { IRootState } from './../../../DisplayFramework/State/store';
import ModalBox from './../../LibraryComponents/ModalBox/ModalBox';
import { PlusIcon } from './RoleBrowse.svg';
import { useStyles } from './RolesBrowse.styles';
import { IProps } from './RolesBrowse.types';
import {
  getBlueDotsOfAStaffForAnyPatient,
  getClientDetailsForAStaff,
} from '../../LibraryComponents/ChatComponent/BlueDotPopUp/BlueDotClosePopUp/BlueDotClosePopUp.functions';
import ErrorToaster from '../../../Common/ErrorToaster';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function RolesBrowse(props: IProps) {
  const { patientId, selectedClient, sessions, panel, registerEvent, unRegisterEvent, injectComponent } = props;
  // const classes = useStyles();
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const CommonStyles = useCommonStyles();
  const [selectedData, setSelectedData] = React.useState<any>();
  const [selectedRole, setSelectedRole] = React.useState<IRole>();
  const [roles, setRoles] = React.useState<IRole[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [editData, setEditData] = useState<any>();
  const [canUpdateReportees, setCanUpdateReportees] = useState(false);

  let myRolesSubscription: any;
  const dispatch = useDispatch();
  const disabledbutton = useSelector((state: IRootState) => state.RolesDataSlice.disabledbutton);
  const isEditOpen = useSelector((state: IRootState) => state.RolesDataSlice.isEditOpen);

  useEffect(() => {
    dispatch(setDisabledButton(false));
    dispatch(setIsEditOpen(false));
    PMS_S3.getObject(
      `pms-ql-roles/${selectedClient.client_id}/${selectedClient.tenant_id}/myRoles.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: selectedClient.tenant_id,
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: sessions.id_token,
        headers: {},
      },
      []
    )
      .then((userRoles) => {
        if (!userRoles.Error) {
          setRoles(userRoles?.roles || []);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    myRolesSubscription = registerEvent(patientId, 'pms-ql-roles', () => {
      PMS_S3.getObject(
        `pms-ql-roles/${selectedClient.client_id}/${selectedClient.tenant_id}/myRoles.json`,
        import.meta.env.VITE_CLIENT_BUCKET,
        {
          TenantId: selectedClient.tenant_id,
          Locale: sessionStorage.getItem('locale'),
          url: import.meta.env.VITE_S3_FETCH_API,
          token: sessions.id_token,
          headers: {},
        },
        []
      )
        .then((userRoles) => {
          if (!userRoles.Error) {
            setRoles(JSON.parse(JSON.stringify(userRoles?.roles || [])));
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, []);
  const [confirmActive, setConfirmActive] = useState(false);
  const [discardModal, setDiscardModal] = useState(false);

  const [activate, setActivate] = useState({
    roleId: '',
    activate: false,
  });

  const handleThreedotmenu = (action, data, activate) => {
    setEditData(JSON.parse(JSON.stringify(data)));
    if (action === 'Edit') {
      if (isEditOpen) {
        setDiscardModal(true);
      } else {
        dispatch(setDisabledButton(true));
        setSelectedRole(data);
        props.childEventTrigger(null, null, 'onEditRole', {
          injectComponent: props.injectComponent,
          patientId: patientId,
          selectedClient: selectedClient,
          sessions: sessions,
          roleId: data?.roleId,
          roleName: data?.roleName,
          reportsTo: data?.reportingTo,
          reportees: data?.reportees,
          shiftSegments: JSON.parse(JSON.stringify(data?.shiftSegments.map((shift) => ({ ...shift, segmentId: v4() })) || [])),
          is_active: data?.is_active,
          roles: roles,
          isEdit: true,
          autoAssignment: data?.autoAssignment,
          manualAssignment: data?.manualAssignment,
          handleBackButton: () => {},
          handleSubmitButton: () => {},
          panel: panel,
          registerEvent: registerEvent,
          unRegisterEvent: unRegisterEvent,
        });
      }
    } else {
      setActivate({ roleId: data.roleId, activate: activate });
      setConfirmActive(true);
      setSelectedData(data);
    }
  };

  const handleActiveState = (data, activate) => {
    // console.log('this is triggereing');
    setActivate({ roleId: data.roleId, activate: activate });
    setConfirmActive(true);
    setSelectedData(data);
  };

  const handleEditRole = async (data) => {
    // try {
    //   let bluedots = await getBlueDotsOfAStaffForAnyPatient(props.sessions, data?.roleId, selectedClient.client_id);
    //   if (bluedots.length > 0) {
    //     ErrorToaster('The staff you are trying to modify has unresolved bluedots');
    //     throw new Error('Something went wrong! Please try again');
    //   }
    // } catch (e) {
    //   throw new Error('Something went wrong! Please try again');
    // }
    setEditData(JSON.parse(JSON.stringify(data)));
    if (isEditOpen) {
      setDiscardModal(true);
    } else {
      dispatch(setDisabledButton(true));
      setSelectedRole(data);
      props.childEventTrigger(null, null, 'onEditRole', {
        injectComponent: props.injectComponent,
        patientId: patientId,
        selectedClient: selectedClient,
        sessions: sessions,
        roleId: data?.roleId,
        roleName: data?.roleName,
        reportsTo: data?.reportingTo,
        reportees: data?.reportees,
        shiftSegments: JSON.parse(JSON.stringify(data?.shiftSegments.map((shift) => ({ ...shift, segmentId: v4() })) || [])),
        is_active: data?.is_active,
        roles: roles,
        isEdit: true,
        autoAssignment: data?.autoAssignment,
        manualAssignment: data?.manualAssignment,
        handleBackButton: () => {},
        handleSubmitButton: () => {},
        panel: panel,
        registerEvent: registerEvent,
        unRegisterEvent: unRegisterEvent,
        handleActiveState,
      });
    }
  };

  const handleDiscard = () => {
    setSelectedRole(editData);
    setDiscardModal(false);
    props.childEventTrigger(null, null, 'onEditRole', {
      injectComponent: props.injectComponent,
      patientId: patientId,
      selectedClient: selectedClient,
      sessions: sessions,
      roleId: editData?.roleId,
      roleName: editData?.roleName,
      reportsTo: editData?.reportingTo,
      reportees: editData?.reportees,
      shiftSegments: JSON.parse(JSON.stringify(editData?.shiftSegments.map((shift) => ({ ...shift, segmentId: v4() })) || [])),
      is_active: editData?.is_active,
      roles: roles,
      isEdit: true,
      handleBackButton: () => {},
      handleSubmitButton: () => {},
      panel: panel,
      registerEvent: registerEvent,
      unRegisterEvent: unRegisterEvent,
    });
  };
  const addRoles = () => {
    dispatch(setDisabledButton(true));
    setSelectedRole(createDefaultRoleObject());
    props.childEventTrigger(null, null, 'onEditRole', {
      roleId: uuid(),
      roleName: '',
      reportsTo: [],
      reportees: [],
      shiftSegments: [],
      is_active: true,
      autoAssignment: true,
      manualAssignment: true,
      injectComponent: props.injectComponent,
      patientId: patientId,
      selectedClient: selectedClient,
      sessions: sessions,

      roles: roles,
      isEdit: false,
      handleBackButton: () => {},
      handleSubmitButton: () => {},
      panel: panel,
      registerEvent: registerEvent,
      unRegisterEvent: unRegisterEvent,
    });
  };
  const handleCancelModal = () => {
    setConfirmActive(false);
    setActivate({ roleId: '', activate: false });
  };
  let updatedRole: any = JSON.parse(JSON.stringify(roles));
  const goBack = useDFGoBack();

  const handleSaveModal = async () => {
    let updatedRole: any = JSON.parse(JSON.stringify(roles));
    updatedRole = updatedRole.find((role) => role.roleId === activate.roleId);
    if (!updatedRole) return;
    if (updatedRole) {
      updatedRole.is_active = !updatedRole.is_active;
      updatedRole.action = 'UPDATE';
    }
    setIsLoading(true);
    try {
      if (selectedData?.is_active) {
        let bluedots = await getBlueDotsOfAStaffForAnyPatient(
          panelId,
          props.sessions,
          updatedRole.roleId,
          selectedClient.client_id
        );
        let clients = await getClientDetailsForAStaff(panelId, props.sessions, updatedRole.roleId, selectedClient.client_id);
        if (bluedots.length > 0 || clients.length > 0) {
          ErrorToaster('The staff you are trying to disable has unresolved bluedots or client assigned', panelId, 'error');
          throw new Error('Something went wrong! Please try again');
        }
      }
    } catch (e) {
      throw new Error('Something went wrong! Please try again');
    }
    updateRoleAPI(updatedRole, roles, selectedClient, sessions)
      .then(() => {
        setIsLoading(false);
        setConfirmActive(false);
        setActivate({ roleId: '', activate: false });
        dispatch(setDisabledButton(false));
        dispatch(setIsEditOpen(false));
      })
      .finally(() => {
        setIsLoading(false);
        goBack();
      });
  };
  return (
    <div className={classes.container}>
      <PageHeader
        headerContent={`Roles`}
        customStyle={classes.headerStyle}
        handleBack={() => {
          goBack('S');
        }}
      />
      <div className={classes.scrollBody}>
        {roles.length > 0 ? (
          roles.map((ele, ind) => {
            return (
              <BrowseRole
                roles={{
                  ...ele,
                  shiftSegments: [...JSON.parse(JSON.stringify(ele?.shiftSegments || []))].map((value) => {
                    value.weekDays = convertDaysToUTCDays(value.startTime, value.weekDays, false);
                    return value;
                  }),
                }}
                handleThreedotmenu={(action, activate) => handleThreedotmenu(action, ele, activate)}
                key={ind}
                handleOnCardClick={() => handleEditRole(ele)}
              />
            );
          })
        ) : (
          <div className={`${CommonStyles.body15Medium} ${classes.noDataCon}`}>Add Role</div>
        )}
      </div>
      {/* <div className={classes.positionabsolute}> */}
      <div className={classes.footerDiv}>
        <span className={classes.addButtonWrapper}>
          <button
            onClick={addRoles}
            className={disabledbutton == true ? classes.addButtonDisabled : classes.addButton}
            disabled={disabledbutton}
          >
            <PlusIcon />
          </button>
        </span>
        {/* </div> */}
      </div>
      <ModalBox
        panelWidth={panel?.width}
        open={confirmActive}
        handleClose={handleCancelModal}
        modalTitle={'Deactivate'}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('Cancel'),
            variant: 'text',
            onClick: handleCancelModal,
          },
          {
            text: PMS_LOCALE.translate('Confirm'),
            variant: 'contained',
            onClick: handleSaveModal,
          },
        ]}
      >
        <div className={classes.modalWrapper}>
          {/* Are you sure you want to deactivate this role? */}
          {selectedData?.is_active
            ? 'Are you sure you want to deactivate this role?'
            : 'Are you sure you want to activate this role?'}
        </div>
      </ModalBox>
      <ModalBox
        panelWidth={panel?.width}
        open={discardModal}
        handleClose={() => {
          setDiscardModal(false);
        }}
        modalTitle={'Discard'}
        buttonConfig={[
          {
            text: PMS_LOCALE.translate('Cancel'),
            variant: 'text',
            onClick: () => {
              setDiscardModal(false);
            },
          },
          {
            text: PMS_LOCALE.translate('Discard'),
            variant: 'contained',
            onClick: handleDiscard,
          },
        ]}
      >
        <div className={classes.modalWrapper}>Are you sure you want to discard changes?</div>
      </ModalBox>
    </div>
  );
}
