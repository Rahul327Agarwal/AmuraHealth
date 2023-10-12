import { Switch } from '@mui/material';
import { withStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
const CustomSwitchApp = withStyles(Switch, (theme, props) => ({
  switchBase: {
    color: 'rgba(255, 255, 255, 0.6)',
    '& + $track': {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    '&$checked': {
      color: '#00FFCC',
    },
    '&$checked + $track': {
      backgroundColor: 'rgba(0,255,204)',
    },
  },
  checked: {},
  track: {},
}));
interface IProps {
  isActive: boolean;
  isActiveChange: Function;
}

export default function CustomSwitch(props: IProps) {
  return (
    <CustomSwitchApp
      checked={props.isActive}
      size="small"
      onChange={() => {
        props.isActiveChange();
      }}
    />
  );
}
