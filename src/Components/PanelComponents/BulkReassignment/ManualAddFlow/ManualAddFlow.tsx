import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatStaffDetails, getAllStaffRoles, getEligibleRoles, getStaff, getUserName } from './ManualAddFlow.functions';
import { ActionsManualAdd, IProps, ITransferData, StaffCard } from './ManualAddFlow.types';
import NoResults from '../AssignLeadDoctor/NoResults';
import AssignLeadDoctor from '../AssignLeadDoctor/AssignLeadDoctor';
import ManualStaffAdd from '../ManualStaffAdd/ManualStaffAdd';
import { IRootState } from '../../../../DisplayFramework/State/store';
import { ISelectedClient } from '../../../../Common/Common.types';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';

const ManualAddFlow = (props: IProps) => {
  const {
    sessions,
    // defaultScreen,
    // selectedBulkRole,
    selectedClient,
    eligibleRolesCheck = false,
    // selectedBulkClient,
    registerEvent,
    unRegisterEvent,
    setAction,
  } = props;

  const [selectedRole, setSelectedRole] = useState({ value: '', label: '' });
  const { id: panelId } = useCurrentPanel();
  const [actionType, setActionType] = useState<ActionsManualAdd>('ASSIGN_LEAD');
  const [allProfiles, setAllProfiles] = useState([] as Array<StaffCard>);
  const [roles, setRoles] = useState([]);
  const [assignRolesLength, setAssignRolesLength] = useState(0);
  const [removeSelectedRole, setRemoveSelectedRole] = useState('');
  const [transferData, setTransferData] = useState<ITransferData>(null);
  const selectedClientObject = useSelector((state: IRootState) => state.dashboard.selectedClientObject);

  const mySelectedClient: ISelectedClient = selectedClient;

  let staffSub: any;
  useEffect(() => {
    (async () => {
      if (eligibleRolesCheck) {
        const allRolesData: any = await getAllStaffRoles(panelId, sessions, mySelectedClient);
        const response: any = await getEligibleRoles(sessions, mySelectedClient, selectedClientObject.roleId);
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

  {
    switch (actionType) {
      case 'ASSIGN_LEAD': {
        return (
          <AssignLeadDoctor
            {...props}
            selectedClient={mySelectedClient}
            setActionType={setActionType}
            selectedRole={selectedRole}
            allProfiles={allProfiles}
            eligibleRolesCheck={eligibleRolesCheck}
            // assignRolesLength={assignRolesLength}
            // setRemoveSelectedRole={setRemoveSelectedRole}
            setAction={setAction}
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
            allProfiles={allProfiles}
            eligibleRolesCheck={eligibleRolesCheck}
            // assignRolesLength={assignRolesLength}
            // setRemoveSelectedRole={setRemoveSelectedRole}
          />
        );
      }
    }
  }
};

export default ManualAddFlow;
