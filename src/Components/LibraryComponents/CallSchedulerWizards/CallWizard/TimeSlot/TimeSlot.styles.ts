import { makeStyles } from 'tss-react/mui';
import { IProps } from './TimeSlot.types';
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  timeSlotContainer: {
    border: props.isSelected ? '1px solid #252427' : '1px solid transperant',
    width: '78px',
    borderRadius: '5px',
    padding: '8px',
    color: props.isSelected ? '#252427' : '#5C5A61',
    cursor: 'pointer',
    background: props.isSelected ? '#F8F8F8' : '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '&:hover': {
      background: !props.isSelected ? '#FFFFFF' : '#F8F8F8',
    },
  },
  timeSpan: {
    // fontSize: "12px",
    // lineHeight: "16px",
    display: 'block',
    textAlign: 'center',
    width: '100%',
  },
  timeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
  },
  circleDiv: {
    width: '10px',
    height: '10px',
  },
  circlesContainer: {
    marginTop: '4px',
    display: 'flex',
    justifyContent: 'center',
  },
  circle: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    margin: '2px',
  },
}));
