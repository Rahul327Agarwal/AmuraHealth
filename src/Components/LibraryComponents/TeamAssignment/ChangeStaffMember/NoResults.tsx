import React from 'react';
import { useDispatch } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { setCancelRessignment } from '../../../../DisplayFramework/State/Slices/BulkReassignment';
import { BackArrowIcon, Close, NoResultsSVG } from '../../../SVGs/Common';
// import { setCancelRessignment } from '../../../DisplayFramework/State/Slices/BulkReassignment';
import Button from '../../MUIButton/MUIButton';
import PageHeader from '../../PageHeader/PageHeader';
// import { Close } from '../../SVGNew/Close';
// import { NoResultsSVG } from '../../SVGNew/NoResultsSVG';
// import { useCommonStyles } from '../../Theme/CommonStyles';
import { NoResultsProps } from '../CareTeam.types';
import { useStyles } from './ChangeStaffMember.styles';
import { ChangeStaffMemberProps } from './ChangeStaffMember.types';
import { useDFEvent, useDFGoBack } from '../../../../DisplayFramework/Events/DFEvents';
import { IconButton } from '@mui/material';

function NoResults(props: ChangeStaffMemberProps) {
  const { selectedRole, childEventTrigger, selectedBulkRole } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();

  const sendEvent = useDFEvent();
  const goBack = useDFGoBack();
  return (
    <div className={classes.rootContainer}>
      <PageHeader
        customStyle={classes.padding20}
        startAdornment={
          <IconButton
            onClick={() => {
              goBack('S');
            }}
          >
            <BackArrowIcon />
          </IconButton>
        }
        headerContent={`Assign ${selectedRole.label}`}
      />
      <div className={classes.middleContainer}>
        <div className={`${classes.noResultsDiv}`}>
          <div>
            <div className={`${classes.textAlign}`}>
              <NoResultsSVG />
            </div>
            <div className={`${classes.topMargin}`}>
              <div className={`${classes.textAlign}`}>
                <span className={`${commonClasses.body20Medium}`}>{`No matched staff found to`}</span>
              </div>
              <div className={`${classes.textAlign}`}>
                <span className={`${commonClasses.body20Medium}`}>{`Assign ${selectedRole.label}`}</span>
              </div>
            </div>
            <div className={`${classes.textAlign} ${classes.topMargin}`}>
              <Button
                children={'Add Manually'}
                variant="contained"
                size="large"
                startIcon={''}
                onClick={() => {
                  console.log('props about to be sent', props);
                  sendEvent('onManualChange', { ...props });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NoResults;
