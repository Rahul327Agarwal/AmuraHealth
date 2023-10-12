import { useSelector } from 'react-redux';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useDFEvent } from '../../../DisplayFramework/Events/DFEvents';
import { setRoleToClient } from '../../../DisplayFramework/State/Slices/AccessPermissionsSlice';
import { useUserSession } from '../../../DisplayFramework/State/Slices/Auth';
import { setClientId, setSelectedClientObject } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import { IRootState, useAppDispatch } from '../../../DisplayFramework/State/store';
import { INameCardKeys } from '../MyListPanel/MyList/MyList.types';
import { useStyles } from './HomePage.styles';
import { LandingPageMaleIcon } from './HomePage.svg';
import { useDeepLinkCustomAction } from '../../../DisplayFramework/DeepLink/DeepLinkProcessor/DeepLinkEventManager';

export default function HomePage() {
  const session = useUserSession();
  const sendEvent = useDFEvent();
  const dispatch = useAppDispatch();
  const loggedInUser = useSelector((state: IRootState) => state.displayFrameWork.loggedInUserInformation);
  const selectedClientObject = useSelector((state: IRootState) => state.dashboard.selectedClientObject);
  const commonClasses = useCommonStyles();
  const { classes } = useStyles();

  const onClick = () => {
    if (selectedClientObject?.id === session.user.id) return;
    dispatch(
      setSelectedClientObject({
        type: 'nameCard',
        additionalKeys: {} as INameCardKeys,
        id: loggedInUser.id,
        createdOn: '',
        title: `${loggedInUser.first_name} ${loggedInUser.last_name}`,
        searchString: '',
        tenantId: 'amura',
        roleId: 'basic-user',
        staffId: loggedInUser.id,
      })
    );
    dispatch(setRoleToClient(`basic-user`));
    dispatch(setClientId(session.user.id));
    sendEvent('onClientSelect', {
      patientId: session.user.id,
      // patientId: currentCardData.additionalKeys?.patientId,
      clientData: {
        client_id: session.user.id,
        client_name: session.user.first_name || '',
        tenant_id: `amura`,
        channelId: '',
      },
      type: 'mylist',
    });
  };

  useDeepLinkCustomAction('homeModuleClick', (data, e, complete) => {
    onClick();
    complete({
      afterMs: 1000,
    });
  });

  return (
    <div className={`${classes.root}`}>
      <LandingPageMaleIcon className={classes.mainSvg} />

      <div
        className={selectedClientObject?.id === session.user.id ? classes.textWrapperDisable : classes.textWrapper}
        onClick={onClick}
      >
        <span className={`${classes.text} ${commonClasses.body15Medium}`}>
          Hi {session.user?.first_name}, Click here to get started!
        </span>
      </div>
    </div>
  );
}
