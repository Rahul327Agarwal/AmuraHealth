import { makeStyles } from 'tss-react/mui';
import { IProps } from './ChatHeader.types';

export const useStyles = makeStyles<IProps>()((theme, props) => ({
  headerWrapper: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    background: 'white',
  },
  headerContainer: {
    padding: '16px 20px',
    paddingBottom: 0,
    minHeight: '64px',
    borderBottom: '1px solid #F1F1F1',
    boxShadow: props.isShadow ? '4px 0px 24px rgb(0, 0, 0, 0.15)' : '',
    display: 'flex',
    justifyContent: 'center',
    gap: '2px',
    flexDirection: 'column',
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  mainTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'rgb(92, 90, 97)',
  },
  subTitleWrapper: {
    display: 'flex',
  },
  subTitle: {
    // minHeight: '16px',
    color: theme.palette.colors.gray[500],
    // opacity: 0,
    // "&[data-visible='true']": {
    //   opacity: 1,
    // },
  },

  searchWrapper: {
    display: 'flex',
    gap: '10px',
    background: theme.palette.colors.system.white,
  },
  backButton: {
    padding: 0,
  },
  offlineIcon: {
    fill: theme.palette.colors.red[700],
  },

  disableIcon: {
    pointerEvents: 'none',
    '& svg': {
      '& path': {
        fill: '#A6A6A6 !important',
      },
    },
  },
  eachIocn: {
    width: '32px',
    height: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '72px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.colors.gray[100],
    },
  },

  IconsTab: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '40px',
    backgroundColor: theme.palette.colors.gray[25],
    padding: '4px 0px',
  },
  selectedTab: {
    backgroundColor: theme.palette.colors.gray[100],
  },
  surveyDetails: {
    height: '18px',
    marginLeft: 'auto',
  },
}));
