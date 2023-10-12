import { makeStyles } from 'tss-react/mui';
import { IProps } from './Button.types';

export const useStyles = makeStyles<IProps>()((theme, props) => {
  return {
    alignCenter: {
      textAlign: 'center',
    },
    button: {
      height: '50px',
      borderRadius: '6px !important',

      '&.MuiButton-root.MuiButton-contained.Mui-disabled': {
        backgroundColor: '#000000 !important',
        opacity: 0.3,
      },
    },
  };
});
