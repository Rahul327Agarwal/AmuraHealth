import React from 'react';
import Button  from '../MUIButton/MUIButton';
import MUIDrawer  from '../MUIDrawer/MUIDrawer';
import RadioGroup  from '../MUIRadioGroup/MUIRadioGroup';
import { useStyles } from './BottomDrawerRadio.styles';
import { IProps } from './BottomDrawerRadio.types';

const BottomDrawerRadio = (props: IProps) => {
  const { open, headerText, options, handleClose, btnDisabled, buttonText, handleNext, handleSelection, currentSelection } =
    props;
  const { classes } = useStyles();

  return (
    <MUIDrawer open={open} headerTitle={headerText} anchor="bottom" handleClose={handleClose}>
      <div className={classes.drawerBody}>
        <RadioGroup
          variant="radio"
          isReverse
          isDivider
          flexDirection="column"
          value={currentSelection}
          setValue={(data) => handleSelection(data as any)}
          options={options}
        />
        <div className={classes.drawerFooterStyle}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" size="large" onClick={handleNext} disabled={btnDisabled}>
            {buttonText}
          </Button>
        </div>
      </div>
    </MUIDrawer>
  );
};

export default BottomDrawerRadio;
