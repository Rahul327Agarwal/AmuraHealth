export interface IProps {
  defaultFilters: IFilterState;
  onFilterChange: (data: IFilterState) => void;
  handleBack: () => void;
}

export interface IFilterState {
  tenantName: string;
  keyword: string;
  participants: Array<{ label: string; value: string; subLabel: string }>;
  callType: string;
  startDate: Date | null;
  endDate: Date | null;
}
