import React, { useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import MoveCardRequest from './MoveCardRequest/MoveCardRequest';
import { useStyles } from './BulkReassignment.styles';
import { IProps, TScreen } from './BulkReassignment.types';
import Drawer from '@mui/material/Drawer';
import MoveCardDescription from './MoveCardDescription/MoveCardDescription';
import { IErrorsState, IFieldState } from './MoveCardRequest/MoveCardRequest.types';
import { DEFAULT_ERRORSTATE, DEFAULT_FIELDSTATE } from './MoveCardRequest/MoveCardRequest.function';
import { ICheckedCard } from './MoveCardRequest/Components/RoleAndTenant/RoleAndTenant.types';
import MUIButton from '../../LibraryComponents/MUIButton/MUIButton';
import { useDFEvent } from '../../../DisplayFramework/Events/DFEvents';

export default function BulkReassignmentHome(props: IProps) {
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const sendEvent = useDFEvent();
  return (
    <div className={classes.rootRelativeContainer}>
      <section className={classes.rootContainer}>
        <MUIButton
          className={`${classes.panelButton} ${commonClasses.body15Regular}`}
          onClick={() => sendEvent('onMoveBtnClick', {})}
        >
          <span className={classes.btnTextStyle}>Move my cards</span>
        </MUIButton>
      </section>
    </div>
  );
}
