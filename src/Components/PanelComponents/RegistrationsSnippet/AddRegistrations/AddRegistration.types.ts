export interface IProps {
  isEdit?: boolean;
  patientId?: string;
  editCardregistrationId?: string;
  sessions: any;
}

export interface ESQueryResponse<T> {
  _index: string;
  _id: string;
  _score: number;
  _source: T;
}

export interface ProfessionalBody {
  professionalBodyId: string;
  professionalBody: string;
  country: string;
}

export interface EducationalBody {
  qualification: string;
  qualificationId: string;
  specialties: string[];
}

export interface ICountries {
  label: string;
  value: string;
}
