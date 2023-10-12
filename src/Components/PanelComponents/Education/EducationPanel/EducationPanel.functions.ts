import { elasticAPI as commonAPI } from '../../../../Common/Common.functions';
import { PMS_S3 } from '../../../../Utils';

export const getEducationDetails = async (staffId) => {
  try {
    const payload = {
      size: 10000,
      index: 'users',
      _source: 'education',
      query: {
        bool: {
          must: [
            {
              match: {
                _id: staffId,
              },
            },
          ],
        },
      },
    };

    let response: any[] = await commonAPI(payload);

    let data = [];
    response?.filter((each) => {
      if (each?._source.education && Object.keys(each?._source.education).length > 0) {
        data = each._source.education;
      }
    });
    return data || [];
  } catch (error) {
    console.error('++error', error);
    return [];
  }
};

export const getUniversityName = async (universityId) => {
  try {
    const payload = {
      index: 'universities_master',
      query: {
        match: {
          _id: universityId,
        },
      },
    };

    let response: any[] = await commonAPI(payload);

    return Promise.resolve(response[0]?._source?.university);
  } catch (error) {
    console.error('++error', error);
    return '';
  }
};

const dataUrlToFile = async (dataUrl: string, fileName: string): Promise<File> => {
  try {
    const ext = fileName?.split('.')?.pop();
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    if (ext === 'pdf') return new File([blob], fileName, { type: `application/${ext}` });
    return new File([blob], fileName, { type: `image/${ext}` });
  } catch (error) {
    console.error(error);
  }
};
export const convertURLToFile = async (imageURL: string, sessions: any) => {
  const filename = imageURL?.split('/')?.pop();
  let reqBody = {
    isDownloadRequired: false,
    url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=${imageURL}`,
    token: sessions.id_token,
    dontPreview: true,
  };
  try {
    const response: any = await PMS_S3.previewObject(reqBody);

    if (typeof response === 'string') {
      return dataUrlToFile(response, filename);
    }
  } catch (error) {
    console.error(error);
  }
};
