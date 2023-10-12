import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import MUIDrawer from '../../../../LibraryComponents/MUIDrawer/MUIDrawer';
import { AgendaIcon, OneDayViewIcon, ThreeDayViewIcon } from '../../../../SVGs/Common';
import { useStyles } from './ViewTypeDrawer.styles';
import { IProps } from './ViewTypeDrawer.types';

export const OPTIONS = [
  { label: 'Agenda', preview: 'Agenda', value: 'Agenda', renderIcon: <AgendaIcon /> },
  { label: '1 Day', preview: '1 Day', value: 'OneDay', renderIcon: <OneDayViewIcon /> },
  { label: '3 Day', preview: '3 Day', value: 'ThreeDay', renderIcon: <ThreeDayViewIcon /> },
  // { label: 'This Week', preview: '7 Days', value: 'sevenDay', renderIcon: <WeekDayViewIcon/> },
  // { label: 'This Month', preview: 'Month', value: 'Month', renderIcon: <MonthViewIcon /> },
];
const VIEW_TYPE_ICONS = {
  Agenda: <AgendaIcon />,
  OneDay: <OneDayViewIcon />,
  ThreeDay: <ThreeDayViewIcon />,
};

export default function ViewTypeDrawer(props: IProps) {
  const { onChange, value } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  const onSelect = (data: any) => {
    onChange(data);
    onClose();
  };

  return (
    <>
      <IconButton size="small" onClick={() => setOpen(true)} className={classes.headerIcon}>
        {VIEW_TYPE_ICONS[value]}
      </IconButton>
      <MUIDrawer anchor={'bottom'} headerTitle={'Select View'} open={open} handleClose={onClose}>
        <div className={classes.menuWrapper}>
          {OPTIONS.map((data: any) => (
            <div
              data-selected={value === data.value}
              className={classes.menu}
              key={data.value}
              onClick={() => onSelect(data.value)}
            >
              <span className={commonClasses.body15Regular}>{data.label}</span>
              <span>{data.renderIcon}</span>
            </div>
          ))}
        </div>
      </MUIDrawer>
    </>
  );
}
