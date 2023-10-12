export function getSelectedItem(AllergenId: any, biomarkers: any) {
  const item = biomarkers.find((opt: any) => {
    if (opt.AllergenId === AllergenId) return opt;
  });
  return item || { AllergenId: '', ShortName: '', LongName: '' };
}
