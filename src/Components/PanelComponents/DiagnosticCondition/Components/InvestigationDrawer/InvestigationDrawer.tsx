import { Avatar } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getNameInitials, getUserNameFromES } from '../../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import MUIDrawer from '../../../../LibraryComponents/MUIDrawer/MUIDrawer';
import { useStyles } from './InvestigationDrawer.styles';
import { IProps } from './InvestigationDrawer.types';
import MUISkeleton from '../../../../LibraryComponents/MUISkeleton/MUISkeleton';
import { useFetchUserName } from '../../../../../Common/Common.hooks';

export default function InvestigationDrawer(props: IProps) {
  const { open, onClose, title, description, userId, updatedBy, updatedOn } = props;
  const { classes } = useStyles();
  const [name, setName] = useState(updatedBy);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchUserName } = useFetchUserName();

  const commonClasses = useCommonStyles();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const userName = await fetchUserName(updatedBy);
      setName(userName);
      setIsLoading(false);
    })();
  }, [updatedBy]);

  return (
    <MUIDrawer open={open} anchor={'bottom'} headerTitle={title} handleClose={onClose}>
      <div className={classes.drawerBody}>
        <div className={`${commonClasses.body15Regular} ${classes.discriptionData}`}>{description} </div>
        {isLoading && (
          <div className={classes.loaderWrapper}>
            <MUISkeleton animation="wave" variant="rectangular" height="24px" width="47%" />
            <MUISkeleton animation="wave" variant="rectangular" height="24px" width="47%" />
          </div>
        )}
        {!isLoading && (
          <div className={classes.userDetails}>
            <span className={`${commonClasses.caption12Regular} ${classes.userDate}`}>
              {moment(new Date(updatedOn)).format('DD/MM/YYYY')}
              {` at `}
              {moment(new Date(updatedOn)).format('hh:mm A')}
            </span>
            <div className={classes.userNameWrapper}>
              <Avatar className={classes.avatar} src={`${import.meta.env.VITE_DP_URL}${userId}/profile-pic.png`}>
                {getNameInitials(name)}
              </Avatar>
              <span className={`${commonClasses.body15Medium} ${classes.userName}`}>{name}</span>
            </div>
          </div>
        )}
      </div>
    </MUIDrawer>
  );
}
