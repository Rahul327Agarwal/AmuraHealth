import React, { useEffect, useState } from 'react';
import Button from '../MUIButton/MUIButton';
import MUIDrawer from '../MUIDrawer/MUIDrawer';
import ModalBox from '../ModalBox/ModalBox';
import { useStyles } from './MUIDatePicker.styles';
import { MUICalendarProps } from './MUIDatePicker.types';
import StaticCalendar from './StaticCalendar';

export default function CalendarDrawer(props: MUICalendarProps) {
  const { isOpen, setIsOpen, date, setDate, headerTitle, changeBgColor, openDialogBox, ...restProps } = props;
  const { classes } = useStyles(props);

  const [currDate, setCurrDate] = useState(date);
  const [showfilter, setShowfilter] = useState('');

  useEffect(() => {
    setCurrDate(date || new Date());
  }, [date]);

  const handleCancel = () => {
    setIsOpen(false);
    setShowfilter('');
  };
  const handleDone = () => {
    if (showfilter === '') {
      setDate(currDate);
      setIsOpen(false);
      return;
    }
    setShowfilter('');
  };

  const handleOpen = () => {
    setShowfilter('');
    setIsOpen(true);
  };
  const handleClose = () => {
    setShowfilter('');
    setIsOpen(false);
  };

  if (props.noDrawer) {
    return (
      <>
        <StaticCalendar {...restProps} date={currDate} setDate={setCurrDate} changeBgColor={changeBgColor} />
        <footer className={classes.drawerFooter}>
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDone}>
            Done
          </Button>
        </footer>
      </>
    );
  }

  return (
    <>
      <MUIDrawer
        anchor={'bottom'}
        headerTitle={headerTitle || 'Choose date'}
        open={isOpen && !openDialogBox}
        handleClose={handleClose}
        handleOpen={handleOpen}
        changebgColor={changeBgColor}
      >
        <StaticCalendar {...restProps} date={currDate} setDate={setCurrDate} changeBgColor={changeBgColor} />
        <footer className={classes.drawerFooter}>
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDone}>
            Done
          </Button>
        </footer>
      </MUIDrawer>

      <ModalBox
        open={openDialogBox}
        handleClose={handleCancel}
        buttonConfig={[]}
        showOnlyChildern={true}
        customStyle={classes.modelBoxStyles}
      >
        <div className={openDialogBox ? classes.wrapper : ''}>
          <StaticCalendar {...restProps} date={currDate} setDate={setCurrDate} changeBgColor={changeBgColor} />
          <footer className={classes.drawerFooter} style={{ padding: '0px 20px' }}>
            <Button variant="text" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleDone}>
              Done
            </Button>
          </footer>
        </div>
      </ModalBox>
    </>
  );
}
