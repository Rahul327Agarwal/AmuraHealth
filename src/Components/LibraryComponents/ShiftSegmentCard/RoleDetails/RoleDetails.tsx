import { Checkbox } from '@mui/material';
import React from 'react';
import { EditIcon } from '../../../SVGs/Common';
import { useStyles } from '../RoleCard/RoleCard.styles';
import { IProps } from './RoleDetails.types';

export default function ShiftSegment(props: IProps) {
  const { roleName, is_active, reportees, reportingTo, handleEdit, roleId, handleActivation } = props;
  const { classes } = useStyles();
  const [isChecked, setIsChecked] = React.useState(is_active);
  React.useEffect(() => {
    setIsChecked(is_active);
  }, [is_active]);

  return (
    <div className={classes.RoleDetails}>
      <div className={classes.RoleDetailsHeader}>
        <span className={`${classes.RoleHeaderSpan} ${classes.alignCenter}`}>{roleName}</span>
        <div
          className={classes.IconsSpan}
          onClick={() => {
            if (handleEdit) handleEdit(roleId);
          }}
        >
          {<EditIcon />}
        </div>
      </div>
    </div>
  );
}
