import SuccessToaster from '../../../Common/SuccessToaster';
import { PMS_S3 } from '../../../Utils';
import ErrorToaster from './../../../Common/ErrorToaster';
import { RequestDescription } from './MoveCardDescription/MoveCardDescription.types';
import { ICheckedCard } from './MoveCardRequest/Components/RoleAndTenant/RoleAndTenant.types';

export const moveCardRequestAPI = async (payload: any, panelId: string) => {
  try {
    const response = await PMS_S3.postData(payload);
    if (response.Error) {
      ErrorToaster(response.Error, panelId, 'error');
      return false;
    }
    SuccessToaster('Your move card request is submitted' || response?.Message, panelId, 'success');
    return true;
  } catch (error) {
    ErrorToaster(error.message, panelId, 'error');
    return false;
  }
};

export const convertDateWithTime = (startDate: Date, sartTime: string) => {
  // Create a new Date object with the given date
  var date = new Date(startDate);

  // Convert the time to 24-hour format
  var time = sartTime;
  var hours = parseInt(time.substr(0, 2));
  var minutes = parseInt(time.substr(3, 2));
  if (time.indexOf('PM') !== -1 && hours !== 12) {
    hours += 12;
  } else if (time.indexOf('AM') !== -1 && hours === 12) {
    hours = 0;
  }

  // Set the time in the date object
  date.setHours(hours);
  date.setMinutes(minutes);

  // Output the updated date object
  return date;
};

export const FormatingObj = (tenatsWithRoles: ICheckedCard, description: RequestDescription) => {
  const tenantKeys = Object.keys(tenatsWithRoles);
  const modifiedObj = tenantKeys.map((each) => {
    return {
      tenantId: each,
      roleIds: tenatsWithRoles[each] || [],
      description: description[each]?.trim() || '',
    };
  });
  return modifiedObj || [];
};
