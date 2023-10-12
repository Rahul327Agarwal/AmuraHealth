import { makeStyles } from 'tss-react/mui';
import { IProps } from './NewTimeSlot.types';
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  timeSlotContainer: {
    border: `1px solid ${props.isSelected ? theme.palette.colors.system.black : theme.palette.colors.system.white}`,
    width: '100px',
    borderRadius: '4px',
    padding: '8px',
    color: props.isSelected ? theme.palette.colors.gray[900] : theme.palette.colors.gray[500],
    cursor: 'pointer',
    background: theme.palette.colors.system.white,
    // "&:hover": {
    //   background: !props.isSelected
    //     ? theme.palette.system.hover
    //     : "transparent",
    // },
  },
  timeSpan: {
    fontSize: '12px',
    lineHeight: '16px',
  },
  timeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDiv: {
    width: '10px',
    height: '10px',
    border: '1px solid red',
  },
  circlesContainer: {
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    margin: '2px',
  },
}));
