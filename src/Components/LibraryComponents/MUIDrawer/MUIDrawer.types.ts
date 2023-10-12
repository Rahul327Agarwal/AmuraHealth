export interface IProps {
  open?: boolean;
  anchor: 'top' | 'bottom';
  headerTitle?: any;
  handleClose: any;
  drawerPadding?: string;
  children: any;
  disableAutoClose?: boolean;
  handleOpen?: Function;
  noHeader?: boolean;
  disableCross?: boolean;
  changebgColor?: boolean;
  maxHeight?: string;
  className?: any;
  closeNestedFlyout?: Function;
}
