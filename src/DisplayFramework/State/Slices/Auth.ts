import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserDetails } from '../../../Components/Registration/Registration.types';
import { useAppDispatch, useAppSelector } from '../store';
import { ISession } from '../../../Common/Common.types';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: undefined as undefined | IUserDetails,
    userSession: undefined as undefined | ISession,
  },
  reducers: {
    setUserInfo(state, action: PayloadAction<IUserDetails>) {
      state.userInfo = action.payload;
    },
    setUserSession(state, action: PayloadAction<ISession>) {
      state.userSession = action.payload;
    },
  },
});

export const { setUserInfo, setUserSession } = AuthSlice.actions;

export default AuthSlice.reducer;

//Hooks

// User Details
export const useUserInfo = () => useAppSelector((s) => s.auth.userInfo);
export const useSetUserInfo = () => {
  const dispatch = useAppDispatch();
  return (userInfo: IUserDetails) => dispatch(setUserInfo(userInfo));
};

// User Session
export const useUserSession = () => useAppSelector((s) => s.auth.userSession);
export const useSetUserSession = () => {
  const dispatch = useAppDispatch();
  return (userSession: ISession) => dispatch(setUserSession(userSession));
};
