import axios from 'axios';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { getUsersList } from '../../../Common/Common.functions';
import ErrorToaster from '../../../Common/ErrorToaster';
import SuccessToaster from '../../../Common/SuccessToaster';

export const registerNewUser = async (
  panelId: string,
  raWdata: any,
  seterrorObject: any,
  setRegisterUser: any,
  setBtnDisable: any,
  setProceedModal: any,
  props: any
) => {
  const formattedPhoneNumber = raWdata.PhoneNumber.replace(/[^A-Z0-9+]/gi, '');
  let data = {
    FirstName: raWdata.FirstName.trim(),
    EmailId: raWdata.EmailId,
    PhoneNumber: formattedPhoneNumber,
    LastName: raWdata.LastName.trim(),
    HealthObjective: raWdata.HealthObjective.trim(),
    staffId: raWdata.staffId,
    userName: props?.sessions?.user?.id,
    reAssign: raWdata.reAssign,
  };
  const errorObject = {
    FirstName: '',
    EmailId: '',
    PhoneNumber: '',
    LastName: '',
    staffId: '',
  };
  if (
    data.EmailId &&
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      data.EmailId
    )
  ) {
    errorObject.EmailId = 'Invalid email';
  }
  if (!isValidPhoneNumber(data.PhoneNumber)) {
    errorObject.PhoneNumber = 'Please enter valid mobile number.';
  }
  if (data.FirstName === '') {
    errorObject.FirstName = 'Please enter first name';
  }
  if (data.LastName === '') {
    errorObject.LastName = 'Please enter last name';
  }
  if (data.staffId === '') {
    errorObject.staffId = 'Please select the name';
  }
  console.log(data, 'register payload data');
  if (Object.values(errorObject).filter((eachError) => eachError !== '').length === 0) {
    seterrorObject(errorObject);
    const axiosObj: any = axios.create({
      baseURL: import.meta.env.VITE_REGISTER_AND_ASSIGN,
    });
    try {
      let response = await axiosObj['post']('', data);
      if (response?.status === 200) {
        setRegisterUser({
          FirstName: '',
          LastName: '',
          EmailId: '',
          PhoneNumber: '',
          HealthObjective: '',
          staffId: '',
          staffName: '',
          reAssign: 'false',
        });
        setProceedModal(false);
        setBtnDisable(true);
        SuccessToaster(response?.data?.message || 'User registered successfully', panelId, 'success');
      } else {
        ErrorToaster('Something went wrong. Please try again.');
      }
    } catch (ex) {
      if (ex?.response?.data?.message && typeof ex?.response?.data?.message === 'string') {
        let msg = 'An account with the given phone_number already exists.';
        if (msg == ex?.response?.data?.message) {
          setProceedModal(true);
        } else {
          ErrorToaster(ex?.response?.data?.message, panelId, 'error');
        }
      } else ErrorToaster(ex?.response?.data?.message || 'Something went wrong. Please try again.', panelId, 'error');
    }
  } else {
    seterrorObject(errorObject);
  }
};

// fetching staff details form Es //
export const getGcDetails = async (props: any) => {
  const payload = {
    size: 10000,
    index: 'staff_data',
    query: {
      bool: {
        must: [
          {
            match: {
              is_active: true,
            },
          },
          {
            match: {
              roleId: 'amura_guidance_counselor_level1',
            },
          },
          {
            match: {
              manualAssignment: true,
            },
          },
        ],
      },
    },
  };
  let response = await getUsersList(payload);

  let formatResponseObject = response.map((each) => ({
    staffId: each._source.staffId,
  }));
  return formatResponseObject || [];
};

export const getEsDataforUsers = async (panelId: string, userData: Array<any>) => {
  let modifiedObj = userData.map((each) => ({
    match: { _id: each?.staffId },
  }));

  let modifiedData = userData.map((each) => ({
    id: each?.staffId,
    label: each?.staffId,
  }));

  try {
    const payload = {
      index: 'users',
      _source: ['sort_key', 'profile.nick_name', 'profile.first_name', 'profile.last_name'],
      query: {
        bool: {
          must: {
            bool: {
              should: modifiedObj,
            },
          },
        },
      },
      size: 10000,
    };
    let response = await getUsersList(payload);
    let modifiedResponse = response.map((each) => {
      const { profile } = each._source || {};
      return {
        id: each._id,
        label: `${profile?.first_name || ''} ${profile?.last_name || ''}`,
        //label: `${each?._source?.profile?.first_name} ${each?._source?.profile?.last_name}` || each._id,
      };
    });
    return modifiedResponse;
  } catch (error) {
    ErrorToaster('Error in Es unable to get userdata', panelId, 'error');
    return modifiedData;
  }
};

export const belongsToGCL2 = (data) => {
  return data.indexOf('amura_guidance_counselor_level2') > -1;
};

export const belongsToGCL1 = (data) => {
  return data.indexOf('amura_guidance_counselor_level1') > -1;
};
