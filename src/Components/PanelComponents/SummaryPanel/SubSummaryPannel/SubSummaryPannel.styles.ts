import { makeStyles } from 'tss-react/mui';

import { IProps } from './SubSummaryPannel.types';

export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 'inherit',
    padding: '20px',
    borderBottom: `0.5px solid ${theme.palette.colors.gray[200]}`,
    borderTop: `0.5px solid ${theme.palette.colors.gray[200]}`,
    cursor: 'pointer',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  optionscontainer: {
    display: 'grid',
    backgroundColor: theme.palette.colors.system.white,
    gridTemplateColumns: 'calc(50% - 6px) calc(50% - 6px)',
    gap: '16px',
  },
  optionscontainer2: {
    display: 'grid',
    backgroundColor: theme.palette.colors.system.white,
    gap: '16px',
    width: '100%',
  },
  showOtionStyle: {
    color: theme.palette.colors.gray[900],
    alignSelf: 'flex-end',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  subContainer: {
    display: 'flex',
    color: theme.palette.colors.gray[400],
    marginBottom: '4px',
    alignItems: 'center',
  },
  titleStyle: {
    color: theme.palette.colors.gray[400],
    marginLeft: '5px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    alignItems: 'center',
  },
  valueStyle: {
    color: theme.palette.colors.gray[900],
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  valueStyleNoOverflow: {
    color: theme.palette.colors.gray[900],
  },
  horizonatalLineStyle: {
    height: '1px',
    width: '100%',
    background: `${theme.palette.colors.gray[200]}`,
  },
}));
//background: theme.palette.colors.theme.primaryLight,
