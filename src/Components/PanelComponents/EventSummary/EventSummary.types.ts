import { ISession } from "../../../Common/Common.types";
import { ICard } from "../MyListPanel/MyList/MyList.types";

export interface IProps {
    topicSnippetClick: any;
    patientId: string;
    injectComponent: any;
    sessions: ISession;
    selectedClient: ICard;
    type: string;
    selectedPanelName: string;
    setSelectedPanelName: any;
    isAFB?:boolean;
    afbData?:any;
    isReporteeEvent?:boolean;
  }