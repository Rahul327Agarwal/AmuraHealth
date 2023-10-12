import { makeStyles } from 'tss-react/mui';
import { IProps } from './EducationCard.types';
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
  year: {
    color: '#A6A6A6',
    display: 'block',
    marginTop: '4px',
  },
  pointer: {
    cursor: 'pointer',
  },
  mb: {
    marginBottom: '16px',
  },
  attachmentDiv: {
    '&:not(:last-child)': {
      borderBottom: '1px solid #E9E8E8',
    },
    padding: '12px 0px',
    cursor: 'pointer',
  },
  fileName: {
    fontSize: '12px',
    color: '#5C5A61',
  },
  wrapText: {
    wordBreak: 'break-word',
  },
}));
