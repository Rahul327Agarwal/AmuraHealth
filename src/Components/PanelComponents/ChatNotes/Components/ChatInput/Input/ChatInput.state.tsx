import { PropsWithChildren, useEffect, useState } from 'react';
import { getChatInputBoxRef } from './ChatInput';
import { ChatInputKeyDownEvent } from './ChatInput.types';
import { PickerFile } from '../ChatAttachment/UploadFilesViewX/UploadFilesViewX.types';
import { Provider, atom, createStore } from 'jotai';

export const chatStore = createStore();

export namespace ChatInputState {
  export const inputValueAtom = atom('');

  export const attachmentsAtom = atom<PickerFile[]>([]);
  export const attachmentsTextAtom = atom<string[]>([]);
  export const currentSelectedAttachmentIndexAtom = atom(-1);

  export const inputSendButtonDisabledAtom = atom(false);

  export const suggestorOpenedAtom = atom(false);
  export const suggestorDisableStateAtom = atom(false);
  //
  //
  //

  export const dispatchKeyDownEvent = (e: React.KeyboardEvent<HTMLDivElement>) => {
    getChatInputBoxRef().current?.dispatchEvent(
      new CustomEvent('chat-input-keydown', {
        detail: e,
      })
    );
  };
  export const useListenToInputKeyDownEvent = (fn: (e: ChatInputKeyDownEvent['detail']) => void, deps: Array<any>) => {
    useEffect(() => {
      const listner = (e) => fn(e?.detail);
      getChatInputBoxRef()?.current?.addEventListener('chat-input-keydown', listner);
      return () => {
        getChatInputBoxRef()?.current?.removeEventListener('chat-input-keydown', listner);
      };
    }, deps);
  };
}

export function ChatInputStateProvider(props: PropsWithChildren) {
  return (
    <>
      <Provider store={chatStore}>{props.children}</Provider>
    </>
  );
}
