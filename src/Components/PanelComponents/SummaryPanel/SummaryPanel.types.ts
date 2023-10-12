export interface IProps {
  injectComponent: any;
  patientId: string;
  topicSnippetClick: (value: string) => void;
  registerEvent: any;
  unRegisterEvent: any;
  selectedClient: any;
  sessions: any;
  type?: string;
  botData?: any;
  setSelectedPanelName: Function;
  selectedPanelName: string;
}
export interface ProfileProps {
  userId?: any;
  data?: any;
  onProfileHeaderClick?: () => void;
}

export interface PackageProps {
  versionNumber: any;
  versionText: any;
  numberOfDayLeft: any;
  batchTextOne: any;
  batchTextTwo: any;
}
export interface ReadMoreProps {
  text: any;
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

export interface ISnippet {
  Snippet: string;
}
export interface ITopics {
  Roles: any;
  Conditions: ISnippet;
  Allergens: ISnippet;
  FoodSensitivities: ISnippet;
  Biomarkers: ISnippet;
  Symptoms: ISnippet;
  HealthHistory: ISnippet;
  Protocol: ISnippet;
  PausedConditions: ISnippet;
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
  // Dashboard: IDashboard;
  Synopsis: ISynopsis;
  Topics: ITopics;
}

export interface IDashboard {
  Rating: string;
  ProfilePicture: string;
  KPI: string;
}

export interface ISynopsis {
  UserName: string;
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
  TimeZone?: string;
}

const emptyPatient = (): IPatient => ({
  ID: '',
  // Dashboard: {
  //   Rating: '',
  //   ProfilePicture: '',
  //   KPI: '',
  // },
  Synopsis: {
    UserName: '',
    Name: '',
    NickName: '',
    Gender: '',
    Age: '',
    Cuisine: '',
    Location: '',
    Objective: '',
    Nationality: '',
    FoodPreference: '',
    Salutation: '',
    DietPreference: '',
    HealthType: '',
    ResidingCountry: '',
    Mobile: '',
    TimeZone: '',
  },
  Topics: {
    Conditions: { Snippet: '' },
    Allergens: { Snippet: '' },
    FoodSensitivities: { Snippet: '' },
    Biomarkers: { Snippet: '' },
    Symptoms: { Snippet: '' },
    HealthHistory: { Snippet: '' },
    Protocol: { Snippet: '' },
    PausedConditions: { Snippet: '' },
    Roles: { Snippet: '' },
  },
});
export const EmptyPatient = emptyPatient();
