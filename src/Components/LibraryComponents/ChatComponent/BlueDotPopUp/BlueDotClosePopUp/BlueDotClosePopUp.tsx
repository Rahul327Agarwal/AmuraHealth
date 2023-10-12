import { Radio } from '@mui/material';
import moment from 'moment';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchUserName } from '../../../../../Common/Common.hooks';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';
import { IRootState } from '../../../../../DisplayFramework/State/store';
import { PMS_S3 } from '../../../../../Utils';
import { getActualReportingRoleId, getStaffId } from '../../../../PanelComponents/MyListPanel/CardComponent/MylistCard.functions';
import { INameCard } from '../../../../PanelComponents/MyListPanel/MyList/MyList.types';
import { MessagesUsers, SendIcon } from '../../../../SVGs/Common';
import MUIButton from '../../../MUIButton/MUIButton';
import MUIDrawer from '../../../MUIDrawer/MUIDrawer';
import MUISkeleton from '../../../MUISkeleton/MUISkeleton';
import PanelFooter from '../../../PanelFooter/PanelFooter';
import { ITaskDB, IUITaskDB } from '../BlueDotPopUp.types';
import { getBlueDotsOfAUser } from './BlueDotClosePopUp.functions';
import { useStyles } from './BlueDotClosePopUp.styles';
import { IProps } from './BlueDotClosePopUp.types';
import { ChatFlyoutDrawer } from '../../../../PanelComponents/ChatNotes/Components/ChatInput/ChatFlyout/ChatFlyoutDrawer';
import { useListenToChatSendEvent } from '../../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatSend.hooks';
import { ChatInputState } from '../../../../PanelComponents/ChatNotes/Components/ChatInput/Input/ChatInput.state';
import { useAtom } from 'jotai';

function BlueDotClosePopUp(props: IProps) {
  const [selectedBlue, setSelectedBlue] = useState<any>({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const commonClasses = useCommonStyles();
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const selectedClientObject = useSelector((state: IRootState) => state.dashboard.selectedClientObject) as INameCard;
  const { onClose: closeBlue, selectedClient, sessions } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [blueDotDetails, setBlueDotDetails] = useState<IUITaskDB[]>([]);
  const allUserRoles = useSelector((state: IRootState) => state.dashboard.allUserRoles);
  const { fetchUserName } = useFetchUserName();
  const [, setSendDisableState] = useAtom(ChatInputState.inputSendButtonDisabledAtom);

  useEffect(() => {
    setIsLoading(true);
    getBlueDotsOfAUser(
      panelId,
      sessions,
      selectedClientObject,
      getStaffId(props.activeTab, props.reporteesData, selectedClientObject),
      getActualReportingRoleId(props.activeTab, props.reporteesData, selectedClientObject),
      allUserRoles,
      fetchUserName
    )
      .then(async (res) => {
        setBlueDotDetails(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useListenToChatSendEvent(async () => {
    if (!selectedBlue?.description) return false;
    setOpenConfirm(true);
    return false;
  }, [selectedBlue?.description]);

  useEffect(() => {
    setSendDisableState(!selectedBlue?.description);
  }, [selectedBlue?.description]);

  return (
    <div>
      {!openConfirm && (
        <ChatFlyoutDrawer
          header={'Closing @blue'}
          onClose={() => {
            closeBlue();
          }}
          children={
            isLoading ? (
              <>
                <MUISkeleton height={'60px'} />
                <MUISkeleton height={'120px'} />
              </>
            ) : (
              <div>
                <div className={`${classes.marginBottom}`}>
                  <div className={classes.tagPersonsLlist}>
                    {blueDotDetails?.map((value) => (
                      <div
                        className={classes.blueDotItem}
                        onClick={(_) => {
                          setSelectedBlue(value);
                        }}
                      >
                        <div className={`${classes.radioGrid}`}>
                          <div>
                            <Radio className={classes.radioStyle} checked={value.bluedotId === selectedBlue?.bluedotId} />
                          </div>
                          <div>
                            <div className={`${classes.margin4B} ${classes.blueDiv}`}>
                              <span className={`${commonClasses.body17Medium} ${classes.blueSpan}`}>{`@blue `}</span>
                              <span className={`${commonClasses.body17Regular} ${classes.break}`}>{`${value.description}`}</span>
                            </div>
                            <div>
                              <div>
                                <span
                                  className={`${classes.userNameSpan} ${commonClasses.caption12Regular}`}
                                >{`@${value.displayName}`}</span>
                              </div>
                              <div>
                                <span className={`${classes.dateSpan} ${commonClasses.caption12Regular}`}>
                                  {`${moment(new Date(value.createdOn)).format('DD/MM/YYYY, hh:mm A')}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className={classes.messageInputContainer}>
                  <div className={classes.firstContainer}>
                    <MessagesUsers />
                  </div>
                  <div className={`${classes.middleContainer} ${classes.padding}`}>
                    <span className={`${commonClasses.body15Regular} ${classes.textInMessage}`}>{'@close'}</span>
                  </div>
                  <div className={classes.lastContainer}>
                    <MUIButton
                      size="small"
                      variant="contained"
                      disabled={!selectedBlue?.description}
                      className={selectedBlue?.description ? classes.sendButton : classes.disabledSendIcon}
                      onClick={() => {
                        setOpenConfirm(true);
                      }}
                    >
                      <SendIcon />
                    </MUIButton>
                  </div> 
                </div> */}
              </div>
            )
          }
        />
      )}
      {openConfirm && (
        <ChatFlyoutDrawer
          open={openConfirm}
          header={'Closing @blue'}
          onClose={() => {
            setOpenConfirm(false);
          }}
          absoluteBottom
        >
          <>
            <div>
              <div className={`${commonClasses.body15Medium} ${classes.mainHeading}`}>{`${selectedBlue.description}`}</div>
            </div>
            <PanelFooter
              customStyle={classes.prescriptionFooter}
              leftButtonText={'No'}
              righButtontText={'Yes'}
              handleLeftButton={() => {
                setOpenConfirm(false);
              }}
              handleRightButton={async () => {
                let payload = {
                  EventName: 'assign-bluedot',
                  userId: selectedClient.client_id,
                  tenantId: selectedClient.tenant_id,
                  roleId: selectedBlue.ownerRoleId,
                  url: import.meta.env.VITE_EVENT_API,
                  token: sessions.id_token,
                  method: 'POST',
                  description: selectedBlue.description,
                  headers: {},
                  endTime: selectedBlue.endTime,
                  bluedotId: selectedBlue.bluedotId,
                  hierarchyId: selectedBlue.hierarchyId,
                  staffId: selectedBlue.ownerId,
                  updatedBy: sessions.user.id,
                  createdBy: selectedBlue.createdBy,
                  action: 'RESOLVED',
                  reasonToClose: '',
                  messageId: selectedBlue.newestMessageId,
                  isTransferred: selectedBlue.isTransferred,
                  previousOwners: selectedBlue?.isTransferred === true ? selectedBlue?.previousOwners : [],
                  reasonToTransfer: selectedBlue?.isTransferred === true ? selectedBlue?.reasonToTransfer : '',
                  // reasonToClose:blueDotEditInfo?.blueDotInfo?.isTransferred  === true  ? blueDotEditInfo?.blueDotInfo?.reasonToClose : '',
                };
                console.log('Payload', payload);
                const response = await PMS_S3.postData(payload);
                if (!response.Error) {
                  setOpenConfirm(false);
                  closeBlue();
                }
              }}
              btnStyle={classes.btnHeight}
            />
          </>
        </ChatFlyoutDrawer>
      )}
    </div>
  );
}

export default memo(BlueDotClosePopUp);
