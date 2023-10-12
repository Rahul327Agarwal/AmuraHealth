import { ThreeDotOptions } from '../../../LibraryComponents/ThreeDotMenu/ThreeDotMenu.types';
import { IReporteesTab } from '../ReporteesListViewHome.types';

export interface IReporteesTabProps {
  selectedTab: IReporteesTab | null;
  reporteesTabs: IReporteesTab[];
  onSelecteTab: (data: IReporteesTab) => void;
  tabThreeDotOptions?: Array<ThreeDotOptions>;
  onTabThreeDotChange?: (data: string) => void;
}

export interface ITabTokenProps {
  label: string;
  active: boolean;
  progress: number;
  isLoading: boolean;
}
