import { useDispatch } from 'react-redux';
import {
  resetSelectedClientObject,
  setAllRoles,
  setAllTenants,
  setClientData,
} from '../../../../DisplayFramework/State/Slices/DashboardSlice';
import MyListHome from '../../MyListPanel/MyListHome';
import { IReporteesMyList } from '../ReporteesListViewHome.types';
import { getTimestamp } from '../ReporteesListViewHome.function';

export default function ReporteesMyList(props: IReporteesMyList) {
  const { selectedRoleId, selectedStaffId, setAction, reportingRoleId, reportingStaffId, selectedStaffName, reporteesTabData } =
    props;
  const dispatch = useDispatch();

  const handleBackToReportees = () => {
    setAction({ screen: 'REPORTEES', timestamp: getTimestamp() });
    dispatch(resetSelectedClientObject());
    dispatch(setClientData([]));
    dispatch(setClientData({ cards: [], roles: [] }));
    dispatch(setAllTenants([]));
    dispatch(setAllRoles([].join(', ')));
    // childEventTrigger('MyList', 'MyList', 'onMyReporteesBack', {});
  };
  return (
    <MyListHome
      {...props}
      reporteesTabData={reporteesTabData}
      reporteesData={{
        staffName: selectedStaffName,
        staffId: selectedStaffId,
        roleId: selectedRoleId,
        reportingStaffId: reportingStaffId,
        reportingRoleId: reportingRoleId,
        handleBackToReportees: handleBackToReportees,
      }}
    />
  );
}
