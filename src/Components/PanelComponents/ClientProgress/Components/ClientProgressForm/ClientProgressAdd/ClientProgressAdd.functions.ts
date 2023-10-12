export function getSelectedStaff(selectedClient: any, clientList: any) {
  const item = clientList.find((opt: any) => {
    if (opt.UserName === selectedClient) return opt;
  });
  return item || { UserName: '', NickName: '' };
}
