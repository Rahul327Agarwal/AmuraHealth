export interface IRegisterWithoutOTPStaff {
  FirstName: string;
  LastName: string;
  EmailId: string;
  PhoneNumber: string;
  isStaff?: any;
  Country: string;
  City: string;
  TimeZone: string;
  TimeZoneName:string;
  State: string;
  PreferredLanguages: Array<string>;
  Nationality:string;
  dob:any;
  gender:any;
  isModifiedGender:any;
  medicallyModifiedGender:any;
  isUserTypedGender:any;
  userTypedGender:any;
}
