export interface IProps {
  sessions: any;
  setAction: Function;
  patientId: string;
  selectedClient: any;
  editCardData: any;
}
export type EducationTypes = {
  country: string;
  qualification: string;
  qualificationId: string;
  university: string;
  universityId: string;
  universityAddress: string;
  joiningDate: any;
  internshipDate: any;
  attachments: string[];
  speciality: string;
};

export type EducationErrorTypes = {
  country: string;
  qualification: string;
  qualificationId: string;
  university: string;
  universityId: string;
  universityAddress: string;
  joiningDate: string;
  internshipDate: string;
  attachments: string[];
  speciality: string;
};

export interface Qualification {
  label: string;
  value: string;
}

export interface ICountries{
  label: string;
  value: string;
}