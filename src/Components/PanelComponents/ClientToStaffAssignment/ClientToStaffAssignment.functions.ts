import axios from 'axios';
export const detailsview = {};
export const getUsersList = async (payload: any) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  const response = await axios.post(url, payload);
  return response?.data?.body || [];
};
export const getSearchUsers = async (searchText?: string) => {
  try {
    let modifiedString = searchText && searchText[0] === '+' ? searchText.replace('+', '') : searchText;
    const payload = {
      index: 'users',
      _source: ['user_id', 'profile.nick_name', 'profile.first_name', 'profile.last_name', 'mobile'],
      query: {
        bool: {
          should: [
            {
              wildcard: {
                mobile: {
                  value: `*${modifiedString}*`,
                },
              },
            },
            {
              match_phrase_prefix: {
                'profile.nick_name': `${searchText}`,
              },
            },
            {
              match_phrase_prefix: {
                'profile.first_name': `${searchText}`,
              },
            },
            {
              match_phrase_prefix: {
                'profile.last_name': `${searchText}`,
              },
            },
          ],
        },
      },
      size: 100,
    };
    const response: any = await getUsersList(payload);

    if (response) {
      const options = response.map(({ _source }) => {
        const { user_id, profile, mobile } = _source;
        const tenantId = 'amura';
        const userName = `${profile.first_name || ''} ${profile.last_name || ''}`;
        const mobileNumber = `${mobile}`
        return { value: user_id, label: userName, tenantId: tenantId, mobileNumber };
      });
      return options || [];
    }
    return [];
  } catch (error) {
    return [];
  }
};
