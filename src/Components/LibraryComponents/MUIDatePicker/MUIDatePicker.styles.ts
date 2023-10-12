import { createTheme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { IProps } from './MUIDatePicker.types';
// @ts-nocheck

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  rootStyle: {
    position: 'relative',
    border: 0,

    '& label': {
      color: `${theme.palette.colors.gray[500]} !important`,
    },
    '& .myDatePicker .Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
      borderBottom: `2px solid #292F3F !important`,
    },
    // all nested elements
    '& *': {
      fontFamily: 'Graphik !important',
    },
  },
  wrapper:{
    width:'319px',
    height:'405px',
    "& > div":{
      marginBottom:'0px !important'
    }
  },
  borderBottom: { border: 0 },
  hidden: { display: 'none' },
  myDatePicker: {
    display: 'none',
  },

  inputStyle: {
    width: '100%',
    // "& *": { border: 0 },
    '& > div::after': {
      borderBottom: `2px solid ${theme.palette.colors.gray[500]} !important`,
    },
  },
  calendarIcon: {
    // position: 'absolute',
    // right: '2px',
    // top: '35px',
    // transform: 'translateY(-50%)',
    cursor: 'pointer',
    // scale: '1.8',
  },
  staticCalendar: {
    '& .MuiPickersCalendarHeader-root': {
      visibility: 'hidden',
    },
    '& .MuiPickersDay-root': {
      color: '#5C5A61',
      borderRadius: '4px',
      background: '#F8F8F8',
      cursor: 'pointer',
    },
    '& .MuiPickersDay-today': {
      // backgroundColor: '#5C5A61 !important',
      // color: '#FFF',
      borderColor: '#E1E1E1',
    },
    '& .Mui-selected': {
      backgroundColor: '#5C5A61 !important',
      color: '#FFF',
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: 'rgb(92 90 97 / 74%)',
      },
    },
    '& .Mui-disabled': {
      color: '#A6A6A6',
    },
  },
  inputWraper: {
    position: 'relative',
    '& .MuiFormLabel-root ': {
      left: '-13px !important',
    },
    '& .MuiInputLabel-shrink': {
      top: '5px',
    },
    '& .calendarIcon': {
      position: 'absolute',
      right: '2px',
      top: '35px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
    },
    '& .highlightBorder': {
      borderBottom: '2px solid #292F3F!important',
    },
    '& input': {
      textOverflow: 'ellipsis',
      height: '28px',
    },
    '& .MuiInputBase-input': {
      padding: '18px 0 8px !important',
      height: 'auto',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderRadius: '0px',
      borderBottom: props?.date ? 'none' : '1px solid #0000003b',
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiInputBase-root': {
      paddingRight: '0 !important',
    },
  },
  drawerFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '32px',
  },
  calenderWraper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0px 10px',
    gap: '8px',
    // background: theme.palette.colors.gray[25],
    borderRadius: '8px',
    marginBottom: '30px',
    position: 'relative',

    // '& .MuiDayPicker-slideTransition': {
    //   minHeight: '192px !important',
    // },

    '& .MuiDayPicker-weekDayLabel': {
      color: '#A6A6A6',
    },

    '& .MuiCalendarPicker-root	': {
      '& .MuiPickersCalendarHeader-root ': {
        visibility: 'visible',
        position: 'relative',
      },
      '& .MuiPickersCalendarHeader-labelContainer': {
        display: 'none',
      },
      '& .MuiPickersArrowSwitcher-root': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '274px',
        marginTop: '-12px',
      },
      '& .MuiIconButton-root': {
        backgroundColor: `${theme.palette.colors.system.white}`,
        border: `1px solid ${theme.palette.colors.gray[50]}`,
        borderRadius: '4px',
        width: '44px',
        height: '44px',
      },
      '& .MuiButtonBase-root': {
        backgroundColor: 'transparent',
      },
      '&  .MuiButtonBase-root:not(.Mui-selected):hover': {
        backgroundColor: '#F1F1F1 !important',
      },
      '& .MuiButtonBase-root.Mui-disabled': {
        color: '#E1E1E1 !important',
      },
      '& .MuiPickersDay-today:not(.Mui-selected)': {
        border: 'none',
      },
      '& .MuiPickersDay-today.Mui-selected::after': {
        position: 'absolute',
        content: "''",
        bottom: '-1%',
        right: '12px',
        height: '6px',
        width: '6px',
        boxSizing: 'border-box',
        background: 'white !important',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      },
      '& .MuiPickersDay-today:not(.Mui-selected)::after': {
        position: 'absolute',
        content: "''",
        bottom: '-1%',
        right: '12px',
        height: '6px',
        width: '6px',
        boxSizing: 'border-box',
        background: '#252427',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
  defaultIconButton: { '&.Mui-disabled': { opacity: '.5' } },
  headerWrap: {
    translate: '0px !important',
  },
  positionUnset: {
    position: 'unset !important' as any,
  },
  calenderHeader: {
    gap: '16px',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '24px',
    // marginBottom: "24px",

    '& .iconButton': {
      outline: 'none !important',
      backgroundColor: `#fff`,
      // backgroundColor: `${theme.palette.colors.system.white}`,
      // border: `1px solid ${theme.palette.colors.gray[50]}`,
      borderRadius: '4px',
      width: '44px',
      height: '44px',
      // "& path":{
      //   fill:"#5C5A61"
      // }
      '&.Mui-disabled': {
        '& path': {
          fill: '#252427',
          opacity: '0.3',
        },
      },
    },

    '& .filterContainer': {
      zIndex: 99,
      width: '158px',
      gap: '8px',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      '& .filterButton': {
        outline: 'none !important',
        backgroundColor: `${theme.palette.colors.system.white} !important`,
        border: `1px solid ${theme.palette.colors.gray[50]}`,
        borderRadius: '4px',
        height: '44px',
        fontSize: '15px',
        color: theme.palette.colors.gray[900],
        padding: '5px',
        minWidth: 'calc(150px / 2)',
        maxWidth: '100%',
        "&[data-type='fullWidth']": {
          minWidth: '158px',
          '& svg': { transform: 'rotate(180deg)' },
        },
        "&[data-type='hidden']": { display: 'none' },
        '& svg': {
          marginLeft: '8px',
          transition: '.3s ease',
          transform: 'rotate(0deg)',
        },
      },
    },
  },
  calendarMonthHeader: {
    gap: '16px',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    // marginBottom: "24px",
    '& .iconButton': {
      backgroundColor: `${theme.palette.colors.system.white}`,
      border: `1px solid ${theme.palette.colors.gray[50]}`,
      borderRadius: '4px',
      width: '44px',
      height: '44px',
    },
    '& .disableClass': {
      // backgroundColor: `rgba(0, 0, 0, 0.03) !important`,
      // backgroundColor: ({ changeBgColor }: any) => changeBgColor?   'rgba(0, 0, 0, 0.03) !important': "#FFF",

      border: `1px solid ${theme.palette.colors.gray[50]}`,
      borderRadius: '4px',
      width: '44px',
      height: '44px',
      '& path': {
        fill: '#252427',
        opacity: '0.3',
      },
    },
    '& .filterContainer': {
      width: '158px',
      gap: '8px',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      '& .filterButton': {
        backgroundColor: `${theme.palette.colors.system.white} !important`,
        border: `1px solid ${theme.palette.colors.gray[50]}`,
        borderRadius: '4px',
        height: '44px',
        fontSize: '15px',
        color: theme.palette.colors.gray[900],
        padding: '5px',
        minWidth: 'calc(150px / 2)',
        maxWidth: '100%',
        "&[data-type='fullWidth']": {
          minWidth: '158px',
          '& svg': { transform: 'rotate(180deg)' },
        },
        // "&[data-type='hidden']": { display: "none" },
        '& svg': {
          marginLeft: '8px',
          transition: '.3s ease',
          transform: 'rotate(0deg)',
        },
      },
      '& .active': {
        '& svg': {
          transform: 'rotate(180deg) !important',
        },
      },
    },
  },
  calenderBody: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,auto)',
    gap: '12px',
    marginTop: '24px',
    width: '278px',
    '& .filterOption': {
      backgroundColor: `${theme.palette.colors.system.white} !important`,
      border: `1px solid ${theme.palette.colors.gray[50]}`,
      borderRadius: '4px',
      height: '44px',
      fontSize: '15px',
      // color: theme.palette.colors.gray[400],
      color: '#5C5A61',
      boxSizing: 'border-box',
      '&.selected': {
        // color: theme.palette.colors.gray[900],
        color: '#252427',
        border: '1px solid #E1E1E1',
      },
    },
  },
  deselectedBtn: {
    color: `#595a5a !important`,
  },
  modelBoxStyles: {
    background: 'rgb(0 0 0 / 18%)',
  },
}));

export const materialTheme = createTheme({
  components: {
    MuiPickersCalendarHeader: {
      styleOverrides: {
        color: 'red',
      },
    },
  },
  overrides: {
    MuiCalendarPicker: {
      position: 'relative',
      padding: '0 20px',
      // root:{
      //   color:"black",
      //   staticCalendar:{
      //     position:'relative',
      //   padding:'0 20px',
      //   }
      // }
    },
    MuiPickersCalendarHeader: {
      root: {
        // display:'flex',
        // justifyContent:'space-between',
        // position:'absolute',
        // top:'12px',
        // width:'87px',
        position: 'relative',
        padding: '0 20px',
      },
      switchHeader: {
        color: '#252427',
        gap: '16px',
        alignItems: 'stretch',
        marginBottom: '24px',
        width: '278px',

        // display: "none",
      },
      iconButton: {
        backgroundColor: `#FFF`,
        // border: '1px solid #F1F1F1',
        outline: '0px !important',
        borderRadius: '4px',
        width: '44px',
        height: '44px',
        '& path': {
          fill: '#5C5A61',
        },
        '&.Mui-disabled': {
          // backgroundColor:"rgba(0, 0, 0, 0.03) !important",
          // opacity:"0.3"
        },
      },
      dayLabel: {
        color: '#A6A6A6',
      },
      visibilityHidden: {
        zIndex: '199',
      },
      transitionContainer: {
        display: 'none',
        backgroundColor: `#FFF !important`,
        border: '1px solid #F1F1F1',
        borderRadius: '4px',
        height: 'auto',
        '& > p': {
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          textTransform: 'uppercase',
          fontSize: '15px',
          lineHeight: '100%',
        },
      },
    },
    // MuiPickersCalendar:{
    //   transitionContainer: {
    //     display: "block",
    //     position: "unset",
    //     translate:"0"
    //   }
    // },

    MuiPickersDay: {
      day: {
        color: '#5C5A61',
        borderRadius: '4px',
        // background: ({ changeBgColor }: any) => (!changeBgColor ? '#F8F8F8' : '#FFFFFF'),
      },

      daySelected: {
        backgroundColor: '#5C5A61 !important',
        color: ({ changeBgColor }: any) => (!changeBgColor ? '#FFF' : '#252427'),
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: 'rgb(92 90 97 / 74%)',
        },
      },
      dayDisabled: {
        color: '#A6A6A6',
      },
      current: {
        border: '1px solid #E1E1E1',
        backgroundColor: '#FFF',
        // color: '#252427',
        color: ({ changeBgColor }: any) => (!changeBgColor ? '#252427' : '#FFF'),
        borderRadius: '4px',
      },
    },
  },
} as any);

export const materialTheme2 = createTheme({
  components: {
    MuiPickersCalendarHeader: {
      styleOverrides: {
        color: 'red',
      },
    },
  },
  overrides: {
    MuiCalendarPicker: {
      position: 'relative',
      padding: '0 20px',
      // root:{
      //   color:"black",
      //   staticCalendar:{
      //     position:'relative',
      //   padding:'0 20px',
      //   }
      // }
    },

    MuiPickersCalendarHeader: {
      root: {
        // display:'flex',
        // justifyContent:'space-between',
        // position:'absolute',
        // top:'12px',
        // width:'87px',
        position: 'relative',
        padding: '0 20px',
      },
      switchHeader: {
        color: '#252427',
        gap: '16px',
        alignItems: 'stretch',
        marginBottom: '24px',
      },
      iconButton: {
        backgroundColor: 'red',
        // backgroundColor: `#FFF`,
        outline: '0px !important',
        borderRadius: '4px',
        width: '44px',
        height: '44px',
        '& path': {
          fill: '#5C5A61',
        },
        '&.Mui-disabled': {},
      },
      dayLabel: {
        color: '#A6A6A6',
      },
      visibilityHidden: {
        zIndex: '199',
      },
      transitionContainer: {
        display: 'none',
        backgroundColor: `#FFF !important`,
        border: '1px solid #F1F1F1',
        borderRadius: '4px',
        height: 'auto',
        '& > p': {
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          textTransform: 'uppercase',
          fontSize: '15px',
          lineHeight: '100%',
        },
      },
    },
    MuiPickersDay: {
      day: {
        color: '#5C5A61',
        borderRadius: '4px',
        background: '#FFFFFF',
      },

      daySelected: {
        backgroundColor: '#5C5A61 !important',
        color: ({ changeBgColor }: any) => (!changeBgColor ? '#FFF' : '#252427'),
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: 'rgb(92 90 97 / 74%)',
        },
      },
      dayDisabled: {
        color: '#A6A6A6',
      },
      current: {
        border: '1px solid #E1E1E1',
        backgroundColor: '#FFF',
        color: ({ changeBgColor }: any) => (!changeBgColor ? '#252427' : '#FFF'),
        borderRadius: '4px',
      },
    },
  },
} as any);
