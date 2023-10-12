import { useEffect, useState } from 'react';
import { useStyles } from './CheckBoxHtml.styles';
import { IProps } from './CheckBoxHtml.types';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { CheckboxChecked, CheckboxUnChecked } from './CheckBoxHtml.svg';

export default function CheckBoxHtml(props: IProps) {
  const { label, sublabel, labelposition, handleAnswer, value, isChecked } = props;
  const { classes } = useStyles();
  const globalClass = useCommonStyles();
  const [checked, setChecked] = useState(isChecked ?? false);

  useEffect(() => {
    setChecked(isChecked ?? false);
  }, [isChecked]);

  const handleCheck = () => {
    setChecked(!checked);
    handleAnswer(!checked, label, value);
  };
  return (
    <div
      onClick={handleCheck}
      className={`${classes.checkboxContainer} ${labelposition === 'end' ? classes.labelpositionstyle : ''}`}
    >
      <div className={classes.labelContainer}>
        <span className={`${globalClass.body15Regular} ${classes.labelStyle}`}> {label}</span>
        <span className={`${globalClass.sm10Regular} ${classes.sublabelStyle}`}>{sublabel}</span>
      </div>
      {checked ? <span>{<CheckboxChecked />}</span> : <span>{<CheckboxUnChecked />}</span>}
    </div>
  );
}
