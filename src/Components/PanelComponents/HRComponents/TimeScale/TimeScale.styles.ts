import { IProps } from './TimeScale.types';
import { differenceFrom12AM, differenceInMilliseconds } from './TimeScalse.functions';
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  flex: {
    display: 'flex',
  },
  hour: {
    // fontFamily: 'Inter',
    fontStyle: 'normal',
    fontHeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
    color: '#FFFFFF',
  },
  equalSpace: {
    width: 'calc(100% / 25)',
  },
  hourHeight: {
    height: '15px',
    width: '1px',
    backgroundColor: '#FFFFFF',
  },
  normalHourHeight: {
    height: '10px',
    width: '1px',
    backgroundColor: '#636363',
  },
  justifyCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  height18px: {
    height: '18px',
  },
  highlightTime: {
    backgroundColor: '#00FFCC',
    height: '5px',
  },
  hightlightPosition: {
    left: `calc((((100% - (100% / 25)) / (24 * 60 * 60 * 1000)) * ${differenceFrom12AM(
      new Date(props.startTime)
    )}) + (100% / 50))`,
    width: `calc(((100% - (100% / 25)) / (24 * 60 * 60 * 1000)) * ${differenceInMilliseconds(
      new Date(props.startTime),
      new Date(props.endTime)
    )} )`,
    bottom: '0px',
    position: 'absolute',
  },
  body: {
    position: 'relative',
  },
}));
