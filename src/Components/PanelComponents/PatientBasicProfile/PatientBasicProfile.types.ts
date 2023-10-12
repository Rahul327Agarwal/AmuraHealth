import React from 'react';

export interface IPatientBasicProfile {
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
  setAction?: React.Dispatch<React.SetStateAction<IViewScreens>>;
}

export interface IclientData {
  UserId: string;
  Salutation: string;
  FirstName: string;
  LastName: string;
  City: string;
  Country: string;
  CountryCode: string;
  TimeZone: string;
  TimeZoneName: string;
  TenantId: string;
  UserName: string;
  height: string; //New Keys
  weight: string; //New Keys
  DateOfBirth: string;
  Gender: string;
  isModifiedGender: boolean;
  MedicallyModifiedGender: string;
  isUserTypedGender: boolean;
  userTypedGender: string;
  FoodRestriction: string;
  Cuisine: Array<string>;
  PreferredLanguages: Array<string>;
  PreferredLanguagesNames: Array<string>;
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
  Notes: string;
  Objective: string;
  ConditionsInterested: string;
  referredBy: string;
  referredPersonRelation: string;
  DietPreference: string;
}

export type IViewScreens = 'NORMAL_VIEW' | 'EDIT_VIEW';
