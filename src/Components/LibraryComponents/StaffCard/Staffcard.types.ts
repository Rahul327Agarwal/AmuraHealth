export interface IProps {
  profileName: string;
  salutation?: string;
  userProfile: any;
  ratingValue: string;
  lastSeen: string;
  injectConponentEnd: any;
  tenantId?: string;
  userId: string;
  variant?: 'staffCard' | 'teamCard' | 'card';
  width?: number | string;
}
