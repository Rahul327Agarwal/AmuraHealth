export interface IProps {
  cardData?: any;
  injectComponent?: any;
  selectedClient?: any;
  sessions: any;
  childEventTrigger: Function;
  registerEvent: any;
  unRegisterEvent: any;
  panel: any;
}
export interface TopicListProps {
  data: any;
  itemClicked: (value: string) => void;
  patientId: string;
  isForStaffAssignment?: boolean;
  selectedClient?: any;
}

export interface TopicCardProps {
  icon?: React.ReactElement;
  heading?: any;
  description?: any;
  handleClick?: any;
  selected?: any;
}