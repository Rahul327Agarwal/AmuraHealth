import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useOldProps } from '../../../Utilities/WrapperFunctions';
import { getFixedMaxWidgetWidth } from '../../DisplayFramework.functions';
import { usePanelContainerInfo, usePanelsContainerSizeInfo } from '../../DisplayFramework.hooks';
import { useUserSession } from '../../State/Slices/Auth';
import { useSetPanelVisibility } from '../../State/Slices/DF';
import EmptyPanelWrapper from './EmptyPanelWrapper/EmptyPanelWrapper';
import { CurrentPanelProvider, usePanelStyles, usePanelVisibility } from './Panel.hooks';
import { useStyles } from './Panel.styles';
import { IProps } from './Panel.types';

export default function Panel(props: IProps) {
  const { id, panelComponentData } = props;

  const { numOfPanelsCanFit } = usePanelContainerInfo();
  const { windowWidth } = usePanelsContainerSizeInfo();

  const { panelRef, isVisible } = usePanelVisibility(id);
  const setVisibility = useSetPanelVisibility(id);

  React.useEffect(() => {
    setVisibility(isVisible);
  }, [isVisible]);

  const sessions = useUserSession()!;
  const oldProps = useOldProps(sessions);
  const MemoCompo = React.useMemo(() => {
    const compos = [];
    if (panelComponentData?.length) {
      for (let i = 0; i < panelComponentData.length; i++) {
        compos.push(
          React.createElement(
            'div',
            {
              key: i,
              style: {
                display: panelComponentData.length - 1 === i ? 'block' : 'none',
                height: '100%',
              },
            },
            React.createElement(panelComponentData[i].component, {
              ...oldProps,
              ...panelComponentData[i].componentProps,
              panel: {
                width: getFixedMaxWidgetWidth(),
              },
            })
          )
        );
      }
      return compos;
    }

    return undefined;
  }, [panelComponentData?.length, sessions, oldProps]);

  //

  //

  const { classes } = useStyles({
    width: windowWidth < getFixedMaxWidgetWidth() - 68 ? '100%' : getFixedMaxWidgetWidth(),
    shouldRoundCorners: props.rowIndex !== 0 && numOfPanelsCanFit > 1,
  });

  const styles = usePanelStyles(props.panelConfig, props.initialPanelConfig);
  return (
    <div id={id} ref={panelRef} style={styles} className={classes.mainContainer}>
      <ToastContainer className={classes.toasterClass} enableMultiContainer containerId={id} position="top-right" />
      {!props.isActive && <EmptyPanelWrapper id={id} />}
      <CurrentPanelProvider value={props}>
        <AnimatePresence>{MemoCompo || null}</AnimatePresence>
      </CurrentPanelProvider>
    </div>
  );
}
