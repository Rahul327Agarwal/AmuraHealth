import { useEffect } from 'react';
import { registerEvent, unRegisterEvent } from '../../../AppSync/AppSync.functions';

export function useRefreshOnEvent<T = any>(patientId: string, event: string, callbackFn: (v: T) => void, deps: any[]) {
  useEffect(() => {
    const subscription = registerEvent(patientId, event, (d) => {
      callbackFn(d as T);
    });

    return () => {
      unRegisterEvent(subscription);
    };
  }, deps);
}
