import { IEventCard, IEventCardKeys, IMoveCard, IUserBluedot } from '../../PanelComponents/MyListPanel/MyList/MyList.types';

export interface IProps {
  cardData: IEventCard;
  isExtend?: boolean;
  isBgWhite?: boolean;
  noThreeDot?: boolean;
  customStyle?: string;
  isBorderRadius?: boolean;
  isSelected?: boolean;
  handleSelect?: Function;
  openClient?: Function;
  setSelectedCard?: Function;
  setAction?: Function;
  isClientSelected?: boolean;
  message?: IMessage;
  edgeColor?: string;
  showBlueDot?: boolean;
  bluedot?: any;
  isEmergency?: any;
  sessions?:any
}

export interface IMessage {
  message: string;
  receivedTime: string;
  isUnread: string;
}

export const eventData = [
  {
        id: '0a7ac449-0d74-463d-a75f-4dc5823c2850~ad465efa-2687-409d-a2a6-1268bcf99607~382925c1-c931-498b-ab58-d6b74eb4e963',
        createdOn: '2023-05-29T13:42:36.541Z',
        title: '7pm call - regular event',
        searchString: '',
        tenantId: 'amura',
        roleId: 'L1 - Diagnostic Doctor',
        staffId: '0a7ac449-0d74-463d-a75f-4dc5823c2850',
        type: 'eventCard',
        additionalKeys: {
          title: '7pm call - regular event',
          description: 'Manopriya: Lorem ipsum i Lorem ipsum i',
          others: '',
          eventType: 'events',
          callType: 'video',
          eventDate: '2023-06-06T08:27:40.391Z',
          toDate: '2023-06-06T10:27:40.391Z',
          fromTime: '2023-06-06T09:27:40.391Z',
          toTime: '2023-06-06T10:27:40.391Z',
          duration: 15,
          tenantId: 'amura',
          parentId: 'ad465efa-2687-409d-a2a6-1268bcf99607',
          eventId: '382925c1-c931-498b-ab58-d6b74eb4e963',
          updatedBy: '0a7ac449-0d74-463d-a75f-4dc5823c2850',
          hasBlueDots: true,
          bluedots: {
            lastExpiredBluedot: '2023-05-29T13:30:00.000Z',
            blueToExpireNext: '2023-05-29T13:30:00.000Z',
            blueDotsCount: 0,
            blackDotsCount: 0,
          },
        },
      },
      {
        id: '0a7ac449-0d74-463d-a75f-4dc5823c2850~ad465efa-2687-409d-a2a6-1268bcf99607~382925c1-c931-498b-ab58-d6b74eb4e963',
        createdOn: '2023-05-29T13:42:36.541Z',
        title: '10pm call - regular event',
        searchString: '',
        tenantId: 'amura',
        roleId: 'L1 - Diagnostic Doctor',
        staffId: '0a7ac449-0d74-463d-a75f-4dc5823c2850',
        type: 'eventCard',
        additionalKeys: {
          title: '10pm call - regular event',
          description: 'Manopriya: Lorem ipsum i Lorem ipsum i',
          others: '',
          eventType: 'events',
          callType: 'video',
          eventDate: '2023-06-06T08:27:40.391Z',
          toDate: '2023-06-06T10:27:40.391Z',
          fromTime: '2023-06-06T09:27:40.391Z',
          toTime: '2023-06-06T10:27:40.391Z',
          duration: 15,
          tenantId: 'amura',
          parentId: 'ad465efa-2687-409d-a2a6-1268bcf99607',
          eventId: '382925c1-c931-498b-ab58-d6b74eb4e963',
          updatedBy: '0a7ac449-0d74-463d-a75f-4dc5823c2850',
          hasBlueDots: true,
          bluedots: {
            lastExpiredBluedot: '2023-05-29T13:30:00.000Z',
            blueToExpireNext: '2023-05-29T13:30:00.000Z',
            blueDotsCount: 0,
            blackDotsCount: 0,
          },
        },
      },,
];
