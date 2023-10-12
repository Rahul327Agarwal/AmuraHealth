export interface IRoleAndTenantProps {
  tenantsWithRoles: ICardData[];
  setSelectedRoleCards: React.Dispatch<React.SetStateAction<ICheckedCard>>;
  selectedRoleCards: ICheckedCard;
}

export type TPrivacy = 'Default' | 'Public' | 'Private' | 'Invisible';

export interface ICheckedCard {
  [tenant: string]: string[];
}

export interface ICardData {
  tenantId: string;
  roleIds: string[];
}

export interface IPrivayCard {
  [tenant: string]: TPrivacy[];
}
