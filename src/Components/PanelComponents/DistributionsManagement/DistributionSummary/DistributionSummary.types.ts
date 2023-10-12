import { UniqueCollectionType } from "../DistributionsMgt.types";

interface IProps {
  injectComponent: any;
  selectedClient: any;
  registerEvent: any;
  unRegisterEvent: any;
}
export interface DistributionSummaryProps extends IProps {
  cardData: ICardData;
}

export interface ICardData {
  collectionType: UniqueCollectionType;
  tenantId: string;
  collectionId: string;
}
