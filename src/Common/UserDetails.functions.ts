import ErrorToaster from './ErrorToaster';

export const extractUserId = (session: any): string => {
  if (!session?.user?.id) {
    ErrorToaster('Session has expired!');
    invokeRelogin(session);
  }
  return session.user ? session.user.id : '';
};

export const invokeRelogin = (session?: any): void => {
  //clear any session parameters
  if (window.location.hostname !== 'localhost') {
    window.location.href = '/';
  } else {
    console.log('Session details are not available::', session);
  }
};

export const extactUserName = (session: any): string => {
  let userName = session.user;
  userName = `${userName?.first_name || ''} ${userName?.last_name || ''}`.trim();
  return userName;
};
