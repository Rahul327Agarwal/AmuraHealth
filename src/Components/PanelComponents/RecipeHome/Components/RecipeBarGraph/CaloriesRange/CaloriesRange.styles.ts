import { makeStyles } from 'tss-react/mui';
import { ICaloriesRangeProps } from './CaloriesRange.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<ICaloriesRangeProps>()((theme, { width, calories, totalKcal, variant }) => ({
  rangeContainer: {
    width: width || '100%',
    background: theme.palette.colors.gray[50],
    borderRadius: '20px',
    height: '18px',
    boxSizing: 'border-box',
    position: 'relative',
    // overflow: "hidden",
    display: 'flex',
  },
  kaclStyle: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '4px',
    height: 'inherit',
    position: 'relative',
    '&:first-child': {
      borderRadius: Number(calories[0]?.kcal) === 0 || Number(calories[1]?.kcal) === 0 ? '20px 20px 20px 20px' : '20px 0 0 20px',
    },
    // { borderRadius: '20px 0 0 20px' },
    '&:last-child': {
      borderRadius: Number(calories[0]?.kcal) === 0 || Number(calories[1]?.kcal) === 0 ? '20px 20px 20px 20px' : '0 20px 20px 0',
    },
    '&.GREY500': {
      background: theme.palette.colors.gray[500],
      color: theme.palette.colors.system.white,
      width: `${(Number(calories[0]?.kcal) / totalKcal) * 100}%`,
    },
    '&.GREY400': {
      background: theme.palette.colors.gray[400],
      color: theme.palette.colors.system.white,
      width: `${(Number(calories[1]?.kcal) / totalKcal) * 100}%`,
    },
    '&.GREY50': {
      background: theme.palette.colors.gray[50],
      color: theme.palette.colors.gray[500],
      width: `${(Number(calories[2]?.kcal) / totalKcal) * 100}%`,
    },
  },
  aboutCaloriesBox: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    position: 'absolute',
    top: variant === 'outerBottom' ? '100%' : 'unset',
    bottom: variant === 'outerTop' ? '100%' : 'unset',
    right: '0',
  },
  VLine: {
    width: '1px',
    margin: '4px 0',
    '&.GREY500': {
      background: theme.palette.colors.gray[500],
      height: '12px',
    },
    '&.GREY400': {
      background: theme.palette.colors.gray[400],
      height: (Number(calories[1]?.kcal) / totalKcal) * 100 <= 30 ? '45px' : '12px',
    },
    '&.GREY50': {
      background: theme.palette.colors.gray[50],
      height:
        (Number(calories[2]?.kcal) / totalKcal) * 100 <= 30
          ? (Number(calories[1]?.kcal) / totalKcal) * 100 <= 30 && (Number(calories[2]?.kcal) / totalKcal) * 100 <= 30
            ? '76px'
            : '45px'
          : '12px',
    },
  },
  aboutContent: {
    color: theme.palette.colors.gray[500],
    textAlign: 'end',
    width: 'max-content',
  },
}));
