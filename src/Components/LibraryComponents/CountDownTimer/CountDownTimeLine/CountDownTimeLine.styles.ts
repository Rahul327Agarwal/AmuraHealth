import { makeStyles } from 'tss-react/mui';
import { IProps } from './CountDownTimeLine.types';

export const useStyles = makeStyles<IProps>()((theme, { showTimer, noBGandPadding }) => ({
  timeLineBackGround: {
    position: 'relative',
    flex: 1,
    backgroundColor: showTimer ? theme.palette.colors.gray[500] : theme.palette.colors.system.divider,
    height: '2px',
  },
  timeAbsoulte: {
    // position: "absolute",
    // top: "6px",
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '36px',
    height: '26px',
    background: noBGandPadding ? 'none' : '#E9E8E8',
    padding: noBGandPadding ? 'none' : '8px 33px 8px 8px',
  },
  time: {
    // color: theme.palette.colors.system.link,
    color: '#5C5A61',
    display: 'block',
    // visibility: showTimer ? 'hidden' : 'initial',
  },
  timeDelete: {
    color: '#5C5A61',
  },
  timeLineGrid: {
    display: 'flex',
    flex: 1,
  },
  timeLine: {
    // backgroundColor: theme.palette.colors.system.link,
    backgroundColor: theme.palette.colors.system.white,
    // visibility: showTimer ? 'hidden' : 'initial',
  },
  timeLineDelete: {
    backgroundColor: ' #A6A6A6',
  },
}));
