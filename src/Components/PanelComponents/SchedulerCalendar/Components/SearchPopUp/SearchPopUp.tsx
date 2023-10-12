import { useSelector } from 'react-redux';
import { useStyles } from './SearchPopUp.styles';
import { IProps } from './SearchPopUp.types';
import SearchPopUpRow from './SearchPopUpRow';
import { IRootState } from '../../../../../DisplayFramework/State/store';

const SearchPopUp = (props: IProps) => {
  const { seachedData, setAction, setshowPopup, sessions, thirdPartyUserId } = props;
  const { classes } = useStyles();
  const rolesFromRedux = useSelector((state: IRootState) => state.dashboard.allUserRoles);
  const userId = thirdPartyUserId ? thirdPartyUserId : sessions?.user?.id ;
  const onEventClick = (e, event) => {
    e.stopPropagation();
    setAction({ screen: 'EVENT_DETAILS', payload: event });
    setshowPopup(false);
  };

  return (
    <div className={classes.container}>
      {seachedData?.map((data) => {
        const participants = data?.tenantParticipants?.find((item) => item?.userId == userId) || {};
        const roleId = data?.organizer === userId ? data?.organizerRoleId || '' : participants?.roleId || '';
        const roleName = rolesFromRedux.find((role) => role.roleId === roleId)?.roleName || '';
        return (
          <SearchPopUpRow
            key={data?.eventId}
            searchData={data}
            onEventClick={(e) => onEventClick(e, data)}
            roleName={roleName || ''}
          />
        );
      })}
    </div>
  );
};

export default SearchPopUp;
