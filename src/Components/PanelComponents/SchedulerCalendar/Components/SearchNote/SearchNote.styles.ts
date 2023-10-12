import { makeStyles } from 'tss-react/mui';
import { IProps } from './SearchNote.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { eventDate }) => {
  const isToday =
    new Date(eventDate).getDate() === new Date().getDate() && new Date(eventDate).getMonth() === new Date().getMonth();
  return {
    container: {
      background: '#FFFFFF',
      padding: '0 20px',
    },
    spaceBetween: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '25px',
      padding: '0 20px',
      marginTop:'20px',
    },
    flex: {
      flex: 1,
      gap: '16px',
      display: 'flex',
      flexDirection: 'column',
    },
    rowWrap: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      width: '100%',
    },
    dayWrapper: {
      // width:"25%",
    },
    getDate: {
      marginBottom: '2px',
      fontWeight: isToday ? 900 : 500,
      color: isToday ? '#252427' : '#5C5A61',
    },
    getYear: {
      fontWeight: isToday ? 900 : 500,
      color: isToday ? '#252427' : '#5C5A61',
    },
    getYear2: {
      fontWeight: 500,
      color: '#5C5A61',
    },
    title: {
      width: '64px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },

    noSearchWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    noSearch: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    wrap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '10px',
    },
    span: {
      display: 'block',
    },
    helperText: {
      color: theme.palette.colors.gray[500],
      marginTop: '12px',
      textAlign: 'center',
      maxWidth: '284px',
    },
    clear: {
      padding: '0 !important',
      fontSize:'12px !important',
      fontWeight:'600 !important',
      color:'#373639',
    },
    results: {
      color: '#A6A6A6',
    },
  };
});
