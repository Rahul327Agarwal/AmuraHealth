import { IProps as EditTabProps, ITab } from '../../MyListPanel/ManageTab/ManageTab.types';
export interface IFilterPanel extends Pick<EditTabProps, 'onSetActiveTab' | 'handleThreeDot'> {
  handleOnBack: () => void;
  sessions: any;
}
