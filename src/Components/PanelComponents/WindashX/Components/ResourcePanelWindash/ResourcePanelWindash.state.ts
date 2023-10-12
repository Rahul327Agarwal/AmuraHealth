import { atom, useAtomValue, useSetAtom } from 'jotai';
import { IWindow } from '../../Windash.types';
//State for Resource Windash Screens

const resourseWindashAtom = atom<IWindow[]>([]);
const resourseWindashActiveScreensAtom = atom((get) => {
  const screens = get(resourseWindashAtom);
  return screens.filter((screen) => screen.state !== undefined);
});
const resourseWindashMaximizedScreensAtom = atom((get) => {
  const screens = get(resourseWindashAtom);
  return screens.filter((screen) => screen.state === 'maximized');
});
export const useSetResourseWindashScreens = () => useSetAtom(resourseWindashAtom);
export const useResourceWindashScreens = () => useAtomValue(resourseWindashAtom);
export const useResourseWindashActiveScreens = () => useAtomValue(resourseWindashActiveScreensAtom);
export const useMaximizedResourseWindashScreens = () => useAtomValue(resourseWindashMaximizedScreensAtom);
