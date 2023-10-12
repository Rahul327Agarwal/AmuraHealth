import { makeStyles } from 'tss-react/mui';
import { IProps } from './ReportAttachments.types';
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  emptyContainer: {
    border: '1px solid rgb(255, 255, 255)',
    borderRadius: '3px',
    height: '58px',
    display: 'flex',
    justifyContent: 'center',
    lineHeight: '51px',
    padding: '4px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: '14px',
  },
  fileStore: {
    border: '1px solid #FFFFFF',
    borderRadius: '3px',
    padding: '4px',
    marginTop: '14px',
  },
  fileContainer: {
    display: 'flex',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#FFF',
    padding: '6px 8px',
    margin: '5px 0px',
    fontSize: '14px',
    cursor: 'pointer',
    wordBreak: 'break-all',
    '&:hover': {
      background: '#171D20',
      boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
    },
  },
  fileTitile: { padding: '0px 12px', width: '100%' },
  uploadedReports: { display: 'flex', color: '#FFF' },
  margingForIcon: { marginRight: '8px' },
  uploadedLabel: { width: '95.1%' },
  marginTop30px: { marginTop: '30px' },
  displayNone: { display: 'none' },
  addIcon: {
    color: props.open ? 'rgba(255, 255, 255, 0.30)' : '#ffffff',
    fontSize: '28px',
  },
}));
