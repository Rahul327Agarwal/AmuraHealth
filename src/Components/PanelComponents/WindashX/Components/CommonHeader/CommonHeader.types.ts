import { IWindow } from '../../Windash.types';

export interface IProps {
  window: IWindow;
  activeScreens: IWindow[];
  minimizeEvent: Function;
  maximizeEvent: Function;
  closeEvent: Function;
  maximizeDefault: Function;
  windowRef: any;
}
