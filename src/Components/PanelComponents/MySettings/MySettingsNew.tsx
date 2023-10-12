import { AmuraLogo } from '../../SVGs/Common';
import { useStyles } from './MySettingsNew.styles';

export const MySettingsNew = () => {
  const { classes } = useStyles();

  return (
    <div
      className={classes.tempCompWrapper}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'spaceBetween',
        gap: '1rem',
        padding: '0 20px',
      }}
    >
      <AmuraLogo />
      <div className={classes.tempCompBtnContainer}></div>
    </div>
  );
};
