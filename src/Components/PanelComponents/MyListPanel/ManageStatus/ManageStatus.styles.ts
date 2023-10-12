import { styled } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<any>()((theme, { panel }) => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '100%',
    width: 'inherit',
    transform: 'translate(-355px, 0px)',
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  },
  swipeIn: {
    transform: 'translate(0px,0px)',
  },
  swipeOut: {
    transform: 'translate(-355px, 0px)',
  },
  borderBottom: {
    borderBottom: '1px solid #E1E1E1',
  },
  loader: {
    color: '#FFFFFF',
    width: '16px !important',
    height: '16px !important',
  },
  loaderSpan: {
    height: '18px',
    marginRight: '4px',
  },
  backArrow: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'inherit',
    marginRight: '15px',
  },
  footerStyle: { marginTop: 'auto' },
  statusWrap: {
    background: theme.palette.colors.system.white,
    width: `${panel?.width}px`,
    height: `100%`,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    paddingTop: '12px',
    position: 'relative',
  },
  updateContainer: {
    width: `${panel?.width}px`,
    background: theme.palette.colors.system.white,
    gap: '50px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 'auto 0',
    padding: '20px',
    '& .messageText': {
      textAlign: 'center',
      color: theme.palette.colors.gray[400],
    },
  },
  updateContainerWrap: {
    height: 'calc(100% - 141px)',
    display: 'flex',
  },
  backdrop: {
    opacity: 0,
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    background: theme.palette.colors.gray[900],
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -2,
  },
  backdropOpacityIn: {
    opacity: 0.8,
  },
  backdropOpacityOut: {
    opacity: 0,
  },
  body: {
    overflowY: 'auto',
    flex: 'auto',
    maxHeight: `calc(100% - 222px)`,
  },
  labelStyle: {
    color: theme.palette.colors.theme.primary,
    padding: '0 20px',
    margin: '24px 0 20px',
  },
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
}));

export const InputContainerStyled = styled('div')(() => ({
  padding: '0 20px',
}));
