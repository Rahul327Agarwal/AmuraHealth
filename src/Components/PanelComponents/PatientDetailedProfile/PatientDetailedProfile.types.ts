export interface IPatientDetailedProfile {
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
export interface IHeightField {
  cm?: string;
  ft?: string;
  in?: string;
}
export interface IProfileDetailsState {
  heightField?:IHeightField;
  height: string; //New Keys
  // feet:string;
  // inches:string;
  heightUnit: string; //New Keys
  weight: string; //New Keys
  weightUnit: string; //New Keys
  DateOfBirth: Date | null;
  Gender: string;
  isModifiedGender: boolean;
  MedicallyModifiedGender: string;
  isUserTypedGender: boolean;
  userTypedGender: string;

  FoodRestriction: string;
  Cuisine: string[];
  PreferredLanguages: string[];
  PreferredLanguagesNames: string[];
  whatsAppNumber: string;
  ResidingCountry: string;
  Nationality: string;
  EMail: string;

  facebookUrl: string; //New Keys
  twitterUrl: string; //New Keys
  instagramUrl: string; //New Keys
  youtubeUrl: string; //New Keys
  linkedInUrl: string; //New Keys
  emergencyContact: string; //New Keys
  bloodGrp: string; //New Keys
  USDatabase: string; //New Keys

  Mobile: string;
  FirstName?: string;
  LastName?: string;
}

export interface IProfilePayload extends Omit<IProfileDetailsState, 'heightUnit' | 'weightUnit' | 'DateOfBirth'> {
  DateOfBirth: string;
}

export type IModifiedGenderState = Pick<
  IProfileDetailsState,
  'MedicallyModifiedGender' | 'userTypedGender' | 'isUserTypedGender'
>;
export interface IOptions {
  label: string;
  value: any;
  icon?: any;
}

