import { ReactElement } from 'react';
import { IRegisterEvent, IUnRegisterEvent } from '../../../AppSync/AppSync.types';
import { ISelectedClient, ISession } from '../../../Common/Common.types';

export interface IProps {
  injectComponent: ReactElement;
  patientId: string;
  topicSnippetClick: (value: string) => void;
  registerEvent: IRegisterEvent;
  unRegisterEvent: IUnRegisterEvent;
  selectedClient: ISelectedClient;
  sessions: ISession;
  type?: string;
  setSelectedPanelName: Function;
  selectedPanelName: string;
}


export interface TopicListProps {
  data: any;
  itemClicked: (value: string) => void;
  patientId: string;
  isForStaffAssignment?: boolean;
  selectedClient?: any;
  setSelectedPanelName: Function;
  selectedPanelName: string;
}

export interface TopicCardProps {
  icon?: React.ReactElement;
  heading?: any;
  description?: any;
  handleClick?: any;
  selected?: any;
  withoutIcon?: any;
}

export interface ISummaryData {
  description: string;
  createdOn: string;
  createdBy: string;
  updatedOn: string;
  updatedBy: string;
  roleId: string;
  staffId: string;
  tenantId: string;
  cardId: string;
  cardType: string;
  totalCards: string;
  snippets: ISnippet[];
  userDeatails?: any;
  Synopsis?: any;
}
export interface ITopics {
  readyToAssign: ISnippet;
  readyToMove: ISnippet;
  assignedCards: ISnippet;
  failedCards: ISnippet;
}
export interface ISnippet {
  title: string;
  description: string;
  id: string;
}

export interface synopsisItemProps {
  data?: any;
  icon?: React.ReactElement;
  heading?: String;
}

export interface synopsisListprops {
  data?: any;
}

export interface IPatient {
  ID: string;
  Dashboard: IDashboard;
  Synopsis: ISynopsis;
  Topics: ITopics;
}

export interface IDashboard {
  Rating: string;
  ProfilePicture: string;
  KPI: string;
}

export interface ISynopsis {
  Name: string;
  NickName: string;
  Gender: string;
  Age: string;
  Cuisine: string;
  Location: string;
  Objective: string;
  Nationality: string;
  FoodPreference: string;
  Salutation: string;
  DietPreference: string;
  HealthType: string;
  ResidingCountry: string;
  Mobile: string;
}
