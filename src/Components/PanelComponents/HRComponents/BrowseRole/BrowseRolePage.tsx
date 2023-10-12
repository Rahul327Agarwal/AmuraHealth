import React, { useEffect, useState } from 'react';
import { PMS_S3 } from '../../../../Utils';
import { PlusIcon } from '../../../SVGs/Common';
import BrowseRole from './BrowseRole';
import { useStyles } from './BrowseRole.styles';
import { BrowsePage, IRole, createDefaultRoleObject } from './BrowseRole.types';

export default function BrowseRolePage(props: BrowsePage) {
  const { patientId, selectedClient, sessions, registerEvent, injectComponent } = props;

  const { classes } = useStyles();

  const [selectedRole, setSelectedRole] = useState<IRole>();
  const [roles, setRoles] = useState([]);

  let myRolesSubscription: any;
  useEffect(() => {
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
      .finally(() => {});

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
            setRoles(userRoles?.roles || []);
          }
        })
        .finally(() => {});
    });
  }, []);
  const handleThreedotmenu = (action: string, data: React.SetStateAction<IRole | undefined>) => {
    if (action === 'Edit') {
      setSelectedRole(data);
      props.childEventTrigger('MyDashboard', 'MyDashboard', 'onEditRole', {
        data: data,
        injectComponent: { injectComponent },
        patientId: { patientId },
        selectedClient: { selectedClient },
        sessions: { sessions },
      });
    }
  };
  const handleOnCardClick = () => {};
  const handleEdit = (id: string) => {
    let selected = roles.find((role: any) => role.roleId === id);
    setSelectedRole(selected);
  };
  const addRoles = () => {
    setSelectedRole(createDefaultRoleObject());
    props.childEventTrigger('MyDashboard', 'MyDashboard', 'onEditRole', {
      data: selectedRole,
      injectComponent: { injectComponent },
      patientId: { patientId },
      selectedClient: { selectedClient },
      sessions: { sessions },
    });
  };

  return (
    <div className={classes.container}>
      {roles.map((ele, ind) => {
        return (
          <BrowseRole
            roles={ele}
            handleThreedotmenu={(action: any) => handleThreedotmenu(action, ele)}
            handleOnCardClick={handleOnCardClick}
            handleEdit={(id) => handleEdit(id)}
            key={ind}
          />
        );
      })}

      <div className={classes.footerDiv}>
        <span className={classes.addButtonWrapper}>
          <button onClick={addRoles} className={classes.addButton}>
            <PlusIcon />
          </button>
        </span>
      </div>
    </div>
  );
}
