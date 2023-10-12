import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../DisplayFramework/State/store';
// import { IRootState } from '../../DisplayFramework/State/store';
import { useFetchUserName } from '../../../Common/Common.hooks';
import AssignLeadDoctor from '../../LibraryComponents/TeamAssignment/AssignLeadDoctor/AssignLeadDoctor';
import NoResults from '../../LibraryComponents/TeamAssignment/AssignLeadDoctor/NoResults';
import { formatStaffDetails, getAllStaffRoles, getStaff } from '../../LibraryComponents/TeamAssignment/CareTeam.functions';
import {
  Actions,
  IProps,
  ISelectedClient,
  ITransferData,
  StaffCard,
} from '../../LibraryComponents/TeamAssignment/CareTeam.types';
import ManualStaffAdd from '../../LibraryComponents/TeamAssignment/ManualStaffAdd/ManualStaffAdd';
import SelectRole from '../../LibraryComponents/TeamAssignment/SelectRole/SelectRole';
import StaffTeam from '../../LibraryComponents/TeamAssignment/StaffTeam/StaffTeam';
import UserListView from './ClientToStaffAssignment';
import { useStyles } from './ClientToStaffAssignment.styles';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';

const CareTeam = (props: IProps) => {
  const {
    sessions,
    defaultScreen,
    selectedBulkRole,
    selectedClient,
    eligibleRolesCheck = false,
    selectedBulkClient,
    registerEvent,
    unRegisterEvent,
  } = props;

  const [isLoading, setIsLoading] = useState(false as boolean);
  const [selectedRole, setSelectedRole] = useState({ value: '', label: '' });
  const [actionType, setActionType] = useState<Actions>(defaultScreen || 'STAFF_SEARCH');
  const [allProfiles, setAllProfiles] = useState([] as Array<StaffCard>);
  const [roles, setRoles] = useState([]);
  const [assignRolesLength, setAssignRolesLength] = useState(0);
  const [removeSelectedRole, setRemoveSelectedRole] = useState('');
  const [transferData, setTransferData] = useState<ITransferData>(null);
  const { id: panelId } = useCurrentPanel();
  const [selectedUser, setSelectedUser] = useState<any>({ value: '', label: '', tenantId: '' });

  const selectedClientObject = useSelector((state: IRootState) => state.dashboard.selectedClientObject);

  const mySelectedClient: ISelectedClient = selectedBulkClient || selectedClient;
  const { fetchUserName } = useFetchUserName();

  useEffect(() => {
    if (defaultScreen) {
      setActionType(defaultScreen);
    }
  }, [defaultScreen]);

  useEffect(() => {
    if (selectedBulkRole) {
      setSelectedRole(selectedBulkRole);
    }
  }, [selectedBulkRole]);

  let staffSub: any;
  useEffect(() => {
    if (eligibleRolesCheck) {
      setActionType('SELECT_ROLE');
    }
  }, [eligibleRolesCheck]);
  useEffect(() => {
    if (Object.keys(roles).length) {
      setAssignRolesLength(Object.keys(roles).length);
    }
  }, [roles]);

  useEffect(() => {
    (async () => {
      if (eligibleRolesCheck && selectedUser.value) {
        const allRolesData: any = await getAllStaffRoles(panelId, sessions, {
          tenant_id: selectedUser.tenantId,
          client_id: selectedUser.value,
        });
        if (allRolesData?.data?.length) {
          let eleigbleRolesOptions =
            allRolesData?.data?.map((each) => ({
              label: each.roleName || each.sort_key,
              value: each.sort_key,
            })) || [];
          if (removeSelectedRole.length) {
            eleigbleRolesOptions = eleigbleRolesOptions.filter((each) => each.value !== removeSelectedRole);
          }
          setRoles(eleigbleRolesOptions);
        }
      }
    })();
  }, [actionType]);

  useEffect(() => {
    if (selectedUser.value) {
      (async () => {
        if (eligibleRolesCheck) {
          const allRolesData: any = await getAllStaffRoles(panelId, sessions, {
            tenant_id: selectedUser.tenantId,
            client_id: selectedUser.value,
          });

          if (allRolesData?.data?.length) {
            let eleigbleRolesOptions =
              allRolesData?.data?.map((each) => ({
                label: each.roleName || each.sort_key,
                value: each.sort_key,
              })) || [];
            if (removeSelectedRole.length) {
              eleigbleRolesOptions = eleigbleRolesOptions.filter((each) => each.value !== removeSelectedRole);
            }
            setRoles(eleigbleRolesOptions);
          }
        } else {
          const response: any = await getAllStaffRoles(panelId, sessions, {
            tenant_id: selectedUser.tenantId,
            client_id: selectedUser.value,
          });
          if (response.data.length) {
            const rolesOptions =
              response.data
                .map((data) => ({
                  label: data.roleName,
                  value: data.sort_key,
                }))
                .filter((role) => role.value !== 'basic-user') || [];
            setRoles(rolesOptions);
          }
        }
      })();
      setIsLoading(true);
      getStaff(selectedUser.value, sessions)
        .then(async (res) => {
          if (res) {
            let staff = formatStaffDetails(selectedUser.tenantId, roles, res);
            for (let i = 0; i < staff.length; i++) {
              // let userName = await getUserName(staff[i].id, sessions);
              let userName = await fetchUserName(staff[i].id);
              staff[i].name = userName;
            }
            staff = staff.filter((user) => user.id !== selectedUser.value && !user.isWatching);
            setAllProfiles(staff);
          } else {
            setAllProfiles([]);
          }
        })
        .finally(() => {
          setIsLoading(false);
          setActionType('STAFF_HOME');
        });

      if (staffSub) {
        (async () => {
          await unRegisterEvent(staffSub);
        })();
      }
      staffSub = registerEvent(`${'amura'}~${selectedUser.value}`, 'ASSIGN_STAFF', () => {
        setIsLoading(true);
        getStaff(selectedUser.value, sessions)
          .then(async (res) => {
            if (res) {
              let staff = formatStaffDetails(selectedUser.tenantId, roles, res);
              for (let i = 0; i < staff.length; i++) {
                // let userName = await getUserName(staff[i].id, sessions);
                let userName = await fetchUserName(staff[i].id);
                staff[i].name = userName;
              }
              staff = staff.filter((user) => user.id !== selectedUser.value);
              setAllProfiles(staff);
            } else {
              setAllProfiles([]);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
    }

    return () => {
      if (staffSub) {
        unRegisterEvent(staffSub);
      }
    };
  }, [selectedUser]);

  {
    switch (actionType) {
      case 'STAFF_SEARCH': {
        return <UserListView {...props} setSelectedUser={setSelectedUser} setActionType={setActionType} isLoading={isLoading} />;
      }
      case 'STAFF_HOME': {
        return (
          <StaffTeam
            {...props}
            setTransferData={setTransferData}
            patientId={selectedUser?.value || ''}
            selectedClient={{ tenant_id: selectedUser.tenantId, client_id: selectedUser.value, label: selectedUser.label }}
            setActionType={setActionType}
            allProfiles={allProfiles}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            eligibleRolesCheck={eligibleRolesCheck}
            assignRolesLength={assignRolesLength}
            showCancleToSearchUsers={true}
            setSelectedRole={setSelectedRole}
          />
        );
      }
      case 'SELECT_ROLE': {
        return (
          <SelectRole
            {...props}
            patientId={selectedUser?.value || ''}
            selectedClient={{ tenant_id: selectedUser.tenantId, client_id: selectedUser.value }}
            roles={roles}
            setActionType={setActionType}
            setSelectedRole={setSelectedRole}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            eligibleRolesCheck={eligibleRolesCheck}
          />
        );
      }
      case 'ASSIGN_LEAD': {
        return (
          <AssignLeadDoctor
            {...props}
            patientId={selectedUser?.value || ''}
            selectedClient={{ tenant_id: selectedUser.tenantId, client_id: selectedUser.value }}
            setActionType={setActionType}
            selectedRole={selectedRole}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            allProfiles={allProfiles}
            eligibleRolesCheck={eligibleRolesCheck}
            assignRolesLength={assignRolesLength}
            setRemoveSelectedRole={setRemoveSelectedRole}
          />
        );
      }
      case 'NO_RESULTS': {
        return <NoResults {...props} setActionType={setActionType} selectedRole={selectedRole} />;
      }
      case 'ADD_MANUALLY': {
        return (
          <ManualStaffAdd
            {...props}
            transferData={transferData}
            patientId={selectedUser?.value || ''}
            selectedClient={{ tenant_id: selectedUser.tenantId, client_id: selectedUser.value }}
            setActionType={setActionType}
            selectedRole={selectedRole}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            allProfiles={allProfiles}
            eligibleRolesCheck={eligibleRolesCheck}
            assignRolesLength={assignRolesLength}
            setRemoveSelectedRole={setRemoveSelectedRole}
          />
        );
      }
    }
  }
};

export default CareTeam;
