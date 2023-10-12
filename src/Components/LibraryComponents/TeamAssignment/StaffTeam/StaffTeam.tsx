import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { PMS_LOCALE } from '../../../../Utils';
import { Close, PlusIcon } from '../../../SVGs/Common';
import ModalBox from '../../ModalBox/ModalBox';
import Staffcard from '../../StaffCard/StaffCard';
import { useCurrentPanel } from '../../../../DisplayFramework/Components/Panel/Panel.hooks';
import MUISkeleton from '../../MUISkeleton/MUISkeleton';
import ThreeDotMenu from '../../ThreeDotMenu/ThreeDotMenu';
import { onConfirmDelete } from '../CareTeam.functions';
import { useStyles } from '../CareTeam.styles';
import { StaffCard, StaffTeamProps } from '../CareTeam.types';

const StaffTeam = (props: StaffTeamProps) => {
  const {
    panel,
    allProfiles,
    setActionType,
    setTransferData,
    setSelectedRole,
    injectComponent,
    showCancleToSearchUsers = false,
  } = props;

  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const CommonStyles = useCommonStyles();
  const [disable, setDisable] = useState(false);
  const [modalState, setModalState] = useState({
    open: false,
    payload: '',
  } as any);

  const handleSlaffDelete = (data, profileName) => {
    if (data === 'Delete') setModalState({ open: true, payload: profileName });
    else if (data === 'Transfer') {
      console.log('!!profileName', profileName);
      setSelectedRole({ label: profileName.roleName, value: profileName.roleId });
      setTransferData(profileName);
      setActionType('ADD_MANUALLY');
    }
  };

  const handleModalCancel = () => setModalState({ open: false, payload: {} });

  const handleModalSave = () => {
    setDisable(true);
    onConfirmDelete(props, () => {}, modalState.payload, panelId).finally(() => {
      setModalState({ open: false, payload: {} });
      setDisable(false);
    });
  };

  return (
    <>
      <div className={`${classes.container}`}>
        <div className={classes.mainTitleNew}>
          <div>
            <span className={classes.inject}>{injectComponent}</span>
            <span
              className={`${CommonStyles.body17Medium} ${classes.labelOption}`}
              title={showCancleToSearchUsers ? props?.selectedClient?.label : 'Team'}
            >
              {showCancleToSearchUsers ? props?.selectedClient?.label : 'Team'}
            </span>
          </div>
          {showCancleToSearchUsers && (
            <span className={`${classes.crossIconAlign}`} onClick={() => setActionType('STAFF_SEARCH')}>
              <Close />
            </span>
          )}
        </div>
        {props.isLoading && (
          <>
            <MUISkeleton
              animation="wave"
              variant="rectangular"
              height="70px"
              width="100%"
              style={{ margin: '20px 1rem 8px 1rem' }}
            />
            <MUISkeleton
              animation="wave"
              variant="rectangular"
              height="70px"
              width="100%"
              style={{ margin: '0 1rem 8px 1rem' }}
            />
            <MUISkeleton
              animation="wave"
              variant="rectangular"
              height="70px"
              width="100%"
              style={{ margin: '0 1rem 8px 1rem' }}
            />
            <MUISkeleton
              animation="wave"
              variant="rectangular"
              height="70px"
              width="100%"
              style={{ margin: '0 1rem 8px 1rem' }}
            />
          </>
        )}
        {!props.isLoading && (
          <div className={classes.teamWrapper} data-header-hidable>
            {allProfiles.map((staffData: StaffCard) => (
              <Staffcard
                key={staffData.id}
                profileName={staffData.name}
                userProfile={staffData.roleName}
                ratingValue={staffData.rating}
                lastSeen={staffData.lastSeen}
                userId={staffData.id}
                injectConponentEnd={
                  <ThreeDotMenu
                    options={[{ label: 'Delete', value: 'Delete' }]}
                    handleClick={(v: any) => handleSlaffDelete(v, staffData)}
                    usePopOver
                    customStyle={classes.menuStyle}
                  />
                }
                tenantId={props?.selectedClient?.tenant_id}
                variant="card"
              />
            ))}
          </div>
        )}
        <div className={classes.footerDiv}>
          <span className={classes.addButtonWrapper}>
            <IconButton onClick={() => setActionType('SELECT_ROLE')} className={classes.addButton}>
              <PlusIcon />
            </IconButton>
          </span>
        </div>
        <ModalBox
          panelWidth={panel?.width}
          open={modalState.open}
          handleClose={handleModalCancel}
          modalTitle={'Are you sure?'}
          buttonConfig={[
            {
              text: PMS_LOCALE.translate('No'),
              variant: 'text',
              onClick: handleModalCancel,
            },
            {
              text: PMS_LOCALE.translate('Yes'),
              variant: 'contained',
              onClick: handleModalSave,
              disabled: disable,
            },
          ]}
        >
          <div className={classes.modalBody}>
            <p className={`${classes.conformText} ${CommonStyles.body15Regular}`}>
              Do you want to remove {modalState?.payload?.name} as {modalState?.payload?.roleName} ?
            </p>
          </div>
        </ModalBox>
      </div>
    </>
  );
};

export default StaffTeam;
