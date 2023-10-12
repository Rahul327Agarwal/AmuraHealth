import { InvisibleIcon, MinusIcon, PrivateIcon, PublicIcon } from './RoleAndTenant.svg';
import { ICardData, TPrivacy } from './RoleAndTenant.types';

export const PRIVACY: Record<TPrivacy, TPrivacy> = {
  Public: 'Public',
  Private: 'Private',
  Invisible: 'Invisible',
  Default: 'Default',
};

export const PRIVACY_OPTIONS: { label: string; value: TPrivacy; icon: any }[] = [
  { label: PRIVACY.Public, value: PRIVACY.Public, icon: PublicIcon },
  { label: PRIVACY.Private, value: PRIVACY.Private, icon: PrivateIcon },
  { label: PRIVACY.Invisible, value: PRIVACY.Invisible, icon: InvisibleIcon },
];

export const PRIVACY_ICONS: Record<TPrivacy, any> = {
  Public: PublicIcon,
  Private: PrivateIcon,
  Invisible: InvisibleIcon,
  Default: MinusIcon,
};

export const MAIN_DATA = [
  { tenantId: 'Amura Health', roleIds: ['Doctor', 'Senior Doctor'] },
  { tenantId: 'United Health', roleIds: ['Doctor', 'Senior Doctor', 'Health Coach'] },
];

export const convertTenantsWithRolesObject = (tenantsWithRolesObj: any): ICardData[] => {
  const converData = tenantsWithRolesObj.map((each) => ({
    tenantId: each.tenantId,
    roleIds: each.roles,
  }));
  return converData || [];
};
