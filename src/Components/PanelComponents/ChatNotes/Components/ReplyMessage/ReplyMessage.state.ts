import { atom, useAtomValue, useSetAtom } from 'jotai';
import { globalRepliedToMessage } from '../ChatInput/MessageInput/MessageInput.types';

interface IProps {
  message: any;
  open: boolean;
}

const flyoutAtom = atom<IProps>({ message: {}, open: false });

export const useRepliedToMessage = () => useAtomValue(flyoutAtom);
export const useSetRepliedToMessage = () => {
  const setFun = useSetAtom(flyoutAtom);
  return (value: IProps) => {
    globalRepliedToMessage.message = value.message;
    setFun(value);
  };
};
