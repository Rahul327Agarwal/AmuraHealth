import { subMinutes } from 'date-fns';
import { atom, createStore, useAtomValue } from 'jotai';

export namespace DeepLinkState {
  export const deepLinkAtomStore = createStore();

  export const loadingAtom = atom(false);
  export const loadingTextAtom = atom<string | null>(null as string);

  export const useDeepLinkLoading = () => {
    const isLoading = useAtomValue(loadingAtom);
    const loadingText = useAtomValue(loadingTextAtom);
    return {
      isLoading,
      loadingText,
    };
  };

  export function setLoading(value: boolean) {
    deepLinkAtomStore.set(loadingAtom, value);
  }
  export function setLoadingText(text?: string) {
    deepLinkAtomStore.set(loadingTextAtom, text);
  }

  // Deeplink Localstorage
  const DEEPLINK_STORAGE_KEY = 'deeplink';

  /**
   *
   * @param link is url param string (eg. ?deeplink=***)
   */
  export function saveDeepLink(link?: string) {
    if (!link) return;
    const data = JSON.stringify({
      link: link,
      timestamp: new Date().getTime(),
    });
    localStorage.setItem(DEEPLINK_STORAGE_KEY, data);
  }

  /**
   * once deeplink is read, it will be removed from local storage
   * also checks for if the link is older than 5 minutes or not, if it is, its not valid anymore
   *
   * @returns link only if it is valid otherwise `undefined` is returned
   */
  export function getSavedDeepLink(): string | undefined {
    const data = localStorage.getItem(DEEPLINK_STORAGE_KEY);
    if (!data) return;
    localStorage.removeItem(DEEPLINK_STORAGE_KEY);
    try {
      const { link, timestamp } = JSON.parse(data);
      const date5minBefore = subMinutes(new Date(), 10);
      if (timestamp < date5minBefore) return;
      return link;
    } catch {
      return;
    }
  }
}
