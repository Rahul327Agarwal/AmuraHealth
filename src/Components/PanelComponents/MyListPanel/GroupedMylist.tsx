import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { isArray } from 'lodash';
import { setRoleToClient } from '../../../DisplayFramework/State/Slices/AccessPermissionsSlice';
import { setClientId, setMyTeamData, setSelectedClientObject } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import NameCard from '../../LibraryComponents/NameCard/NameCard';
import AccordionHeader from './AccordionHeader';
import { belongToGCTeam, belongToTATeam, getStatusOfClient } from './MyList/MyList.function';
import { INameCard } from './MyList/MyList.types';
import MyListCard from './CardComponent/MyListCard';
import { getRoleId } from './CardComponent/MylistCard.functions';

export const MyAccordionView = (
  props: any,
  data: { [key: string]: Array<INameCard> },
  dispatch,
  selectedClientObject,
  myRolesAcrossAllTenants,
  setAction,
  setSelectedCard: Function,
  edgeColors: Array<any>,
  myTeamData: any,
  isExtend: boolean,
  accordiansState,
  setAccordiansState,
  showProgress: boolean
) => {
  let selectedClient = selectedClientObject;
  let list = [];

  Object.keys(data).forEach((statusKey) => {
    list.push(
      <AccordionHeader
        groupedName={statusKey}
        listCount={`${data[statusKey].length <= 9 ? '0' : ''}${data[statusKey].length}`}
        open={accordiansState[statusKey]}
        handleOnClick={() => {
          if (showProgress) return;
          if (data[statusKey].length) {
            let temp = JSON.parse(JSON.stringify(accordiansState));
            setAccordiansState({ ...temp, [statusKey]: !temp[statusKey] });
          }
        }}
      />
    );
    if (accordiansState[statusKey]) {
      data[statusKey].forEach((cardData: INameCard, index) => {
        const currentCardData = cardData;
        const clientStatus = getStatusOfClient(
          props?.reporteesData?.roleId ? { ...cardData, roleId: props.reporteesData.roleId } : cardData
        );
        const edgeColorObject = edgeColors[`${currentCardData.tenantId}~${currentCardData.roleId}`]
          ? edgeColors[`${currentCardData.tenantId}~${currentCardData.roleId}`]['edgeColor']?.find(
              (data) => data.value === clientStatus
            )
          : null;
        const colorIndex = edgeColorObject?.color.lastIndexOf('#');
        const color = edgeColorObject?.color?.slice(colorIndex).split(' ')[0];
        const currentCardRole = getRoleId(props?.reporteesTabData?.selectedTab, props?.reporteesData, currentCardData);
        const isClientSelected =
          currentCardData.id === selectedClientObject?.id &&
          currentCardData.tenantId === selectedClientObject?.tenantId &&
          currentCardRole === selectedClientObject?.roleId;

        list.push(
          <div key={index} style={{ transition: 'all 0.4s ease-in-out 0s' }}>
            <MyListCard
              activeTab={props?.reporteesTabData?.selectedTab}
              setAction={setAction as any}
              isExtend={true}
              setSelectedCard={setSelectedCard as any}
              cardData={{ ...currentCardData }}
              edgeColor={color}
              isClientSelected={isClientSelected}
              childEventTrigger={props.childEventTrigger as any}
              myTeamData={myTeamData}
              reporteesData={props?.reporteesData}
              isReportee={Boolean(props?.reportessListType)}
              sessions={props.sessions}
              onSelectedClientObjectChange={(newObj: any) => {
                dispatch(setSelectedClientObject({ ...newObj, roleId: currentCardRole }));
              }}
            />
          </div>
        );
      });
    }
  });
  return list;
};
