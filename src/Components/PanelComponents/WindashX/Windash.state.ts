import { atom, useAtomValue, useSetAtom } from 'jotai';
import { IMainCardType, IWindow } from './Windash.types';

//State for Home Windash Screens
const windashScreensAtom = atom<IWindow[]>([]);
const windashActiveScreensAtom = atom((get) => {
  const screens = get(windashScreensAtom);
  return screens.filter((screen) => screen.state !== undefined);
});
const windashMaximizedScreensAtom = atom((get) => {
  const screens = get(windashScreensAtom);
  return screens.filter((screen) => screen.state === 'maximized');
});
const mainCardType = atom<IMainCardType>('');

export const useSetMainCardType = () => useSetAtom(mainCardType);
export const useMainCardType = () => useAtomValue(mainCardType);
export const useSetWindashScreens = () => useSetAtom(windashScreensAtom);
export const useWindashScreens = () => useAtomValue(windashScreensAtom);
export const useActiveWindashScreens = () => useAtomValue(windashActiveScreensAtom);
export const useMaximizedWindashScreens = () => useAtomValue(windashMaximizedScreensAtom);
