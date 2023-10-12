import { makeStyles } from 'tss-react/mui';
import { IProps } from './PanelFooter.types';
import MUIButton from '../../../../../LibraryComponents/MUIButton/MUIButton';
import { PMS_LOCALE } from '../../../../../../Utils';
import { PlusIcon } from '../../../../PostManagement/PostManagement.svg';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  centerButtonStyle: {
    height: 'fit-content',
    margin: 'auto 4px',
    border: '1px solid #00FFCC',
    borderRadius: '4px',
    background: '#1C1C1C',
    textDecoration: 'none' as const,
    textTransform: 'none' as const,
    marginRight: '5px',
    color: '#00FFCC !important',
    '&:hover': {
      color: '#00FFCC',
      border: '0px',
      background: '#56575B',
    },
  },
  disabledCenterButton: {
    height: 'fit-content',
    margin: 'auto 4px',
    borderRadius: '4px',
    background: '#3F4044 !important',
    textDecoration: 'none' as const,
    textTransform: 'none' as const,
    marginRight: '5px',
  },
  panelFooterPlusIcon: {
    backgroundColor: "#00ffc2",
    position: "relative",
    padding: "14px 16px 14px 18px",
    width: "60px",
    height: "60px",
    borderRadius: "30px",
    border: "5px solid #3f4044",
    top: "-28px",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  panelFooter: {
    backgroundColor: "#141415",
    borderRadius: "0px 0px 8px 8px",
    marginBottom: "0px !important",
    bottom: "0",
    height: "56px",
    position: "absolute",
    width: "100%"
  }
}));

export default function Footer(props: IProps) {
  const {
    plusIcon,
    onPlusIconClick,
    searchIcon,
    onSearchIconClick,
    titleToBeDisplayed,
    centerButton,
    centerButtonLabel,
    onButtonClick,
    isButtonDisabled,
  } = props;
  const { classes } = useStyles();
  return (
    <div
      className={classes.panelFooter}
      style={{ display: 'grid', gridTemplateColumns: centerButton ? '1% 79% 20%' : '80% 20%', width: `${props.panelWidth}px` }}
    >
      <div
        className="panel-footer-searchIcon"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          onSearchIconClick();
        }}
      >
        <span></span>
        {/* <FontAwesomeIcon
          icon={searchIcon}
          size="1x"
          onClick={() => {
            onSearchIconClick();
          }}
        /> */}
      </div>
      {centerButton ? (
        <MUIButton
          variant="contained"
          className={isButtonDisabled ? classes.disabledCenterButton : classes.centerButtonStyle}
          disabled={isButtonDisabled}
          onClick={() => onButtonClick()}
        >
          {PMS_LOCALE.translate(centerButtonLabel)}
        </MUIButton>
      ) : null}
      <div
        className={classes.panelFooterPlusIcon}
        style={{
          cursor: 'pointer',
          backgroundColor: props.disablePlus ? '#b2b3b4' : '#00ffc2',
          color: props.disablePlus ? '#3F4044' : 'black',
        }}
        onClick={() => {
          if (!props.disablePlus) {
            onPlusIconClick();
          }
        }}
        title={titleToBeDisplayed}
      >
        {PlusIcon}
      </div>
    </div>
  );
}
