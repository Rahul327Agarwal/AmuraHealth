import axios from 'axios';
import { ISelectedClient, ISession } from '../../../../Common/Common.types';
import { ESQueryResponse, EducationalBody, ProfessionalBody } from './AddRegistration.types';
import { PMS_S3 } from '../../../../Utils';
import { ICardData } from '../RegistrationCard/RegistrationCard.types';
import { removeProfileImage } from '../../Education/AddEducation/AddEducation.function';
import { getCountriesAPI } from '../../../../Common/Common.functions';

export namespace RegistrationSnippet {
  //
  export async function getProfessinalBodies(session: ISession) {
    const payload = {
      index: 'professional_bodies_master',
      size: 1000,
      query: {
        match_all: {},
      },
    };

    const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${session.id_token}` },
    });
    return response?.data?.body as ESQueryResponse<ProfessionalBody>[];
  }

  export async function getEducationalDetails(session: ISession) {
    const payload = {
      index: 'qualifications_master',
      size: 1000,
      query: {
        match_all: {},
      },
    };

    const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${session.id_token}` },
    });
    return response?.data?.body as ESQueryResponse<EducationalBody>[];
  }

  export async function postAddRegistration(
    patientId: string,
    session: ISession,
    selectedClient: ISelectedClient,
    payload: {
      professionalBody: ProfessionalBody;
      educationalBody: Array<{ label: string; value: string }>;
      registrationNumber: string;
      fromDate: string;
      toDate: string;
      registrationId: string;
      uploadedFiles: File[];
      country: string;
    }
  ) {
    // S3 location for the new files.
    let ArrayForFileLocation = [];
    ArrayForFileLocation = await Promise.all(
      payload.uploadedFiles.map((file) => {
        let FileLocation = uploadAttachment(file, session, patientId, payload.registrationId);
        return FileLocation;
      })
    );

    const body = {
      staffId: patientId,
      tenantId: selectedClient.tenant_id,
      professionalBody: payload.professionalBody.professionalBody,
      professionalBodyId: payload.professionalBody.professionalBodyId,
      regNumber: payload.registrationNumber,
      validFrom: payload.fromDate,
      validThru: payload.toDate,
      qualificationInfo: payload.educationalBody.map((item) => ({
        label: item.label,
        value: item.value,
      })),
      country: payload.country,
      attachments: ArrayForFileLocation,
      EventName: 'user-edu-registration',
      action: 'ADD',
      createdBy: session.user.id,
      updatedBy: session.user.id,
      registrationId: payload.registrationId,
    };
    console.log('!!! payload body for adding', body);
    const res = await PMS_S3.postData({
      ...body,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: session.id_token,
      method: 'POST',
      headers: {},
    });
    return res;
  }

  export async function postEditdRegistration(
    panelId: string,
    patientId: string,
    session: ISession,
    selectedClient: ISelectedClient,
    oldRegistrationData: ICardData | undefined,
    payload: {
      professionalBody: ProfessionalBody;
      educationalBody: Array<{ label: string; value: string }>;
      registrationNumber: string;
      fromDate: string;
      toDate: string;
      registrationId: string;
      uploadedFiles: File[];
      country: string;
    }
  ) {
    // delete files that are now removed while editing/updation.
    let oldImageUrl = oldRegistrationData?.attachments;

    //delete old files.
    oldImageUrl.forEach((url) => {
      removeProfileImage(panelId, session, url);
    });

    // S3 location for the new files.
    let ArrayForFileLocation = [];
    ArrayForFileLocation = await Promise.all(
      payload.uploadedFiles.map((file) => {
        let FileLocation = uploadAttachment(file, session, patientId, payload.registrationId);
        return FileLocation;
      })
    );
    const body = {
      staffId: patientId,
      tenantId: selectedClient.tenant_id,
      professionalBody: payload.professionalBody.professionalBody,
      professionalBodyId: payload.professionalBody.professionalBodyId,
      regNumber: payload.registrationNumber,
      validFrom: payload.fromDate,
      validThru: payload.toDate,
      qualificationInfo: payload.educationalBody.map((item) => ({
        label: item.label,
        value: item.value,
      })),
      country: payload.country,
      attachments: ArrayForFileLocation,
      EventName: 'user-edu-registration',
      action: 'UPDATE',
      createdBy: oldRegistrationData.createdBy,
      updatedBy: session.user.id,
      createdOn: oldRegistrationData.createdOn,
      updatedOn: new Date().toISOString(),
      registrationId: payload.registrationId,
    };
    console.log('!!! payload body for editing', body);

    const res = await PMS_S3.postData({
      ...body,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: session.id_token,
      method: 'POST',
      headers: {},
    });
    return res;
  }
}

export const uploadAttachment = async (file: File, sessions, patientId: string, registrationId: string) => {
  const token = sessions.id_token;
  let url = `${import.meta.env.VITE_FILE_UPLOAD}`;

  /********Upload File Api Call*********/
  const headers = {
    Authorization: `Bearer ${token}`,
    'file-name': file.name,
    'patient-id': patientId,
    'registration-file': true,
    registration: true,
    'registration-id': registrationId,
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

export async function getProfessinalBodiesWithSearch(session: ISession, searchText: string) {
  const payload = {
    index: 'professional_bodies_master',
    size: 1000,
    query: {
      prefix: {
        professionalBody: {
          value: searchText ? `${searchText}` : '',
        },
      },
    },
  };

  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${session.id_token}` },
  });
  const filteredOptions = response?.data?.body.map(({ _source }) => ({ ..._source, label: _source.professionalBody }));
  return filteredOptions;
}
