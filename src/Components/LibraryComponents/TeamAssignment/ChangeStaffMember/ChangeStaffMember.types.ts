import { IProps, StaffCard } from '../CareTeam.types';

export interface ChangeStaffMemberProps extends IProps {
  cameFrom?: string;
  selectedRole: { value: string; label: string };
  setIsLoading: Function;
  isLoading: boolean;
  allProfiles: Array<StaffCard>;
}
