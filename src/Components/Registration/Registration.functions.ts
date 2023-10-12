import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import ErrorToaster from '../../Common/ErrorToaster';
import { PMS_S3 } from '../../Utils';
import { ISession } from '../../Common/Common.types';
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { setLoggedInUserInformation } from '../../DisplayFramework/State/Slices/DisplayFramework';

export const getSession = async (dispatch: Dispatch<AnyAction>): Promise<ISession | void> => {
  try {
    let session = await Auth.currentSession();
    if (!session) {
      sessionStorage.clear();
      localStorage.removeItem('UserLoggedIn');
      ErrorToaster('Session Expired!');
      window.location.href = '/login';
    }
    let object: ISession = {
      id_token: String(session?.getIdToken().getJwtToken() || ''),
      access_token: String(session?.getAccessToken().getJwtToken() || ''),
      refreshToken: String(session?.getRefreshToken().getToken() || ''),
      access_token_expiration: session?.getAccessToken().getExpiration() * 1000 - new Date().getTime() - 180000,
      user: undefined,
    };
    if (object?.id_token && object?.access_token && object?.refreshToken) {
      return await setUserDetails(object, object, dispatch);
    }
    throw new Error('Session Expired');
  } catch (e) {
    console.error('Error while retrieving the session', e);
    localStorage.removeItem('UserLoggedIn');
    ErrorToaster('Session Expired!');
    window.location.href = '/login';
  }
};

export const setUserDetails = async (
  object: ISession,
  sessions: ISession,
  dispatch: Dispatch<AnyAction>
): Promise<ISession | void> => {
  const reqBody = {
    TenantId: '',
    Locale: '',
    url: import.meta.env.VITE_USER_DETAIL_API || '',
    token: object.id_token || '',
    headers: {},
  };
  try {
    let response = await PMS_S3.postData(reqBody);
    if (response?.body) {
      const { user: User } = response.body;
      let user = '{}';
      let userData = JSON.parse(user);

      userData.id = User.UserName;
      userData.first_name = User.GivenName;
      userData.last_name = User.LastName;
      userData.email = User.EMail;
      userData.roles = User.Roles;
      userData.rolesAcrossTenants = User?.RolesAcrossTenants ?? [];
      userData.mobile = User?.Mobile ?? '';
      userData.allRoles = (userData.roles || []).reduce((pre, current) => {
        return [...pre, ...(current.roles || [])];
      }, []);
      dispatch(setLoggedInUserInformation(userData));
      // let sessionData = sessionData
      let session = {} as ISession;
      session.id_token = object.id_token;
      session.access_token = object.access_token;
      session.refreshToken = object.refreshToken;
      session.access_token_expiration = object.access_token_expiration;
      session.user = userData;
      return session;
    } else {
      sessionStorage.clear();
    }
  } catch (err) {
    localStorage.clear();
    sessionStorage.clear();
    Promise.reject();
  }
};

export class RefreshTokenIntervals {
  public static accessTokenInterval: any = null;
}
export const refreshAccessToken = async (sessionData: ISession): Promise<ISession | void> => {
  try {
    const cognitoUser = (await Auth.currentAuthenticatedUser()) as CognitoUser;
    let session = await Auth.currentSession();
    if (!session) {
      sessionStorage.clear();
      localStorage.removeItem('UserLoggedIn');
      ErrorToaster('Max Retries Reached; regenerate OTP');
      window.location.href = '/login';
    }
    const newSessionData = JSON.parse(JSON.stringify(sessionData));
    const newSession = await refreshSession(cognitoUser, session.getRefreshToken());

    newSessionData.id_token = String(newSession?.getIdToken().getJwtToken() || '');
    newSessionData.access_token = String(newSession?.getAccessToken().getJwtToken() || '');
    newSessionData.refreshToken = String(newSession?.getRefreshToken().getToken() || '');
    newSessionData.access_token_expiration = newSession?.getAccessToken().getExpiration() * 1000 - new Date().getTime() - 60000;

    if (!(newSessionData.id_token && newSessionData.access_token && newSessionData.refreshToken)) {
      throw new Error(`RefreshAccessToken::: Missing token information`);
    }

    clearTimeout(RefreshTokenIntervals.accessTokenInterval);
    RefreshTokenIntervals.accessTokenInterval = null;

    return newSessionData;
  } catch (e) {
    console.error('error', e);
    const tempErrorData: ISession = {
      id_token: '',
      access_token: '',
      refreshToken: '',
      access_token_expiration: 0,
      user: '',
      errorMessage: e?.message,
    };
    if (e.code === 'NetworkError') {
      tempErrorData.errorMessage = e?.message || 'Network error';
      return tempErrorData;
    }
    tempErrorData.errorMessage = 'Unknown';
    return tempErrorData;
  }
};

async function refreshSession(user: CognitoUser, refreshToken: any): Promise<any> {
  return new Promise((resolve, reject) => {
    user.refreshSession(refreshToken, (err, session) => {
      if (err) {
        reject(err);
      } else {
        resolve(session);
      }
    });
  });
}
