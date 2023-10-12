import { makeStyles } from 'tss-react/mui';
import { IProps } from './BlueDotPopUp.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.

interface IStyleProps extends IProps {
  isTimeSelected: boolean;
}
export const useStyles = makeStyles<IStyleProps>()((theme, props) => ({
  tagPersonsLlist: {
    maxHeight: '144px',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingLeft: '11px',
    '& .MuiFormControlLabel-label': {
      wordBreak: 'break-word',
    },
    '& .Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.38) !important',
    },
    '& .MuiFormControlLabel-label.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.38) !important',
    },
  },
  marginBottom: {
    marginBottom: '20px',
  },

  dateTimeGrid: {
    // display: 'grid',
    // gridTemplateColumns: '60% calc(40% - 16px)',
    display: 'flex',
    gap: '16px',
    alignItems: 'end',
  },
  alignEnd: {
    display: 'flex',
    gap: '16px',
    alignItems: 'baseline',
  },
  errorText: {
    color: '#f44336',
  },
  inputStyle: {
    color: theme.palette.colors.theme.primary,
    outline: 'none !important',
    border: 'none !important',
    borderRadius: '4px',
    boxSizing: 'border-box',
    width: 'calc(100% - 50px)',
    maxHeight: '76px',
    overflow: 'auto',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',

    resize: 'none',
    '& mark': {
      color: theme.palette.colors.blue[700],
      background: 'none',
    },
    '& font': {
      color: `${theme.palette.colors.theme.primary} !important`,
    },
  },
  firstContainer: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
  },
  lastContainer: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  sendButton: {
    height: '48px',
    width: '48px !important',
    minWidth: 'auto !important',
    padding: '0 !important',
  },
  messageInputContainer: {
    marginTop: 'auto',
    minHeight: '88px',
    padding: '20px 0px',
    background: theme.palette.colors.system.white,
    boxSizing: 'border-box',
    width: '100%',
    position: 'relative',
    zIndex: 101,
    display: 'grid',
    gridTemplateColumns: '24px calc(100% - 32px - 48px - 24px) 48px',
    gap: '16px',
    alignItems: 'center',
  },
  middleContainer: {
    boxShadow: '2px 2px 54px rgba(0, 0, 0, 0.05);',
    border: '1px solid ' + theme.palette.colors.gray[50],
    borderRadius: '4px',
  },
  textInMessage: {
    color: theme.palette.colors.gray[900],
  },
  padding: {
    padding: '14px 12px',
  },
  reAnswerQuestion: {
    marginBottom: '40px',
  },
  drawerFooter: {
    margin: '-20px',
    marginTop: '0',
  },
  prescriptionFooter: {
    gap: '10px',
    boxShadow: 'none !important',
    justifyContent: 'center !important',
    // backgroundColor: 'inherit',
    display: 'grid',
    gridTemplateColumns: '100px 100px',
    alignItems: 'stretch',
    padding: '20px 20px !important',
    margin: '12px -20px 12px -20px ',
  },
  btnHeight: {
    height: '44px',
  },
  mainHeading: {
    color: theme.palette.colors.gray[900],
    margin: '0px 40px 10px 40px',
    textAlign: 'center',
    wordBreak: 'break-all',
  },
  subHeading: {
    color: theme.palette.colors.gray[500],
    margin: '0px 40px',
    textAlign: 'center',
    wordWrap: 'break-word',
  },
  disabledSendIcon: {
    background: theme.palette.colors.gray[100],
    height: '48px',
    width: '48px !important',
    minWidth: 'auto !important',
    padding: '0 !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'not-allowed',
    borderRadius: '4px',
    ' &:hover': { background: `${theme.palette.colors.gray[100]} !important` },
    '& svg': {
      height: '24px',
      width: '24px',
      '& path': {
        fill: '#A6A6A6',
      },
    },
  },

  //check box style//
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    //minHeight: "60px",
    boxSizing: 'border-box',
    '&.clickable': {
      cursor: 'pointer',
    },
    '&.disabled': {
      opacity: '0.7',
      pointerEvents: 'none',
    },
    flexDirection: 'row-reverse',
    marginBottom: '7px',
  },
  titleStyle: {
    color: theme.palette.colors.gray[500],
    marginLeft: '8px',
  },
  iputTextContainer: {
    color: theme.palette.colors.gray[900],
    width: '100%',
    border: 'none',
    outline: 'none',
  },
  checkBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '28px',
  },
  primaryText: {
    color: '#5C5A61',
  },
  dateWrapper: {
    width: props?.blueDotEditInfo?.isEdit ? '50%' : '40%',
    '& .myDatePicker .MuiInputBase-input': {
      padding: '18px 0 6px!important',
    },
  },
  timeWrapper: {
    width: '50%',
    '& .MuiInput-underline': {
      '&:before': { borderBottom: props.isTimeSelected && `2px solid ${theme.palette.colors.system.black} !important` },
    },
  },
  textDisabled: {
    color: 'rgba(0, 0, 0, 0.38) !important',
  },
  disableSvg: {
    '& path': {
      fill: 'rgba(0, 0, 0, 0.38) !important',
    },
  },
}));
