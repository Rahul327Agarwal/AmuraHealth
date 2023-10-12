import { Box, Grid, Paper, Popover, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserNameFromES } from '../../../Common/Common.functions';
import ErrorToaster from '../../../Common/ErrorToaster';
import { useCurrentPanel } from '../../../DisplayFramework/Components/Panel/Panel.hooks';
import { useDFEvent } from '../../../DisplayFramework/Events/DFEvents';
import { useSelectedClient } from '../../../DisplayFramework/State/Slices/DisplayFramework';
import { getBlueDotsOfAStaffForAPatient } from '../../LibraryComponents/ChatComponent/BlueDotPopUp/BlueDotClosePopUp/BlueDotClosePopUp.functions';
import Staffcard from '../../LibraryComponents/StaffCard/StaffCard';
import { AssignLeadDoctorProps, StaffCard } from '../../LibraryComponents/TeamAssignment/CareTeam.types';
import { ChangeStaffMemberProps } from '../../LibraryComponents/TeamAssignment/ChangeStaffMember/ChangeStaffMember.types';
import ThreeDotMenu from '../../LibraryComponents/ThreeDotMenu/ThreeDotMenu';
import { IAllRoleDetails, INameCard } from '../MyListPanel/MyList/MyList.types';
import {
  setIsMyTeamLoading,
  setMyTeamData,
  setMyTeamOverFlowData,
} from './../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState } from './../../../DisplayFramework/State/store';
import { getCardFixedWidth, getClientStaffData } from './MyTeam.function';
import { useCardsSizeInfo } from './MyTeam.hooks';
import { useMyTeamStyles } from './MyTeam.styles';
import { MyTeamProps } from './MyTeam.types';

export default function MyTeam(props: MyTeamProps) {
  const { registerEvent, unRegisterEvent } = props;
  const sendEvent = useDFEvent();
  const {
    myTeamData: data,
    selectedClientObject,
    myRolesAcrossTenants,
    isMyTeamLoading,
    isTeamChangeInProgress,
    allUserRoles,
  } = useSelector((state: IRootState) => state.dashboard);
  const selectedClientObject1 = useSelectedClient();

  const overFlowData = useSelector((state: IRootState) => state.dashboard.myTeamOverFlowData);
  const patientId = useSelector((state: IRootState) => state.dashboard.patientId);
  const { id: panelId } = useCurrentPanel();
  const dispatch = useDispatch();

  const { parentRef, numOfCardsCanFit: panels } = useCardsSizeInfo({
    extraSpace: 30,
  });

  const fetchAllData = (addedCard?: any) => {
    getClientStaffData(
      props,
      selectedClientObject1,
      panels!,
      dispatch,
      patientId,
      false,
      {
        roleName:
          allUserRoles.find((x: IAllRoleDetails) => x?.roleId === selectedClientObject?.roleId)?.roleName ||
          selectedClientObject?.roleId,
        roleId: selectedClientObject?.roleId || '',
      },
      allUserRoles,
      addedCard?.action === 'REMOVE'
    );
  };

  const setLoggedInUser = async () => {
    const userName = await getUserNameFromES(props.sessions?.user?.id);
    let loggedInUser = [{ FirstName: userName, Roles: [''], UserName: props.sessions?.user?.id, Id: props.sessions?.user?.id }];
    dispatch(setMyTeamData(loggedInUser));
    dispatch(setIsMyTeamLoading(false));
  };

  /**
   *
   */
  useEffect(() => {
    let shouldFetchData = true;

    if (selectedClientObject1 === null || selectedClientObject === null) {
      shouldFetchData = false;
    }

    let myTeamSubscription: any;
    let loggedInUserSubscription: any;

    //

    if (shouldFetchData) {
      myTeamSubscription = registerEvent(`${'amura'}~${patientId}`, 'ASSIGN_STAFF', fetchAllData);
      loggedInUserSubscription = registerEvent(`${'amura'}~${patientId}`, 'ASSIGN_STAFF', fetchAllData);
      fetchAllData();
      return () => {
        unRegisterEvent(myTeamSubscription);
        unRegisterEvent(loggedInUserSubscription);
      };
    } else {
      loggedInUserSubscription = registerEvent(`${'amura'}~${patientId}`, 'ASSIGN_STAFF', setLoggedInUser);
      setLoggedInUser();
      return () => {
        unRegisterEvent(loggedInUserSubscription);
      };
    }
  }, [selectedClientObject, selectedClientObject1, props.sessions]);

  /**
   *
   */
  useEffect(() => {
    let overFlowStaffList: any = [];
    data?.forEach((item, i) => {
      if (i > panels! - 1) {
        if (item?.Id === props.sessions?.user?.id || !item?.isWatching) overFlowStaffList.push(item);
      }
    });
    dispatch(setMyTeamOverFlowData(overFlowStaffList));
  }, [panels, data]);

  const [anchorel, setAnchorel] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  //

  const { classes } = useMyTeamStyles();

  return (
    <div className={classes.mainContainer} ref={parentRef}>
      {data ? (
        <Paper elevation={0} className={classes.root}>
          <Box p={0} className={classes.cardsContainer}>
            {/* Loading */}
            {isMyTeamLoading
              ? Array.from(Array(panels)).map((_, item) => (
                  <div
                    className={classes.skeltonCard}
                    style={{
                      width: getCardFixedWidth(),
                    }}
                  >
                    <div>
                      <Skeleton animation="wave" variant="circular" width={60} height={60} />
                    </div>
                    <div>
                      <Skeleton animation="wave" height={20} width="60%" style={{ marginBottom: 6 }} />
                      <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
                    </div>
                  </div>
                ))
              : null}

            {/* Data */}
            {!isMyTeamLoading
              ? data?.map((x, i) => {
                  if (i < panels!) {
                    if (x?.Id !== props.sessions?.user?.id && x?.isWatching) return null;
                    return (
                      //

                      <Staffcard
                        profileName={`${x.FirstName ?? ''} ${x.LastName ?? ''} `}
                        salutation={`${x.Salutation ?? ''}`}
                        userProfile={x.Roles}
                        ratingValue=""
                        lastSeen=""
                        userId={x.UserName ?? ''}
                        injectConponentEnd={
                          x.Id === props.sessions.user.id ? (
                            ''
                          ) : (
                            <ThreeDotMenu
                              options={[{ label: 'Change', value: 'Change' }]}
                              handleClick={(v: any) => {
                                console.log('Clicked staff card', x);

                                let profile: StaffCard = {
                                  name: x.FirstName,
                                  id: x.Id,
                                  roleName: x.originalRoles[0],
                                  roleId: x.originalRoles[0],
                                  hierarchyId: x.hierarchyId,
                                };
                                let propsToSend: ChangeStaffMemberProps = {
                                  selectedRole: {
                                    value: x.originalRoles[0],
                                    label: x.originalRoles[0],
                                  },
                                  setIsLoading: () => {},
                                  isLoading: false,
                                  allProfiles: [profile],
                                  injectComponent: undefined,
                                  cameFrom: 'MyTeam',
                                  ...props,
                                  panel: {},
                                  selectedTenant: {},
                                  childEventTrigger: () => {},
                                  patientId: patientId,
                                };
                                getBlueDotsOfAStaffForAPatient(
                                  panelId,
                                  props.sessions,
                                  x.originalRoles[0],
                                  x.Id,
                                  'amura',
                                  patientId
                                )
                                  .then((response) => {
                                    if (response.length === 0) {
                                      sendEvent('onModifyStaffClick', {
                                        ...propsToSend,
                                      } as AssignLeadDoctorProps);
                                      return;
                                    }
                                    ErrorToaster('The staff you are trying to change has unresolved bluedots', panelId, 'error');
                                    return;
                                  })
                                  .catch((error) => {
                                    console.error('Error in change staff', error);
                                  });
                              }}
                              usePopOver
                              customStyle={classes.menuStyle}
                            />
                          )
                        }
                        tenantId={selectedClientObject === null ? undefined : props?.selectedClient?.tenant_id}
                        variant="teamCard"
                        width={getCardFixedWidth()}
                      />

                      //
                    );
                  }
                  return null;
                })
              : null}

            {/* Overflow */}
            {!isMyTeamLoading ? (
              overFlowData.length > 0 ? (
                <Grid item>
                  <div
                    onClick={(event) => {
                      setIsOpen(true);
                      setAnchorel(event.currentTarget as any);
                    }}
                    className={classes.avatarContainer}
                  >
                    <div className={classes.avatar}>
                      <Typography variant="body1">{`+ ${overFlowData.length}`}</Typography>
                    </div>
                  </div>
                </Grid>
              ) : null
            ) : null}

            {/*  */}
          </Box>
          <Popover
            open={isOpen}
            anchorEl={anchorel}
            onClose={() => setIsOpen(false)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className={classes.popoverStyle}>
              {overFlowData?.map((x: any, index: number) => (
                <Staffcard
                  profileName={`${x.FirstName ?? ''} ${x.LastName ?? ''} `}
                  salutation={`${x.Salutation ?? ''}`}
                  userProfile={x.Roles}
                  ratingValue=""
                  lastSeen=""
                  userId={x.UserName ?? ''}
                  injectConponentEnd={
                    x.Id === props.sessions.user.id ? (
                      ''
                    ) : (
                      <ThreeDotMenu
                        options={[{ label: 'Change', value: 'Change' }]}
                        handleClick={(v: any) => {
                          let profile: StaffCard = {
                            name: x.FirstName,
                            id: x.Id,
                            roleName: x.originalRoles[0],
                            roleId: x.originalRoles[0],
                            hierarchyId: x.hierarchyId,
                          };
                          let propsToSend: ChangeStaffMemberProps = {
                            selectedRole: {
                              value: x.originalRoles[0],
                              label: x.originalRoles[0],
                            },
                            setIsLoading: () => {},
                            isLoading: false,
                            allProfiles: [profile],
                            injectComponent: undefined,
                            cameFrom: 'MyTeam',
                            ...props,
                            panel: {},
                            selectedTenant: {},
                            childEventTrigger: () => {},
                            patientId: (selectedClientObject as INameCard).additionalKeys.patientId,
                          };
                          getBlueDotsOfAStaffForAPatient(panelId, props.sessions, x.originalRoles[0], x.Id, 'amura', patientId)
                            .then((response) => {
                              if (response.length === 0) {
                                sendEvent('onModifyStaffClick', {
                                  ...propsToSend,
                                } as AssignLeadDoctorProps);
                                return;
                              }
                              ErrorToaster('The staff you are trying to change has unresolved bluedots', panelId, 'error');
                              return;
                            })
                            .catch((error) => {
                              console.error('Error in change staff', error);
                            });
                        }}
                        usePopOver
                        customStyle={classes.menuStyle}
                      />
                    )
                  }
                  tenantId={selectedClientObject === null ? undefined : props?.selectedClient?.tenant_id}
                  variant="teamCard"
                  width={getCardFixedWidth()}
                />
              ))}
            </div>
          </Popover>
        </Paper>
      ) : null}
    </div>
  );
}
