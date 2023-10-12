export interface IProfileProps {
  injectComponent: any;
  patientId: string;
  topicSnippetClick: (value: string) => void;
  registerEvent: any;
  unRegisterEvent: any;
  selectedClient: any;
  sessions: any;
  setChangeInLanguage: Function;
  clickedFrom: string;
  childEventTrigger: any;
  panel?: any;
}

export interface ProfileHeaderProps {
  selectedClient: any;
  sessions: any;
  myPatientId: string;
  profileImage: string;
  profileEditable: boolean;
  setProfileEditable: Function;
  name: string;
  username: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  setProfileImage?: Function;
}
export interface PersonalProps {
  profileEditable: boolean;
  personalState: IDefaultPersonalTypes;
  setPersonalState: Function;
  personalError: IDefaultPersonalTypes;
  citiesOption: Array<any>;
  countriesOption: Array<any>;
  timezoneOption: Array<any>;
  setPersonalError: Function;
}

export interface IDefaultPersonalTypes {
  Salutation: string;
  FirstName: string;
  LastName: string;
  Gender: string;
  isModifiedGender: boolean;
  isUserTypedGender: boolean;
  MedicallyModifiedGender: string;
  userTypedGender: string;
  DateOfBirth: any;

  Nationality: string;
  CurrentResidence: string;
  City: string;
  Country: string;
  CountryCode: string;
  TimeZone: string;
  TimeZoneName: string;
  PreferredLanguages: Array<any>;
}

export interface FoodAndHealthType {
  FoodRestriction?: string;
  Cuisine?: Array<any>;
  Objective?: string;
}
export interface AccountDetailsType {
  NickName?: string;
  EMail?: string;
  Mobile?: string;
  whatsAppNumber?: string;
  Password?: any;
  referredBy?: String;
  referredPersonRelation?: String;
}
export interface FoodAndHealthProps {
  foodAndHealtGlobalState?: FoodAndHealthType;
  selectedClient: any;
  sessions: any;
  profileEditable: boolean;
  setOpenConfirmDrawer: Function;
  healthAndFoodState?: any;
  setHealthAndFoodState?: Function;
}
export interface AccountDetailshProps {
  profileEditable: boolean;
  setOpenConfirmDrawer: Function;
  accountDetailsState?: any;
  setAccountDetailsState?: Function;
  accountDetailsError?: AccountDetailsType;
  showRefer?: boolean;
  setAccountDetailsError?: Function;
}
export interface PersonalAndFoodTypes extends IDefaultPersonalTypes, FoodAndHealthType, AccountDetailsType {}

export type profileTabsType = 'Personal' | 'Food & Health' | 'Account details';
export type actionType = 'HOME' | 'EDIT_HISTORY';
