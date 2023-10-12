import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState, useRef } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import CreateCustomTheme from '../Common/Theme';
import MinScreenErrorScreen from '../Components/PanelComponents/ErrorBoundary/ErrorScreen/MinScreenErrorScreen';
import NoInterNet from '../Components/PanelComponents/ErrorBoundary/NoInterNet/NoInterNet';
import { store } from '../DisplayFramework/State/store';
import { IProps } from './App.types';
import AppRoutes from './Routes';
import NewVersion from '../Components/PanelComponents/ErrorBoundary/NewVersion/NewVersion';
import * as serviceWorker from '../serviceRegistration';
import { registerEvent, unRegisterEvent } from '../AppSync/AppSync.functions';
import { ZenObservable } from 'zen-observable-ts';
import './../index.css';
import ErrorScreen from '../Components/PanelComponents/ErrorBoundary/ErrorScreen/ErrorScreen';
import ErrorBoundary from '../Components/PanelComponents/ErrorBoundary/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DeepLinkManager } from '../DisplayFramework/DeepLink/DeepLinkManager';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App(props: IProps) {
  const theme = CreateCustomTheme({});
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  const reloadPage = () => {
    console.log(waitingWorker, self);
    if (waitingWorker?.postMessage) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    } else {
      console.log('Post message is not present');
    }
    setShowReload(false);
    window.location.reload();
  };

  if (import.meta.env.VITE_ENV === 'amura') {
    console.log = () => {};
  }

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    console.log(registration);
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };
  let versionSubscription = useRef<Promise<ZenObservable.Subscription>>();
  useEffect(() => {
    sessionStorage.setItem('locale', 'en_US');
    serviceWorker.unregister();
    (async () => {
      versionSubscription.current = registerEvent('pms-web', 'update', () => {
        setShowReload(true);
      });
    })();
    return () => {
      if (versionSubscription?.current) {
        unRegisterEvent(versionSubscription.current);
      }
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Provider store={store}>
          <DeepLinkManager />
          <NewVersion
            onReload={() => {
              reloadPage();
            }}
            reloadRequired={showReload}
          />
          <MinScreenErrorScreen />
          <ErrorBoundary fallbackUI={<ErrorScreen />}>
            <AppRoutes />
          </ErrorBoundary>
          <ToastContainer enableMultiContainer containerId="main" position="top-right" />
          <NoInterNet />
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
