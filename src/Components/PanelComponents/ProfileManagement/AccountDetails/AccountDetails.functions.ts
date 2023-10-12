export const verifyEmail = (value: string): string => {
  if (!value) return 'This field is required';
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) return 'Please Enter Correct Email ';
  return '';
};

const isValidMobile = (mobile: string) => {
  var pattern = new RegExp(/^[0-9\b]{0,10}$/);
  return pattern.test(mobile);
};
// /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g

function validateMobile(mobilenumber: string) {
  var regmm = '^([0|+[0-9]{1,5})?([7-9][0-9]{9})$';
  var regmob = new RegExp(regmm);
  if (regmob.test(mobilenumber)) {
    return true;
  } else {
    return false;
  }
}
