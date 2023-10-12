import { atom, useAtomValue, useSetAtom } from 'jotai';

interface IProps {
  showGotoBottom?: boolean;
  unseenMsgCount?: number;
}

const notesAtom = atom<IProps>({});

export const useNotesState = () => useAtomValue(notesAtom);
export const useSetNotesState = () => useSetAtom(notesAtom);
