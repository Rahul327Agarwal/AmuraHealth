import { Slider } from '@mui/material';
import { withStyles } from 'tss-react/mui';
interface IProps {
  handleChange: any;
  initialIndex: number;
  lastIndex: number;
  value: number[];
  disableSlider: boolean;
}
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
const PrettoSlider = withStyles(Slider, (theme, props) => ({
  root: {
    color: theme.palette.colors.gray[500],
    height: 1,
    '&:focus, &:hover': {
      color: theme.palette.colors.gray[900],
    },
  },
  track: {
    height: 2,
    borderRadius: 4,
  },
  thumb: {
    backgroundColor: '#ffffff',
    border: '1px solid currentColor',
    '&:focus, &:hover': {
      color: theme.palette.colors.gray[900],
      boxShadow: `0px 0px 0px 8px ${theme.palette.colors.gray[100]}`,
    },
  },
  rail: {
    color: theme.palette.colors.gray[400],
    height: 2,
    borderRadius: 4,
  },
  valueLabel: {
    '& *': {
      color: '#FFFFFF',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.25px',
    },
  },
}));
export default function SliderMaterialUI(props: IProps) {
  const { value, handleChange, lastIndex, initialIndex, disableSlider } = props;
  return (
    <div style={{ margin: '5px 5px 0px 5px' }}>
      <PrettoSlider
        disabled={disableSlider}
        max={lastIndex}
        min={initialIndex}
        value={value}
        onChange={(e, v) => {
          handleChange(v);
        }}
        aria-labelledby="range-slider"
        valueLabelDisplay="auto"
      />
    </div>
  );
}
