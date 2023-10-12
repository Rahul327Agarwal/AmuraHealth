export function getSelectedItem(SensitivityId: any, biomarkers: any) {
  const item = biomarkers.find((opt: any) => {
    if (opt.SensitivityId === SensitivityId) return opt;
  });
  return item || { SensitivityId: '', ShortName: '', LongName: '' };
}
