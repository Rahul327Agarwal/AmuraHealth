import { SwitchIcon } from './ToggleButton.svg';
import MUIButton from '../MUIButton/MUIButton';
import { useStyles } from './ToggleButton.styles';
import { IProps } from './ToggleButton.types';

export default function ToggleButton(props: IProps) {
  const { value, setValue, toggleValues, customStyle, endIcon, ...rest } = props;
  const { classes } = useStyles();

  const handleToggle = () => {
    const index = toggleValues?.indexOf(value);
    if (index === toggleValues.length - 1 || index === -1) {
      setValue(toggleValues[0]);
    } else {
      setValue(toggleValues[index + 1]);
    }
  };

  return (
    <MUIButton
      {...rest}
      variant="contained"
      onClick={handleToggle}
      className={`${classes.root} ${customStyle}`}
      endIcon={endIcon ?? <SwitchIcon />}
      fullWidth
    >
      {value}
    </MUIButton>
  );
}
