import { IReporteesCountDetails } from '../ReporteesListViewHome.types';

export interface IHeaderAccordionProps {
  allowSelect: boolean;
  countDetails: IReporteesCountDetails;
  roleId: string;
  tenantName: string;
  tenantIcon: React.ReactNode;
  isOpen: boolean;
  onOpenStatusChange: () => void;
  onSelectAllRoles: () => void;
  isAllSelected: boolean;
  checkboxIcon: React.ReactNode;
}
