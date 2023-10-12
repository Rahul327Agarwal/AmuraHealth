import { ISession } from '../../../../Common/Common.types';
import { IReporteesTabProps } from '../../ReporteesListView/ReporteesTab/ReporteesTab.types';
import { ITab } from '../ManageTab/ManageTab.types';
import { ICard } from '../MyList/MyList.types';

export interface MyListCardProps {
  cardData: ICard;
  setSelectedCard: (card: ICard) => void;
  //   openClient: () => void;
  edgeColor?: string;
  isClientSelected?: boolean;
  setAction?: (action: string) => void;
  isExtend?: boolean;
  sessions?: ISession;
  activeTab: any;
}
