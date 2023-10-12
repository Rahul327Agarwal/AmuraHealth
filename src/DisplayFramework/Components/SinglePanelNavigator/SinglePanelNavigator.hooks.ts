import React, { useEffect } from 'react';
import { useHeaderShown, useSetPanelVisibilities } from '../../State/Slices/DF';
import { useDFEvent } from '../../Events/DFEvents';
import { usePanelNavigation } from '../../DisplayFramework.hooks';
import { MenuItem } from './SinglePanelNavigator.types';
import { useAppDispatch } from '../../State/store';
import { resetSelectedClientObject } from '../../State/Slices/DashboardSlice';
import { useSetSelectedClient } from '../../State/Slices/DisplayFramework';

export const useSinglePanelNavigator = () => {
  const sendEvent = useDFEvent();
  const dispatch = useAppDispatch();
  const panelNavigation = usePanelNavigation();
  const setPanelVisibility = useSetPanelVisibilities();
  const setSelectedClient = useSetSelectedClient();

  function selectPrimaryMenu(item: MenuItem) {
    if (item.id === 'H') {
      sendEvent('HomeList', {}, true);
      dispatch(resetSelectedClientObject());
      setSelectedClient(null);
      setPanelVisibility({});
      return;
    }

    if (item.type === 'navigation') {
      panelNavigation?.navigateToPanel(item.id);
    } else {
      sendEvent(item.event);
    }
  }

  return {
    selectPrimaryMenu,
  };
};

export const useHeaderAutoHide = (activated?: boolean) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const [isHeaderShown, setIsHeaderShown] = useHeaderShown();

  const prevScrollY = React.useRef(0);
  const downThreshold = 5;
  const upThreshold = 5;

  const onScrollCapture = (e: UIEvent) => {
    if (!activated) return;

    const srcEl = e.target as HTMLDivElement;
    const scrTop = srcEl.scrollTop;

    const isAutoSizerEl = srcEl.classList.contains('expand-trigger') || srcEl.classList.contains('contract-trigger');
    if (isAutoSizerEl) return;

    const isHorizontalScroll = scrTop === prevScrollY.current;
    const reverseScrollable = srcEl.hasAttribute('data-reverse-scroll');

    const isPanelContainer = srcEl.id === 'displayFrameworkPanelsContainer';

    if (isHorizontalScroll || isPanelContainer) {
      setIsHeaderShown(true);
      prevScrollY.current = 0;
      return;
    }

    let isHeaderHidable = srcEl.hasAttribute('data-header-hidable');
    if (!isHeaderHidable) {
      // check if parent has attribute (because AutoSizer List cannot have attributes on itself)
      const parentEl = srcEl.parentElement;
      if (parentEl) {
        isHeaderHidable = parentEl.hasAttribute('data-header-hidable');
      }
    }
    if (!isHeaderHidable) return;

    const isInView = srcEl.getBoundingClientRect().left < window.innerWidth;
    if (!isInView) {
      return;
    }

    //
    const curScrollY = srcEl.scrollTop;

    if (curScrollY < 10 && !reverseScrollable && prevScrollY.current > 10) {
      setIsHeaderShown(true);
      prevScrollY.current = 0;
      return;
    }

    if (!reverseScrollable) {
      // normal scroll

      if (curScrollY < 10) {
        setIsHeaderShown(true);
        return;
      }

      if (curScrollY > prevScrollY.current + downThreshold) {
        const scrollBottom = srcEl.scrollHeight - srcEl.clientHeight - curScrollY;
        if (scrollBottom < 200) return;

        setIsHeaderShown(false);
      } else if (curScrollY < prevScrollY.current - upThreshold) {
        //

        setIsHeaderShown(true);
      }
    } else {
      // reverse scroll
      // if (curScrollY > prevScrollY.current + upThreshold) {
      //   setIsHeaderShown(true);
      // } else if (curScrollY < prevScrollY.current - downThreshold) {
      //   setIsHeaderShown(false);
      // }
    }

    prevScrollY.current = curScrollY;
  };

  useEffect(() => {
    if (!parentRef.current) return;
    const parentEl = parentRef.current;
    if (activated) {
      parentEl.addEventListener('scroll', onScrollCapture, { capture: true });
    } else {
      setIsHeaderShown(true);
    }

    return () => {
      parentEl.removeEventListener('scroll', onScrollCapture, { capture: true });
    };
  }, [activated, parentRef.current]);

  return {
    parentRef,
    isHeaderShown,
  };
};
