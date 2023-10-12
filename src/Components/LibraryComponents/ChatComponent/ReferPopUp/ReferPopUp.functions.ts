import { matchIsValidTel } from 'mui-tel-input';
import { removeHtmlTagsFromSring } from '../../../../Common/Common.functions';
import { PMS_S3 } from '../../../../Utils';
import { IChangeParams, IDetails, IErrors, ISubmitParams } from './ReferPopUp.types';

export const INITIAL_DETAILS: IDetails = {
  mobile: '',
  whatsApp: false,
  firstName: '',
  healthObjective: '',
  lastName: '',
  email: '',
  additional: '',
};

export const INITIAL_ERROR_OBJECT: IErrors = {
  mobile: '',
  firstName: '',
  healthObjective: '',
  email: '',
};

const emailValidationRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getFormattedNumber = (num: string) => num.replace(/[^A-Z0-9+]/gi, '');

export const handleInputChange = ({ e, setDetails, setErrors, errors }: IChangeParams) => {
  setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  errors[e.target.name] && setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
};

export const handleSubmit = async ({ details, setErrors, sessions, selectedClient, onClose }: ISubmitParams) => {
  // TODO: prevent multiple submits
  const { mobile, firstName, healthObjective, email, additional, lastName } = details;
  const errors = { ...INITIAL_ERROR_OBJECT };

  //?  .......validations.............
  if (!mobile) {
    errors.mobile = 'Field cannot be empty';
  } else {
    const isValidNumber = matchIsValidTel(details.mobile);
    if (!isValidNumber) errors.mobile = 'Invalid number';
  }
  if (!firstName.trim()) {
    errors.firstName = 'Field cannot be empty';
  }
  if (!healthObjective.trim()) {
    errors.healthObjective = 'Field cannot be empty';
  }
  if (email) {
    const isValidEmail = emailValidationRegex.test(email);
    if (!isValidEmail) errors.email = 'Invalid email';
  }

  const isError = Object.values(errors).some((err) => !!err);
  if (isError) {
    return setErrors(errors);
  }

  const formattedMobileNumber = getFormattedNumber(mobile);
  // ? ...........api ................

  try {
    const payload = {
      ContextType: '@refer',
      tenantId: 'amura',
      FirstName: removeHtmlTagsFromSring(firstName.trim()),
      LastName: removeHtmlTagsFromSring(lastName.trim()),
      PhoneNumber: formattedMobileNumber,
      EmailId: removeHtmlTagsFromSring(email.trim()),
      HealthObjective: removeHtmlTagsFromSring(healthObjective.trim()),
      AnythingElse: removeHtmlTagsFromSring(additional.trim()),
      WhatsAppNumber: details.whatsApp ? formattedMobileNumber : '',
      UserName: sessions.user.id,
      patientId: selectedClient.client_id,
      url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
      token: sessions.id_token,
      method: 'POST',
      headers: {},
      EventName: 'chat-categorizer',
    };

    await PMS_S3.postData(payload);
    onClose();
  } catch (error) {
    console.log(error);
  }
  return true;
};
