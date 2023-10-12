import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()((theme) => ({
  stickySection: {
    position: 'sticky',
    zIndex: 100,
    top: '0',
    marginBottom: '1px',
  },
  badgePanel: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 52px',
    background: theme.palette.colors.gray[25],
    minHeight: '46px',
    "&[data-visible='true']": {
      display: 'none !important',
    },
  },
  countdetailsBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'end',
    alignItems: 'center',
  },
  roleName: {
    color: theme.palette.colors.gray[500],
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  badgeContainer: {
    display: 'flex',
    gap: '16px',
  },
  selectAllButton: {
    display: 'grid',
    gap: '28px',
    gridTemplateColumns: 'auto 75px',
    color: theme.palette.colors.gray[900],
    cursor: 'pointer',
    alignItems: 'center',
  },
  level0Accordion: {
    padding: '8px 20px',
    background: theme.palette.colors.gray[100],
    display: 'grid',
    gridTemplateColumns: 'calc(100% - 50px) 50px',
  },
  level0LeftBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  level0RightBox: {
    cursor: 'pointer',
    display: 'flex',
    placeItems: 'center',
    justifyContent: 'flex-end',
    '& svg': {
      transition: 'transform 0.2s linear',
    },
    "&[data-open='true'] svg": {
      transform: 'rotate(180deg)',
    },
  },
  roleNameLevel0: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tenantLevel0Box: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  tenantLevel0: {
    color: theme.palette.colors.gray[500],
  },
  selectAllText: {
    whiteSpace: 'nowrap',
  },
}));
