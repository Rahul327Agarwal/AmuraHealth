export const doesUserHaveClickAccess = (
  accessPermissions: any,
  parentComponentName: string,
  childComponentName: string
): boolean => {
  if (!accessPermissions) return false;
  if (!accessPermissions[parentComponentName]) return false;
  if (!accessPermissions[parentComponentName][childComponentName]) return false;
  if (accessPermissions[parentComponentName][childComponentName] === 'Disabled') return false;
  return accessPermissions[parentComponentName][childComponentName] === 'Clickable';
};

export const doesAnyRoleHaveClickAccess = (
  roles: Array<string>,
  accessPermissions: any,
  parentComponentName: string,
  childComponentName: string
): boolean => {
  if (
    roles.some((role) => {
      if (!accessPermissions) return false;
      if (!accessPermissions[role]) return false;
      if (!accessPermissions[role][parentComponentName]) return false;
      if (!accessPermissions[role][parentComponentName][childComponentName]) return false;
      if (accessPermissions[role][parentComponentName][childComponentName] === 'Disabled') return false;
      return accessPermissions[role][parentComponentName][childComponentName] === 'Clickable';
    })
  ) {
    return true;
  }
  return false;
};

export const doesUserHaveViewAccess = (
  accessPermissions: any,
  parentComponentName: string,
  childComponentName: string
): boolean => {
  if (!accessPermissions) return false;
  if (!accessPermissions[parentComponentName]) return false;
  if (!accessPermissions[parentComponentName][childComponentName]) return false;
  if (accessPermissions[parentComponentName][childComponentName] === 'Hidden') return false;
  return (
    accessPermissions[parentComponentName][childComponentName] === 'Viewable' ||
    accessPermissions[parentComponentName][childComponentName] === 'Clickable'
  );
};

export const doesUserHaveDisabledAccess = (
  accessPermissions: any,
  parentComponentName: string,
  childComponentName: string
): boolean => {
  if (!accessPermissions) return false;
  if (!accessPermissions[parentComponentName]) return false;
  if (!accessPermissions[parentComponentName][childComponentName]) return false;
  return accessPermissions[parentComponentName][childComponentName] === 'Disabled';
};
