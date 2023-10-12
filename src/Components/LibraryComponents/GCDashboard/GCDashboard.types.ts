export interface IProps {}

export type DashBoard = {
  status: string;
  count: number;
};

export type StaffData = {
  client: number;
  staffId: string;
  status: string;
  staffName: string;
};

export type ClientData = {
  clientId: string;
  status: string;
  userName: string;
};

export interface IClientData {
  [key: string]: Array<ClientData>;
}

export interface BasicInfo {
  active: string;
  stage: string;
  totalUser: number;
  edit: boolean;
}
