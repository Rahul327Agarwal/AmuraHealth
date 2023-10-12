import { Drawer } from '@mui/material';
import React, { useState } from 'react';
import AddPeople from './Components/AddPeople';
import TimeManagement from './TimeManagement';
import { useStyles } from './TimeManagement.style';
import { actionScreen, IProps } from './TimeManagement.types';

export default function TimeManagementHome(props: IProps) {
  const [action, setAction] = useState<actionScreen>({ screen: 'HOME' });
  const { classes } = useStyles(props);

  return (
    <div className={classes.rootRelativeContainer} key={props.isEditEvent}>
      <TimeManagement {...props} setAction={setAction} addedPeoples={action.payload} />
      {action.screen === 'ADD_PEOPLE' ? (
        <Drawer anchor="left" className={classes.overlapDrawer} variant={'persistent'} open>
          <AddPeople {...props} setAction={setAction} tenantParticipants={action.payload} />
        </Drawer>
      ) : null}
    </div>
  );
}
