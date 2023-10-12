import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { usePanelsContainerSizeInfo } from '../../../../../DisplayFramework/DisplayFramework.hooks';
import { CloseIconDark, MaximizeIcon, MinimizeIcon } from '../../Windash.svg';
import { useStyles } from './CommonHeader.styles';
import { IProps } from './CommonHeader.types';

export default function CommonHeader(props: IProps) {
  const { activeScreens, minimizeEvent, maximizeEvent, maximizeDefault, closeEvent, windowRef } = props;
  const { classes } = useStyles(props);
  const commonClass = useCommonStyles();
  const { numOfPanelsCanFit } = usePanelsContainerSizeInfo();

  const view = props.window.state;

  return (
    <>
      <div className={`${classes.myListHeader}`}>
        <span className={`${classes.headerText} ${commonClass.body15Medium}`}>
          {props.window.icon}
          <span className={classes.titleSpan} title={props.window.title}>
            {props.window.title}
          </span>
        </span>
        {numOfPanelsCanFit > 1 && (
          <div className={classes.headerText}>
            {/* Window Icons */}
            <span
              className={`${classes.headerIcon} ${view !== 'minimized' ? classes.active : classes.passive}`}
              onClick={() => {
                if (view === 'minimized') return;
                minimizeEvent();
              }}
            >
              <MinimizeIcon />
            </span>

            <span
              className={`${classes.headerIcon} ${view !== 'maximized' ? classes.active : classes.passive}`}
              onClick={() => {
                if (view === 'maximized') return;
                maximizeEvent();
              }}
            >
              <MaximizeIcon />
            </span>
            <span
              className={`${classes.headerIcon} ${activeScreens?.length > 1 ? classes.active : classes.passive}`}
              onClick={() => {
                closeEvent();
              }}
            >
              <CloseIconDark inheritFill />
            </span>
          </div>
        )}
        {numOfPanelsCanFit === 1 && props.window.isDynamic && (
          <>
            <div
              className={`${classes.headerIcon} ${classes.active}`}
              onClick={() => {
                maximizeDefault();
              }}
            >
              <CloseIconDark inheritFill />
            </div>
          </>
        )}
      </div>
    </>
  );
}
