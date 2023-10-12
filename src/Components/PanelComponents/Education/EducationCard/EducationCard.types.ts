export interface ICardData {
  qualification: string;
  attachments: string[];
  joiningDate: Date | string;
  internshipDate: Date | string;
  university: string;
  universityAddress: string;
  country: string;
  speciality?:string;
}
export interface IProps {
  data: ICardData;
  handleEdit: Function;
  sessions?: any;
}
