import { IFilterState } from './CalendarFilter.types';

export const checkFiltersApplied = (defaultFilters: IFilterState, currFilters: IFilterState) => {
  if (defaultFilters?.tenantName !== currFilters?.tenantName) return true;
  if (defaultFilters?.callType !== currFilters?.callType) return true;
  if (defaultFilters?.startDate !== currFilters?.startDate) return true;
  if (defaultFilters?.endDate !== currFilters?.endDate) return true;
  if (defaultFilters?.participants?.length !== currFilters?.participants?.length) return true;
  return false;
};

export const DEFAULT_FILTERS: IFilterState = {
  tenantName: 'amura',
  keyword: '',
  participants: [],
  callType: '',
  startDate: null,
  endDate: null,
};
