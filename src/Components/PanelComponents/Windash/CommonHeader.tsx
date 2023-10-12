import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { getComponentName, getIcons } from './Windash.function';
import { useStyles } from './Windash.styles';
import { CommonHeaderProps } from './Windash.types';

export default function CommonHeader(props: CommonHeaderProps) {
  const { onClick, current_screen, setScreen, view, screen } = props;
  const { classes } = useStyles(props);
  const commonClass = useCommonStyles();

  return (
    <>
      <div className={`${classes.myListHeader}`}>
        <span className={`${classes.headerText} ${commonClass.body15Medium}`}>
          {getIcons[current_screen]} {getComponentName[current_screen]}{' '}
        </span>
        <div className={classes.headerText}>
          {/* Window Icons */}
          {/* <span
            className={`${classes.headerIcon} ${view !== 'MinimizeView' ? classes.active : ''}`}
            onClick={() => {
              onClick('MinimizeView', current_screen);
            }}
          >
            <MinimizeIcon />
          </span>
         
          <span
            className={`${classes.headerIcon} ${view !== 'MaximizeView' ? classes.active : ''}`}
            onClick={() => {
              if (view === 'MaximizeView') return;
              onClick('MaximizeView', current_screen);
            }}
          >
            <MaximizeIcon />
          </span>
          <span
            className={screen.length === 1 ? classes.DisableIcon : classes.headerIcon}
            onClick={screen.length === 1 ? () => {} : () => onClick('Close', current_screen)}
          >
            <CloseIconDark />
          </span> */}
        </div>
      </div>
    </>
  );
}
