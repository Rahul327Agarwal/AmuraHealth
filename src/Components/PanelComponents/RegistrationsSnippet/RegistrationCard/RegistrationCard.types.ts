export interface IProps {
  cardData: ICardData;
  patientId: string;
  sessions: any;
}
export interface ICardData {
  professionalBody: string;
  professionalBodyId: string;
  country: string;
  regNumber: string;
  validFrom: string;
  validThru: string;
  qualificationInfo: Array<{ value: string; label: string }>;
  attachments: string[];
  registrationId: string;
  createdBy: string;
  createdOn: string;
}
