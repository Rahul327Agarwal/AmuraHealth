import axios from 'axios';
export const belongsToGCL2 = (data) => {
  return data.indexOf('amura_guidance_counselor_level2') > -1;
};

export const belongsToCEO = (data) => {
  return data.indexOf('Amura_CEO') > -1;
};

export const initiaState = {
  active: '',
  stage: 'stage1',
  totalUser: 0,
  edit: false,
};
export const getDashboardData = async (sessions, startDate, endDate) => {
  try {
    const url = `${import.meta.env.VITE_GET_GC_DATA}/${startDate}/${endDate}`;
    const response: any = await axios
      .get(url, {
        headers: { Authorization: `Bearer ${sessions.id_token}` },
      })
      .then((response) => {
        if (response?.data?.body) return response.data.body;
      })
      .catch((error) => {
        console.log('!!error while fetching data', error);
      });

    if (response) return response;
  } catch (error) {
    console.error('!!error', error);
  }
};

export const getDetailsOfStaff = async (sessions, startDate, endDate, status) => {
  try {
    const url = `${import.meta.env.VITE_GET_GC_DATA}/${startDate}/${endDate}?status=${status}`;
    const response: any = await axios
      .get(url, {
        headers: { Authorization: `Bearer ${sessions.id_token}` },
      })
      .then((response) => {
        if (response?.data?.body) return response.data.body;
      })
      .catch((error) => {
        console.log('!!error while fetching data', error);
      });

    if (response) return response;
  } catch (error) {
    console.error('!!error', error);
  }
};

export const getClientDetailsOfTheStaff = async (sessions, startDate, endDate, status, staffId) => {
  try {
    const url = `${import.meta.env.VITE_GET_GC_DATA}/${startDate}/${endDate}?status=${status}&staff=${staffId}`;
    const response: any = await axios
      .get(url, {
        headers: { Authorization: `Bearer ${sessions.id_token}` },
      })
      .then((response) => {
        if (response) return response.data.body.clientDetail;
      })
      .catch((error) => {
        console.log('!!error while fetching data', error);
      });
    if (response) return response;
  } catch (error) {
    console.error('!!error', error);
  }
};
