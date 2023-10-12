import axios from 'axios';
import { ISession } from '../../../../Common/Common.types';
import { INameCard } from '../MyList/MyList.types';
import { ITaskDB, IUITaskDB } from '../../../LibraryComponents/ChatComponent/BlueDotPopUp/BlueDotPopUp.types';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { sortingTasks } from '../../../LibraryComponents/ChatComponent/BlueDotPopUp/BlueDotClosePopUp/BlueDotClosePopUp.functions';

export const getBlueDotsOfAUserInDetails = async (
  panelId: string,
  sessions: ISession,
  selectedClientObject: INameCard,
  blueDotClickFromReportes: string
): Promise<Array<ITaskDB>> => {
  try {
    let results = await axios.post(
      `${import.meta.env.VITE_BASE_API_URL}/searchInES`,
      {
        index: 'pms_bluedot',
        query: {
          bool: {
            must: [
              {
                match_phrase: {
                  sortKey: `${selectedClientObject.roleId ? selectedClientObject.roleId : ''}${
                    selectedClientObject.staffId ? '~' : ''
                  }${selectedClientObject.staffId}`,
                },
              },
              {
                match_phrase: {
                  partKey: `${selectedClientObject.tenantId ? selectedClientObject.tenantId : ''}${
                    selectedClientObject?.additionalKeys?.patientId ? '~' : ''
                  }${selectedClientObject?.additionalKeys?.patientId}`,
                },
              },
              {
                match: {
                  ownerId: blueDotClickFromReportes ? blueDotClickFromReportes : sessions.user.id,
                },
              },
            ],
          },
        },
        size: 10000,
      },
      {
        headers: {
          Authorization: `Bearer ${sessions?.id_token}`,
        },
      }
    );
    let tasks: { _source: ITaskDB }[] = results.data.body || [];
    if (tasks && tasks.length > 0) {
      let responseTask = tasks.map((result) => result._source);
      let sortedData = sortingTasks(responseTask as IUITaskDB[]);
      return sortedData;
    }
  } catch (e) {
    console.error('Unable to get BlueDots of a user:: ', JSON.stringify(e));
    ErrorToaster('Something went wrong! While fetching tasks', panelId, 'error');
  }
  return [];
};
