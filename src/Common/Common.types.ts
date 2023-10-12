export interface ISession {
  id_token: string;
  access_token: string;
  refreshToken: string;
  access_token_expiration: number;
  user: any;
  errorMessage?: string;
}

export interface ISelectedClient {
  client_id: string;
  client_name: string;
  tenant_id: string;
  channelId: string;
}

export interface ISelectedTenant {
  tenant_id: string;
  tenant_name: string;
  client_id?: string;
}

export interface IPanel {
  width: number;
}
