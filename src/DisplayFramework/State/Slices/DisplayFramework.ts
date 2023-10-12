import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IScreen } from '../../Interfaces/IScreen';
import { useAppDispatch, useAppSelector } from '../store';
import { ISelectedClient } from '../../../Common/Common.types';
export interface IUserInformation {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: Array<string>;
  rolesAcrossTenants: Array<string>;
  mobile: string;
  allRoles: Array<string>;
}
const DisplayFrameWork = createSlice({
  name: 'display',
  initialState: {
    selectedClient: {} as any,
    selectedTenant: {} as any,

    //
    // OLD
    clientListDisplay: [],
    clientSummaryDisplay: [],
    componentJSON: [],
    userProfile: '',
    passAsProperties: {} as any,
    loggedInUserInformation: {
      allRoles: [],
    } as IUserInformation,
  },
  reducers: {
    setSelectedClient: (state, action: PayloadAction<any>) => {
      state.selectedClient = action.payload as any;
    },
    setSelectedTenant: (state, action: PayloadAction<any>) => {
      state.selectedTenant = action.payload as any;
    },
    setLoggedInUserInformation: (state, action: PayloadAction<IUserInformation>) => {
      state.loggedInUserInformation = action.payload;
    },
    //
    // OLD
    setClientListDisplay: (state, action: PayloadAction<IScreen[]>) => {
      state.clientListDisplay = action.payload as any;
    },
    setClientSummaryDisplay: (state, action: PayloadAction<IScreen[]>) => {
      state.clientSummaryDisplay = action.payload as any;
    },
    setUserProfile: (state, action: PayloadAction<string>) => {
      state.userProfile = action.payload as any;
    },
    setComponentJSON: (state, action: PayloadAction<any>) => {
      state.componentJSON = action.payload as any;
    },
    setPassAsProperties: (state, action: PayloadAction<any>) => {
      state.passAsProperties = action.payload as any;
    },
  },
});
export const {
  setSelectedClient,
  setSelectedTenant,
  setLoggedInUserInformation,
  //OLD
  setClientListDisplay,
  setClientSummaryDisplay,
  setUserProfile,
  setComponentJSON,
  setPassAsProperties,
} = DisplayFrameWork.actions;
export default DisplayFrameWork.reducer;

//Hooks

export const useSelectedClient = () => useAppSelector((s) => s.displayFrameWork.selectedClient as ISelectedClient);
export const useSelectedTenant = () => useAppSelector((s) => s.displayFrameWork.selectedTenant);

export const useSetSelectedClient = () => {
  const dispatch = useAppDispatch();
  return (client: any) => dispatch(setSelectedClient(client));
};

export const useSetSelectedTenant = () => {
  const dispatch = useAppDispatch();
  return (tenant: any) => dispatch(setSelectedTenant(tenant));
};
