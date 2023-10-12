export interface IProps {
  reportee:string,
  role?:string,
  client?:string,
  isDeleted?:boolean;
  deleteReportee?:Function,
}