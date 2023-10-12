export interface IProps {
  roleName: string;
  roleId: string;
  reportingTo: string;
  reportees: string;
  is_active: boolean;
  handleEdit: (roleId: string) => void;
  handleActivation: (roleId: string, value: boolean) => void;
}
