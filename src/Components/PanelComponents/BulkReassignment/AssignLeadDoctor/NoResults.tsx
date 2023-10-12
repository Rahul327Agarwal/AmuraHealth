import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { setCancelRessignment } from '../../../../DisplayFramework/State/Slices/BulkReassignment';
import { Close, NoResultsSVG } from '../../../SVGs/Common';
import { useStyles } from './AssignLeadDoctor.styles';
import { NoResultsProps } from '../ManualAddFlow/ManualAddFlow.types';
import PageHeader from '../../../LibraryComponents/PageHeader/PageHeader';
import Button from '../../../LibraryComponents/MUIButton/MUIButton';
import { getUserNameFromES } from '../../../../Common/Common.functions';

function NoResults(props: NoResultsProps) {
  const { selectedRole, setActionType, childEventTrigger, setAction, cardsToAssign } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();
  const [staffName, setStaffName] = useState('');

  useEffect(() => {
    (async () => {
      let name = await getUserNameFromES(cardsToAssign.patientId);
      setStaffName(name);
    })();
  }, []);
  const handleClose = () => {
    // if (!selectedBulkRole) return setActionType('SELECT_ROLE');
    // childEventTrigger(null, null, 'onCloseWorkPanelOnly', {});
    // //dispatch(setCancelRessignment(true));
    setAction('STAFFPOOLVIEW');
  };

  return (
    <div className={classes.rootContainer}>
      <PageHeader
        customStyle={classes.padding20}
        endAdornment={
          <span onClick={handleClose}>
            <Close />
          </span>
        }
        headerContent={`Assign doctor to ${staffName}`}
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
                onClick={() => setActionType('ADD_MANUALLY')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NoResults;
