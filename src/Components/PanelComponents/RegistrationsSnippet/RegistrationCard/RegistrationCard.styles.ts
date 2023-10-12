import { makeStyles } from 'tss-react/mui';
import { IProps } from './RegistrationCard.types';
export const useStyles = makeStyles<IProps>()((theme) => ({
  container: {
    backgroundColor: '#F8F8F8',
    borderRadius: '8px',
    padding: '20px 16px 8px 16px',
    marginBottom: '20px',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    gap: '20px',
    // alignItems:'center'
  },
  colorSyle: {
    color: '#A6A6A6',
    display: 'block',
    marginTop: '4px',
  },
  mb: {
    marginBottom: '16px',
  },
  pointer:{
    cursor:'pointer'
  },
  mT16: {
    marginTop: '16px',
  },
  attachmentDiv: {
    '&:not(:last-child)': {
      borderBottom: '1px solid #E9E8E8',
    },
    padding: '10px 0px',
    cursor:'pointer'
  },
  educationsDetails: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 0px',
  },
  fileName: {
    fontSize: '12px',
    color: '#5C5A61',
    lineHeight: '20px',
  },
  wordBreaks: {
    wordBreak: 'break-word',
  },
}));
