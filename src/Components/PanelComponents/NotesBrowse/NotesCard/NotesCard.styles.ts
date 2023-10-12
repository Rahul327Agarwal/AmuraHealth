import { makeStyles } from 'tss-react/mui';
import { IProps } from './NotesCard.types';

export const useStyles = makeStyles<IProps>()((theme, { data, caller, ...props }) => ({
  maindiv: {
    padding: '16px',
    background: data.isHisory
      ? '#FFFFFF'
      : data?.isActive === 0
      ? '#F8F8F8'
      : caller == '@me'
      ? '#E1E1E1'
      : caller == '@team'
      ? '#F1F1F1'
      : '#F8F8F8',
    borderRadius: '6px',
    boxSizing: 'border-box',
    marginBottom: '8px',
  },
  flex1: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '21px',
  },
  p1: {
    color: '#5C5A61',
    marginBottom: '0',
  },
  p2: {
    color: '#5C5A61',
    marginBottom: '0',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '80px',
    flex: 1,
  },
  expandview: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: '1',
  },
  flex3: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    justifyContent: 'space-between',
  },
  profilePic: {
    width: '20px',
    height: '20px',
    color: '#FFFFFF',
    background: '#252427 !important',
    position: 'relative',
    fontSize: '12px',
    fontFamily: 'Graphik',
    fontWeight: 400,
  },
  flex4: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: 'inherit',
  },
  textwrapper: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2 /* number of lines to show */,
    WebkitBoxOrient: 'vertical',
    marginBottom: '0',
  },
  showEdit: {
    display: 'flex',
    gap: '28px',
  },
  reasonfordeactivation: {
    color: '#A6A6A6',
    marginBottom: '0',
    width: '80px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  span1: {
    color: '#007AFF',
  },
  deactivatedColor: {
    color: '#37E4D9',
  },
  span2: {
    color: '#A6A6A6',
    marginBottom: '0',
    wordBreak: 'break-word',
    verticalAlign: 'top',
    marginLeft: '4px',
  },
  color1: {
    color: '#5C5A61',
    wordBreak: 'break-word',
  },
  div2: {
    marginBottom: '20px',
  },
  icondiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 8px',
    gap: '4px',
    height: '28px',

    background: data?.isActive === 0 ? '#2524274d' : '#25242780',
    borderRadius: '20px',
    color: '#FFFFFF',
  },
  heading: {
    color: '#5C5A61',
    margin: '0px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  flex: {
    display: 'flex',
    gap: '8px',
    width: '100%',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 50px)',
  },
  title: {
    color: '#252427',
    margin: '0px',
  },
}));
