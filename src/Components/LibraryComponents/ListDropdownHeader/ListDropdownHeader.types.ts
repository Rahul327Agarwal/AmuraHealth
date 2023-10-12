import { actionConfig } from "../MyListHeader/MyListHeader.types";

// export interface ListDropdownHeaderProps {
//   selectedDropdown: ListHeaderDropdownTypes;
//   setSelectedDropdown: Function;
//   handleSearch: Function;
//   headerActionOptions: Array<actionConfig>;
//   customStyle?: string;
//   startAdornment?: any;
//   endAdornment?: any;
//   cardAssignType?: TCardAssign;
//   setCardAssignType?: React.Dispatch<React.SetStateAction<TCardAssign>>;
//   handleSearchBack?: () => void;
//   currentSelection?: ListHeaderDropdownTypes;
//   onRefresh?: Function;
//   showRefreshBadge?: boolean;
//   isLoading?: boolean;
//   hideSearch?: boolean;
//   childEventTrigger: Function;
// }

export interface ListDropdownHeaderProps {
  childEventTrigger: any;
  selectedDropdown: ListHeaderDropdownTypes;
  setSelectedDropdown: Function;
  handleSearch?: Function;
  headerActionOptions: Array<actionConfig>;
  customStyle?: string;
  startAdornment?: any;
  endAdornment?: any;
  cardAssignType?: TCardAssign;
  setCardAssignType?: React.Dispatch<React.SetStateAction<TCardAssign>>;
  handleSearchBack?: () => void;
  currentSelection?: ListHeaderDropdownTypes;
  onRefresh?: Function;
  showRefreshBadge?: boolean;
  isLoading?: boolean;
  hideSearch?: boolean;
}

export interface IconWithDotProps {
  Icon: React.ReactElement;
  NotifyIcon?: React.ReactElement;
  isNotifyIcon?: boolean;
  customStyle?: string;
}

export type ListHeaderDropdownTypes =
  | "people"
  | "configuration"
  | "posts"
  | "postsCollections"
  | "distributions"
  | "events"
  | "reportees";

export type TCardAssign =
  | null
  | "Select cards to move"
  | "Select cards to reassign by card"
  | "Select cards to reassign by batches";
