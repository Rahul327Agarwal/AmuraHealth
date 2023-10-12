import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  AddShiftSegments: {
    border: '1px solid #636363',
    boxSizing: 'border-box',
    margin: '6px 0px',
    borderRadius: '4px',
  },
  AddShiftSegmentsNew: {
    borderBottom: '1px solid #E1E1E1',
    padding: '0px 16px 25px 16px',
    margin: '0 -1rem 23px -1rem',
  },
  width50: {
    width: '50%',
  },
  wrapper: {
    height: 'inherit',
    overflow: 'hidden',
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  deleteWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
  headerStyle: {
    // height: "60px",
    boxSizing: 'border-box',
    padding: '20px !important',
  },
  footerStyle: {
    // margin: 'auto -20px -20px',
  },

  mb24: {
    marginBottom: '24px',
  },
  mb30: {
    marginBottom: '30px',
  },
  divider: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  container: {
    padding: '0px 20px',
    flex: '1',
    overflowY: 'auto',
  },
  nverEndsWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '10px',
  },
  nverEnds: {},
  days: {
    height: '36px',
    width: '36px',
    borderRadius: '50%',
    border: '1px solid #E1E1E1',
    color: '#5C5A61',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  daysSelected: {
    height: '36px',
    width: '36px',
    borderRadius: '50%',
    border: '1px solid #252427',
    color: '#5C5A61',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  AddshiftHeaderSpan: {
    //fontfamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#FFFFFF',
    flex: 'auto',
  },
  AddshiftSegmentHeader: {
    display: 'grid',
    gridGap: '7px',
    gridTemplateColumns: 'auto 24px 24px',
    padding: '8px',
  },
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    marginBottom: '10px',
  },
  RefreshIconColor: {
    fill: '#FFFFFF',
    cursor: 'pointer',
  },
  ShiftTimeHeader: {
    margin: '5px 0px',
    display: 'flex',
  },
  ShiftTimeHeaderSpan: {
    margin: '4px 0px',
    //fontfamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#FFFFFF',
  },
  StartDropDown: {
    padding: '8px',
    flexBasis: '50%',
  },
  SelectStartAt: {
    background: '#1B1B1B',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.16), 0px 1px 2px rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',
    padding: '8px 12px',
    display: 'flex',
    color: '#AEAEAE',

    alignItems: 'center',
  },
  text: {
    //fontfamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    margin: '0px 8px',
    flex: 'auto',
  },
  heightInherit: {
    height: '100%',
    overflow: 'hidden',
    background: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
  },
  padding6RL: {
    padding: '0px 6px',
    flex: '1',
    overflowY: 'auto',
  },
  padding8: {
    padding: '8px',
  },
  displayFlexAndCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '35px',
  },
  label: {
    //fontfamily: 'Inter',
    fontStyle: 'normal',
    fontHeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#FFFFFF',
    marginBottom: '4px',
  },
  labelNew: {
    color: '#252427',
    marginBottom: '4px',
  },
  dateRange: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridGap: '2%',
    margin: '5px 0px',
  },
  selectTime: {
    padding: '8px',
  },
  selectTimeLabel: {
    marginBottom: '5px',
  },
  margin20px: {
    margin: '20px 0px',
  },
  TimeSelector: {
    margin: '5px 0px',
    display: 'flex',
    // gridTemplateColumns: 'auto auto',
    gap: '24px',
    '& .MuiInput-underline::before': {
      borderBottom: '1px solid #0000006b !important',
    },
    '& .MuiInputBase-root .MuiInput-underline::before': {
      borderBottom: '1px solid #0000006b !important',
    },
  },
  selectDays: {
    margin: '8px 0px',
    padding: '4px',
  },
  DaysLabel: {
    display: 'flex',
    justifyContent: 'center',
  },
  Day: {
    background: '#4B4E50',
    borderRadius: '4px',
    margin: '0px 9px',
  },
  DayInside: {
    borderRadius: '4px',
  },
  shiftSegmentEnd: {
    margin: '8px 0px',
  },
  weekdaySpan: {
    width: '32px',
  },
  flexJustifyCenter: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  dayDivWidth: {
    width: '32px',
    height: '32px',
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '4px',
    background: theme.palette.colors.system.white,
    color: '#FFFFFF',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
  },
  dayDivSelected: {
    background: theme.palette.primary.main,
    color: '#000000',
  },
  dayDivSpan: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
  marginR14: { marginRight: '14px' },
  footerButton: { flex: 1, padding: '4px 8px' },
  footer: {
    display: 'flex',
    alignItems: 'center',
    height: 'inherit',
  },
  errorText: {
    color: '#f44336',
    //fontfamily: 'Inter',
    fontStyle: 'normal',
    fontHeight: 'normal',
    fontSize: '12px',
    lineHeight: '18px',
  },
  displayFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    color: '#252427',
    cursor: 'pointer',
  },
  shiftHeader: {
    display: 'flex',
    alignItems: 'center',
    // padding: '0px 8px',
  },
  flexauto: {
    flex: 'auto',
  },
  addPeople: {
    color: '#252427',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  pointerStyle: {
    cursor: 'pointer',
  },
  allowLabel: {
    color: theme.palette.colors.gray[500],
  },
  checkBoxContainer: {
    display: 'flex',
    height: '20px',
    gap: '8px',
  },
  checkboxCon: {
    display: 'flex',
    marginTop: '12px',
    gap: '24px',
  },
  activeStateToggleBtn: {
    background: theme.palette.colors.gray[50],
    padding: '16px 0 !important',
    width: '100%',
  },
  isInactive: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
}));
