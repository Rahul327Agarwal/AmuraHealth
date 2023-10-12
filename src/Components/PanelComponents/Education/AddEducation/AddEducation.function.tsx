import axios from 'axios';
import moment from 'moment';
import { v4 } from 'uuid';
import { getCountriesAPI, getQualificationAPI, getUnivercitiesAPI } from '../../../../Common/Common.functions';
import { ISession } from '../../../../Common/Common.types';
import ErrorToaster from '../../../../Common/ErrorToaster';
import SuccessToaster from '../../../../Common/SuccessToaster';
import { PMS_S3 } from '../../../../Utils';
import { Qualification } from './AddEducation.types';

export const AddEducationDetails = async (
  staffEducation,
  ArrayForFileLocation,
  action,
  sessions,
  staffId,
  educationId,
  createdBy,
  selectedClient,
  setAction,
  panelId: string
) => {
  try {
    const payload = {
      ...staffEducation,
      attachments: ArrayForFileLocation,
      tenantId: selectedClient.tenant_id,
      token: sessions.id_token,
      staffId: staffId,
      EventName: 'user-education',
      action: action,
      educationId: educationId,
      createdBy: createdBy,
      updatedBy: sessions?.user?.id,
      url: import.meta.env.VITE_EVENT_API,
    };

    const response: any = await PMS_S3.postData(payload)
      .then((response) => {
        if (action === 'ADD') SuccessToaster('Education details added successfully', panelId, 'success');
        else {
          SuccessToaster('Education details updated successfully', panelId, 'success');
        }
        setAction('Education');
        return response;
      })
      .catch((error) => {
        return ErrorToaster('Something went wrong', panelId, 'error');
      });

    if (response) return response;
  } catch (error) {
    console.error('!!error', error);
  }
};

export const callCountriesAPI = async (searchText?: string) => {
  try {
    const response = await getCountriesAPI(searchText);
    const options = response?.map(({ _source }: any) => ({
      label: _source.name,
      value: _source.isoCode,
    }));
    return options;
  } catch (error) {}
};

export const callQualificationAPI = async (searchText?: string) => {
  try {
    const response = await getQualificationAPI(searchText);
    return response;
  } catch (error) {}
};

export const callQualificationAPIForSearch = async (panelId: string, searchText: string, sessions: any) => {
  try {
    // const response = await getQualificationAPI(searchText);
    const response = await getQualificationData(panelId, searchText, sessions);

    const options = response?.map(({ _source }: any) => ({
      label: _source?.qualification,
      value: _source?.qualificationId,
    }));

    return options;
  } catch (error) {}
};

export const callUnivercityAPI = async (searchText?: string) => {
  try {
    const response = await getUnivercitiesAPI(searchText);
    return response;
  } catch (error) {}
};

export const callUnivercityAPIForSearch = async (panelId: string, searchText?: string, sessions?: any) => {
  try {
    // const response = await getUnivercitiesAPI(searchText);
    const response = await getUnivercitiesData(panelId, searchText, sessions);
    const options = response?.map(({ _source }: any) => ({
      label: _source?.university,
      value: _source?.universityId,
    }));
    return options;
  } catch (error) {}
};
export const getQualificationData = async (panelId: string, searchText, sessions) => {
  const payload = {
    size: 10000,
    index: 'qualifications_master',
    keyToCheck: 'qualification',
    value: searchText,
    method: 'POST',
    Locale: sessionStorage.getItem('locale'),
    url: `${import.meta.env.VITE_BASE_API_URL}/search`,
    token: sessions.id_token,
    headers: {},
  };
  try {
    const response = await PMS_S3.postData(payload);
    if (response.Error) return ErrorToaster(response.Error, panelId, 'error');
    return response;
  } catch (error) {
    ErrorToaster(error.message, panelId, 'error');
  }
};
export const getUnivercitiesData = async (panelId: string, searchText, sessions) => {
  const payload = {
    size: 10000,
    index: 'universities_master',
    keyToCheck: 'university',
    value: searchText,
    method: 'POST',
    Locale: sessionStorage.getItem('locale'),
    url: `${import.meta.env.VITE_BASE_API_URL}/search`,
    token: sessions.id_token,
    headers: {},
  };
  try {
    const response = await PMS_S3.postData(payload);
    if (response.Error) return ErrorToaster(response.Error, panelId, 'error');
    return response;
  } catch (error) {
    ErrorToaster(error.message, panelId, 'error');
  }
};
export const uploadAttachment = async (file: File, sessions, patientId: string, educationId: string) => {
  const token = sessions.id_token;
  let url = `${import.meta.env.VITE_FILE_UPLOAD}`;

  /********Upload File Api Call*********/
  const headers = {
    Authorization: `Bearer ${token}`,
    'file-name': file.name,
    'patient-id': patientId,
    'education-file': true,
    education: true,
    'education-id': educationId,
  };

  let formData = new FormData();
  formData.append('input_files', file);
  let response = await axios.post(url, formData, { headers: headers });
  if (response && response.data) {
    if (response.data.Status === 'Success') return Promise.resolve(response.data.FileLocation);
    return Promise.reject(response);
  }
  return Promise.reject('Unable to upload file');
};

export const removeProfileImage = async (panelId: string, sessions: ISession, DeteteFileLocation: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/deleteFile?key=${DeteteFileLocation}&bucket=amura-pms-qa`,
      {},
      {
        headers: { Authorization: `Bearer ${sessions.id_token}` },
      }
    );
    if (response.status === 200) {
      return true;
    }
    if (response.status === 500) {
      ErrorToaster('Something went wrong', panelId, 'error');
    }
    return false;
  } catch (error) {
    ErrorToaster('Something went wrong', panelId, 'error');
    return false;
  }
};

export const EducationData = {
  country: '',
  qualification: '',
  qualificationId: '',
  university: '',
  universityId: '',
  universityAddress: '',
  joiningDate: '',
  internshipDate: '',
  attachments: [],
  speciality: '',
};

export const file_formats = ['JPEG', 'JPG', 'PNG', 'GIF', 'BMP', 'PDF'];

export const ValidateData = (data) => {
  const errorData = JSON.parse(JSON.stringify(EducationData));
  errorData.error = false;
  if (!data.country) {
    errorData.country = 'Please Select the Country Name';
    errorData.error = true;
  }
  if (!data.qualification) {
    errorData.qualification = 'Please Select the Qualification';
    errorData.error = true;
  }
  if (!data.university) {
    errorData.university = 'Please Select the University ';
    errorData.error = true;
  }
  if (!data.joiningDate) {
    errorData.joiningDate = 'Please Enter the Joining Date';
    errorData.error = true;
  }
  if (!data.internshipDate) {
    errorData.internshipDate = 'Please Enter the InternshipDate Date';
    errorData.error = true;
  }

  // if (showSpecility && !data.speciality) {
  //   errorData.speciality = 'Please Select the Speciality';
  //   errorData.error = true;
  // }
  return errorData;
};

export const checkIfNoChange = (editCardData, educationState, UploadedFiles) => {
  let noChangeWhileEditing = true;

  // if (editCardData.internshipDate && educationState.internshipDate) {
  //   console.log(moment(editCardData.internshipDate).format('L') === moment(educationState.internshipDate).format('L'));
  //   noChangeWhileEditing = moment(editCardData.internshipDate).format('L') === moment(educationState.internshipDate).format('L');
  // }

  // if (editCardData.joiningDate && educationState.joiningDate) {
  //   noChangeWhileEditing = moment(editCardData.joiningDate).format('L') === moment(educationState.joiningDate).format('L');
  // }

  if (
    moment(editCardData.internshipDate).format('L') !== moment(educationState.internshipDate).format('L') ||
    moment(editCardData.joiningDate).format('L') !== moment(educationState.joiningDate).format('L')
  ) {
    noChangeWhileEditing = false;
  }
  if (
    editCardData.country !== educationState.country ||
    editCardData.qualification !== educationState.qualification ||
    editCardData.university !== educationState.university ||
    editCardData.speciality !== educationState.speciality
  ) {
    noChangeWhileEditing = false;
  }
  if (editCardData.files.length === UploadedFiles.length) {
    editCardData.files.forEach(({ name }, index) => {
      if (name !== UploadedFiles[index].name) {
        noChangeWhileEditing = false;
      }
    });
  }
  if (editCardData.files.length !== UploadedFiles.length) {
    noChangeWhileEditing = false;
  }

  return noChangeWhileEditing;
};
