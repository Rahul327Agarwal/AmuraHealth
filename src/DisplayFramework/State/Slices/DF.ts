import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPanelData } from './../../../DisplayFramework/Components/Panel/Panel.types';
import { useAppDispatch, useAppSelector } from '../store';
import { IPanelConfig, IPanelGrid, IPanelId } from './../../../DisplayFramework/Core/DFCore.types';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

//

const panelDataAtom = atom<IPanelGrid>({});
const panelVisibilitiesAtom = atom<Partial<Record<IPanelId, boolean>>>({});
const panelContainerRefs = {} as Record<'main', React.RefObject<HTMLDivElement>>;

const headerShownAtom = atom(true);
const isSamePanelEventShownAtom = atom(false);
//
// Hooks
//

export const usePanelsData = () => useAtomValue(panelDataAtom);
export const useSetPanelsData = () => useSetAtom(panelDataAtom);

export const usePanelVisibilities = () => useAtomValue(panelVisibilitiesAtom);
export const useSetPanelVisibilities = () => useSetAtom(panelVisibilitiesAtom);
export const useSetPanelVisibility = (panelId: IPanelId) => {
  const setPanelVisibilities = useSetPanelVisibilities();
  return (visible: boolean) => {
    setPanelVisibilities((prev) => ({ ...prev, [panelId]: visible }));
  };
};

export const getPanelContainerRefs = () => panelContainerRefs;
export const setPanelContainerRefs = (refs: typeof panelContainerRefs) => {
  Object.keys(refs).forEach((key) => {
    panelContainerRefs[key] = refs[key];
  });
};

//
//
/** WIP */
export const useHeaderShown = () => useAtom(headerShownAtom);
/** WIP */
export const useSamePanelEventShown = () => useAtom(isSamePanelEventShownAtom);
