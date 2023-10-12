import { INameCard } from '../../../PanelComponents/MyListPanel/MyList/MyList.types';

export interface IProps {
  onClose: Function;
  selectedCard: INameCard;
  sessions: any;
  // todo: anchor type should be defined
  anchorEl: any;
  setIsLoadingStatusChangePopup: Function;
  clientStatus: string | false;
}

export interface IEdgeColor {
  action: any[];
  color: string;
  description: string;
  isDefault?: boolean;
  label: string;
  value: string;
}
