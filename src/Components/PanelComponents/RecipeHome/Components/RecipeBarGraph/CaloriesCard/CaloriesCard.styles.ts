import { makeStyles } from 'tss-react/mui';
import { IProps } from './CaloriesCard.types';

const OVERLAP_CONTENT_HEIGHT = '55px';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { variant }) => ({
  cardContainer: {
    padding: '28px 20px',
    paddingBottom: variant === 'outerBottom' ? `calc(${OVERLAP_CONTENT_HEIGHT} + 58px)` : '28px',
    background: theme.palette.colors.gray[25],
    borderRadius: '4px',
  },
  headerTitleStyle: {
    color: theme.palette.colors.theme.primary,
    marginBottom: variant === 'outerTop' ? `calc(${OVERLAP_CONTENT_HEIGHT} + 16px)` : '16px',
  },
  caloriesHline: {
    marginBottom: '8px',
    borderBottom: `1px solid ${theme.palette.colors.gray[100]}`,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  VLine: {
    width: '1px',
    height: '12px',
    background: theme.palette.colors.gray[100],
  },
  aboutContent: {
    color: theme.palette.colors.gray[500],
  },
}));
