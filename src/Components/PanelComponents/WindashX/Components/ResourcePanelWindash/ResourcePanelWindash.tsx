import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../DisplayFramework/State/store';
import {
  EventCardResourceConfig,
  NameCardResourceConfig,
  windashInitialScreenConfig,
  windashInitialScreenConfigBasicUser,
} from '../../Windash.config';
import WindashX from '../../WindashX';
import { atom, useAtom } from 'jotai';
import { useSetResourseWindashScreens } from './ResourcePanelWindash.state';
import { useMainCardType } from '../../Windash.state';
import { IMainCardType } from '../../Windash.types';
import EmptyPanelWrapper from '../../../../../DisplayFramework/Components/Panel/EmptyPanelWrapper/EmptyPanelWrapper';

const reourseInitialized = atom(false);

export default function ResourcePanelWindash(props: any) {
  const setWindashScreens = useSetResourseWindashScreens();
  const mainCardType = useMainCardType();
  const getConfigByMainCardType = (mainCardType: IMainCardType) => {
    switch (mainCardType) {
      case 'NameCard':
        return NameCardResourceConfig;
      default:
        return [];
    }
  };
  const windashConfig = getConfigByMainCardType(mainCardType);
  const [initialized, setInitialized] = useAtom(reourseInitialized);

  useEffect(() => {
    if (initialized) return;
    setWindashScreens(windashConfig);
    setInitialized(true);
  }, [initialized]);
  useEffect(() => {
    const windashConfig = getConfigByMainCardType(mainCardType);
    setWindashScreens(windashConfig);
  }, [mainCardType]);

  return <>{mainCardType ? <WindashX {...props} currentViewingState="R" /> : <EmptyPanelWrapper id={'R'} />}</>;
}
