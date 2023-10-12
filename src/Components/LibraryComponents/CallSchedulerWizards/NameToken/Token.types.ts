export interface IProps {
  userId?: any;
  label?: string; //salution firstname lastname
  roleId?: any;
  roleName?: any;
  isDot?: boolean;
  dotColor?: string;
  fullName?: string; // firstname lastname
  onDelete?: React.MouseEventHandler;
  tenant?:any;
  statusIcon?:React.ReactElement;
}
