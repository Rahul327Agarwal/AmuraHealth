import { DrawerProps, Drawer as MuiDrawer, Portal, keyframes } from '@mui/material';
import { PropsWithChildren } from 'react';
import { useChatFlyoutProvider } from './ChatFlyout';
import styled from '@emotion/styled';
import { useSetChatOpenedFlyout } from './ChatFlyout.state';
import { useStyles } from './ChatFlyout.styles';
import { CrossIcon } from '../../../../../SVGs/Common';
import { motion } from 'framer-motion';
const flyoutIn = keyframes`
    0% {
        opacity:0;
        translate: 0 100px;
    }   
    100% {
        opacity:1;
        translate: 0 0;
    } 
`;

const Drawer = styled(MuiDrawer)((props: { bottom?: boolean }) => ({
  position: 'absolute',
  bottom: '40px',
  '& .MuiDrawer-paper': {
    position: 'absolute',
    bottom: props.bottom ? `var(--input-height)` : '',
    zIndex: 1000,
    borderRadius: '30px 30px 0 0',
    boxShadow: '0 0 30px 10px rgba(0, 0, 0, 0.14)',
    borderTop: '1px solid rgba(0,0,0,0.2)',
    padding: '20px',
    animation: `${flyoutIn} 0.15s ease-out`,
  },
  '& .MuiBackdrop-root': {
    position: 'absolute',
  },
}));

export function ChatFlyoutDrawer(
  props: DrawerProps & {
    absoluteBottom?: boolean;
    header?: string;
    headerRight?: React.ReactNode;
    removeCloseIcon?: boolean;
  }
) {
  const containerRef = useChatFlyoutProvider().containerRef;
  const setChatFlyout = useSetChatOpenedFlyout();
  const { classes } = useStyles();

  return (
    <>
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          bottom: props.absoluteBottom ? '0' : `var(--input-height)`,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: props.absoluteBottom ? 10000 : undefined,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            zIndex: 1000,
            backgroundColor: 'white',
            borderRadius: '30px 30px 0 0',
            borderTop: '1px solid rgba(0,0,0,0.2)',
            padding: '20px',
          }}
          initial={{ translateY: 100 }}
          animate={{ translateY: 0 }}
          exit={{ translateY: 100 }}
          transition={{
            duration: 0.15,
          }}
        >
          <div className={classes.header}>
            <span>{props.header}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {props.headerRight}
              <span
                hidden={!!props?.removeCloseIcon}
                className={classes.crossIcon}
                onClick={() => {
                  if (props.onClose) {
                    props.onClose({}, 'escapeKeyDown');
                    return;
                  }
                  setChatFlyout({});
                }}
              >
                <CrossIcon />
              </span>
            </div>
          </div>
          {props.children}
        </motion.div>
      </motion.div>
    </>
  );

  return (
    <>
      {/* <Portal > */}
      <Drawer
        anchor={'bottom'}
        open={true}
        onClose={
          props.onClose ??
          (() => {
            setChatFlyout({});
          })
        }
        disablePortal
        {...props}
        bottom={props.absoluteBottom ? false : true}
      >
        <div className={classes.header}>
          <span>{props.header}</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {props.headerRight}
            <span
              className={classes.crossIcon}
              onClick={() => {
                if (props.onClose) {
                  props.onClose({}, 'escapeKeyDown');
                  return;
                }
                setChatFlyout({});
              }}
            >
              <CrossIcon />
            </span>
          </div>
        </div>
        {props.children}
      </Drawer>
      {/* </Portal> */}
    </>
  );
}
