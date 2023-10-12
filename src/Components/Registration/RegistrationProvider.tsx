import { useEffect, useState } from 'react';
import { useSetUserSession, useUserInfo, useUserSession } from '../../DisplayFramework/State/Slices/Auth';
import LoadingScreen from '../PanelComponents/ErrorBoundary/ErrorScreen/LoadingScreen';
import { getSession, refreshAccessToken, RefreshTokenIntervals } from './Registration.functions';
import ErrorToaster from '../../Common/ErrorToaster';
import { useDispatch } from 'react-redux';
import { useCurrentPanel } from '../../DisplayFramework/Components/Panel/Panel.hooks';
import { useAppDispatch } from '../../DisplayFramework/State/store';
import { ISession } from '../../Common/Common.types';

export default function AuthProvider(props: { children?: React.ReactNode; noAuthChildren?: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const userInfo = useUserInfo();
  const userSession = useUserSession();
  const setUserSession = useSetUserSession();
  const dispatch = useAppDispatch();
  const [errorPopupTrigger, setErrorPopupTrigger] = useState(false);

  const userLoggedIn = localStorage.getItem('UserLoggedIn');

  useEffect(() => {
    if (errorPopupTrigger) {
      throw new Error('something went wrong!!!');
    }
  }, [errorPopupTrigger]);

  useEffect(() => {
    (async () => {
      if (userLoggedIn) {
        setLoading(true);
        try {
          const session = await getSession(dispatch);
          if (session) {
            setUserSession(session);
          }
        } catch (error) {}
        setLoading(false);
      } else {
        setLoading(false);
      }
    })();

    //
  }, [userLoggedIn]);

  useEffect(() => {
    if (!RefreshTokenIntervals.accessTokenInterval && userSession?.access_token_expiration) {
      RefreshTokenIntervals.accessTokenInterval = setTimeout(async () => {
        const res = (await refreshAccessToken(userSession)) as ISession;
        if (res.errorMessage) {
          if (res.errorMessage === 'Network error') {
            setErrorPopupTrigger(true);
            return;
          }
          if (res.errorMessage === 'UnKnown') {
            sessionStorage.clear();
            localStorage.removeItem('UserLoggedIn');
            ErrorToaster('Session Expired!');
            window.location.href = '/login';
            return;
          }
        }
        setUserSession(res);
      }, userSession.access_token_expiration);
    }
  }, [userSession]);

  //

  if (loading) {
    // Loading
    return <LoadingScreen />;
  }

  //

  if (userSession) {
    return <>{props.children}</>;
  }

  return <>{props.noAuthChildren}</>;
}
