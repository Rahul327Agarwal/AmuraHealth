import { IProps } from './BiomarkerCard.types';
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  wrapper: {
    background: '#F8F8F8',
    borderRadius: props.groupName ? '8px ' : '0',
    padding: '16px 16px 24px',
    gap: '24px',
    marginBottom: props.groupName ? '16px' : '0',
  },
  groupCard: {},
  biomarkerName: {
    marginBottom: '24px',
    display: 'block',
  },
  dflex: {
    display: 'flex',
    '&:not(:last-child)': {
      marginBottom: '32px',
    },
  },
  unitName: {
    width: '60%',
    color: '#252427',
    wordBreak: 'break-word',
  },
  unit: {
    width: '20%',
    color: '#5C5A61',
    wordBreak: 'break-word',
  },
  unitValue: {
    width: '20%',
    textAlign: 'end',
    color: '#5C5A61',
    wordBreak: 'break-word',
  },
}));
