import { PMS_S3 } from '../../../Utils';

export const getAllRolesAcrossATenant = async (session: any, selectedClient: any): Promise<any> => {
  PMS_S3.getObject(
    `pms-ql-roles/${selectedClient.client_id}/${selectedClient.tenant_id}/myRoles.json`,
    import.meta.env.VITE_CLIENT_BUCKET,
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: session.id_token,
      headers: {},
    },
    []
  )
    .then((data) => {
      return Promise.resolve(data);
    })
    .catch((err) => {
      console.log('Error in fetching data', err);
      return Promise.reject(err);
    });
};
