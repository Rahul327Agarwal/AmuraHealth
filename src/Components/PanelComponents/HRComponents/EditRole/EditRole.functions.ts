export const ROLE_OPTIONS = [
  { label: 'Mid Senior  ', value: 'Mid Senior  ' },
  { label: 'Mid Senior |', value: 'Mid Senior |' },
  { label: 'Mid Senior ||', value: 'Mid Senior ||' },
  { label: 'Mid Senior Physician', value: 'Mid Senior Physician' },
  { label: 'Mid Senior Physician |', value: 'Mid Senior Physician |' },
];

export const convertRoleObjectToOption = (role: any): any => {
  return {
    id: role.roleId,
    label: role.roleName,
  };
};

export const convertUserObjectsToOptions = (reportees: any): any => {
  let options: { id: any; label: any }[] = [];
  reportees.forEach((reportee: { userId: any; userName: any }) => {
    options.push({
      id: reportee.userId,
      label: reportee.userName,
    });
  });
  return options;
};

// export const createTimeDropdown = (startDate: any) => {
//   const timeDropdown = [];
//   const startTime = new Date(startDate);
//   startTime.setHours(0, 0, 0, 0);
//   const endTime = new Date(startDate);
//   endTime.setHours(0, 0, 0, 0);
//   endTime.setDate(endTime.getDate() + 1);

//   while (startTime.getDate() < endTime.getDate()) {
//     timeDropdown.push({
//       id: startTime.toISOString(),
//       label: get12HourTime(startTime),
//     });
//     startTime.setMinutes(startTime.getMinutes() + 15);
//   }
//   timeDropdown.push({
//     id: startTime.toISOString(),
//     label: "24:00",
//   });
//   return timeDropdown;
// };
