import axios from 'axios';
import { fi } from 'date-fns/locale';
export const getRegistrationCardsData = async (patientId: string, setIsLoading: Function) => {
  try {
    const payload = {
      index: 'users',
      _source: ['registration'],
      query: {
        bool: {
          must: [
            {
              match: {
                _id: patientId,
              },
            },
          ],
        },
      },
      size: 10000,
    };
    const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
    const response = await axios.post(url, payload);
    let data = [];
    response?.data?.body.filter((each) => {
      if (each?._source?.registration && Object.keys(each?._source?.registration).length > 0) {
        data = each._source.registration;
      }
    });
    let sortedData = await sortingCardsData(data);
    return sortedData || [];
  } catch (error) {
    console.error(error, 'getRegistrationCardsData error in ES ');
    return [];
  } finally {
    setIsLoading(false);
  }
};
export const sortingCardsData = (data: any) => {
  let sortedData = data.sort((a, b): any => {
    return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
  });
  return sortedData;
};
