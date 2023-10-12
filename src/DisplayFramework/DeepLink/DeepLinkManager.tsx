import { PropsWithChildren, useEffect, useRef } from 'react';
import { Provider } from 'jotai';
import { DeepLinkState } from './DeepLinkManager.state';
import { DeepLinker } from './DeepLinker/DeepLinker';
import LoadingScreen from '../../Components/PanelComponents/ErrorBoundary/ErrorScreen/LoadingScreen';

export function DeepLinkManager(props: PropsWithChildren) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    console.log(`Sample DeepLink1`, DeepLinker.makeDeepLink(DeepLinker.sampleLink1));
    console.log(`Sample DeepLink2`, DeepLinker.makeDeepLink(DeepLinker.sampleLink2));
    console.log(`Sample DeepLink3`, DeepLinker.makeDeepLink(DeepLinker.sampleLink3));

    //Save the deeplink to localStorage
    DeepLinkState.saveDeepLink(window.location.search);
  }, [initialized.current]);

  return (
    <>
      <Provider store={DeepLinkState.deepLinkAtomStore}>
        <DeepLinkLoader />
      </Provider>
    </>
  );
}

function DeepLinkLoader() {
  const { isLoading } = DeepLinkState.useDeepLinkLoading();

  if (!isLoading) return <></>;

  return <LoadingScreen />;
}
