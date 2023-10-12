import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../DisplayFramework/State/store';
import { windashInitialScreenConfig, windashInitialScreenConfigBasicUser } from '../../Windash.config';
import { useSetWindashScreens } from '../../Windash.state';
import WindashX from '../../WindashX';
import { atom, useAtom } from 'jotai';

const windashIntilized = atom(false);

export default function WinDashWrapper(props: any) {
  const setWindashScreens = useSetWindashScreens();
  const loggedInUserInfo = useAppSelector((state) => state.displayFrameWork.loggedInUserInformation);

  const isStaffUser = loggedInUserInfo?.allRoles.length;

  const windashConfig = isStaffUser ? windashInitialScreenConfig : windashInitialScreenConfigBasicUser;
  const [initialized, setInitialized] = useAtom(windashIntilized);

  useEffect(() => {
    if (initialized) return;
    setWindashScreens(windashConfig);
    setInitialized(true);
  }, [initialized]);

  // return <Windash {...props} ComponentConfig={windashConfig} />;

  return <WindashX {...props} />;
}
