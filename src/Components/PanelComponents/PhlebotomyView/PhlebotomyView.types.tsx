export interface IProps{
  titleId:number;
  titleName:string;
  price:number;
  message:string;
  submessage:string;
  injectComponent:any;
  url:string;
  placeholder?: string;
  label?: string;
  bioData:Array<string>;
}