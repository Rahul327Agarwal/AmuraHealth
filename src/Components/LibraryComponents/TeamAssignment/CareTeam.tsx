import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../DisplayFramework/State/store';
// import { IRootState } from '../../DisplayFramework/State/store';
import AssignLeadDoctor from './AssignLeadDoctor/AssignLeadDoctor';
import NoResults from './AssignLeadDoctor/NoResults';
import { formatStaffDetails, getAllStaffRoles, getEligibleRoles, getStaff, getUserName } from './CareTeam.functions';
import { Actions, IProps, ISelectedClient, ITransferData, StaffCard } from './CareTeam.types';
import ManualStaffAdd from './ManualStaffAdd/ManualStaffAdd';
import SelectRole from './SelectRole/SelectRole';
import StaffTeam from './StaffTeam/StaffTeam';
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

  const [isLoading, setIsLoading] = useState(true as boolean);
  const [selectedRole, setSelectedRole] = useState({ value: '', label: '' });
  const [actionType, setActionType] = useState<Actions>(defaultScreen || 'STAFF_HOME');
  const [allProfiles, setAllProfiles] = useState([] as Array<StaffCard>);
  const [roles, setRoles] = useState([]);
  const [assignRolesLength, setAssignRolesLength] = useState(0);
  const [removeSelectedRole, setRemoveSelectedRole] = useState('');
  const [transferData, setTransferData] = useState<ITransferData>(null);
  const { id: panelId } = useCurrentPanel();
  const selectedClientObject = useSelector((state: IRootState) => state.dashboard.selectedClientObject);

  const mySelectedClient: ISelectedClient = selectedBulkClient || selectedClient;

  useEffect(() => {
    if (defaultScreen) {
      setActionType(defaultScreen);
    }
  }, [defaultScreen, mySelectedClient?.client_id]);

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
    (async () => {
      if (eligibleRolesCheck) {
        console.log(selectedClientObject, 'selectedClientObject');
        const allRolesData: any = await getAllStaffRoles(panelId, sessions, mySelectedClient);
        const response: any = await getEligibleRoles(panelId, sessions, mySelectedClient, selectedClientObject.roleId);
        if (response?.data?.eligibleRoles?.length) {
          let eleigbleRolesOptions =
            response?.data?.eligibleRoles.map((data) => ({
              label: (allRolesData?.data || []).find((role) => role.sort_key === data)?.roleName || data,
              value: (allRolesData?.data || []).find((role) => role.sort_key === data)?.sort_key || data,
            })) || [];
          if (removeSelectedRole.length) {
            eleigbleRolesOptions = eleigbleRolesOptions.filter((each) => each.value !== removeSelectedRole);
          }
          setRoles(eleigbleRolesOptions);
        }
      } else {
        const response: any = await getAllStaffRoles(panelId, sessions, mySelectedClient);
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
  }, []);
  useEffect(() => {
    if (Object.keys(roles).length) {
      setAssignRolesLength(Object.keys(roles).length);
    }
  }, [roles]);

  useEffect(() => {
    console.log('!!actionType', actionType);

    (async () => {
      if (eligibleRolesCheck) {
        console.log(selectedClientObject, 'selectedClientObject');
        const allRolesData: any = await getAllStaffRoles(panelId, sessions, mySelectedClient);
        const response: any = await getEligibleRoles(panelId, sessions, mySelectedClient, selectedClientObject.roleId);
        if (response?.data?.eligibleRoles?.length) {
          let eleigbleRolesOptions =
            response?.data?.eligibleRoles.map((data) => ({
              label: (allRolesData?.data || []).find((role) => role.sort_key === data)?.roleName || data,
              value: (allRolesData?.data || []).find((role) => role.sort_key === data)?.sort_key || data,
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
    if (mySelectedClient) {
      console.log('!!mySelectedClient', mySelectedClient);

      getStaff(mySelectedClient?.client_id, sessions)
        .then(async (res) => {
          if (res) {
            let staff = formatStaffDetails(mySelectedClient?.tenant_id, roles, res);
            for (let i = 0; i < staff.length; i++) {
              let userName = await getUserName(staff[i].id, sessions);
              staff[i].name = userName;
            }
            staff = staff.filter((user) => user.id !== mySelectedClient?.client_id);
            setAllProfiles(staff);
          } else {
            setAllProfiles([]);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
      staffSub = registerEvent(`${'amura'}~${mySelectedClient?.client_id}`, 'ASSIGN_STAFF', () => {
        setIsLoading(true);
        getStaff(mySelectedClient?.client_id, sessions)
          .then(async (res) => {
            if (res) {
              let staff = formatStaffDetails(mySelectedClient?.tenant_id, roles, res);
              for (let i = 0; i < staff.length; i++) {
                let userName = await getUserName(staff[i].id, sessions);
                staff[i].name = userName;
              }
              staff = staff.filter((user) => user.id !== mySelectedClient?.client_id);
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
  }, [mySelectedClient, roles]);

  {
    switch (actionType) {
      case 'STAFF_HOME': {
        return (
          <StaffTeam
            {...props}
            setTransferData={setTransferData}
            selectedClient={mySelectedClient}
            setActionType={setActionType}
            allProfiles={allProfiles}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            eligibleRolesCheck={eligibleRolesCheck}
            assignRolesLength={assignRolesLength}
            setSelectedRole={setSelectedRole}
          />
        );
      }
      case 'SELECT_ROLE': {
        return (
          <SelectRole
            {...props}
            selectedClient={mySelectedClient}
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
            selectedClient={mySelectedClient}
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
            selectedClient={mySelectedClient}
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
