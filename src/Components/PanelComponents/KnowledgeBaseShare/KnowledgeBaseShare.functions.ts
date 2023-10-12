import axios from 'axios';
import { splitArrayAtNth } from '../../../Common/Common.functions';
import ErrorToaster from '../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../Utils';

export const getKBData = async (panelId: string, searchString, id_token) => {
  const payload = {
    size: 10000,
    index: 'knowledgebase',
    hasQueryParams: true,
    token: id_token,
    url: `${import.meta.env.VITE_BASE_API_URL}/search`,
    query: {
      bool: {
        must: [
          {
            match_phrase_prefix: {
              'topics.heading.snippet': searchString,
            },
          },
        ],
        must_not: [
          {
            exists: {
              field: 'topics.response',
            },
          },
        ],
      },
    },
    keyValues: [
      {
        key: 'topics.heading.snippet',
        value: searchString,
      },
    ],
  };

  try {
    const response = await await PMS_S3.postData(payload);
    if (response.Error) return ErrorToaster(response.Error, panelId, 'error');
    const KBobject = response?.map(({ _source }) => ({ postId: _source.postId, ..._source?.topics }));
    return KBobject;
  } catch (error) {
    ErrorToaster(error.message, panelId, 'error');
  }
};

export const getPostDataForChat = async (postId) => {
  const payload = {
    index: 'knowledgebase',
    size: 10000,
    query: {
      bool: {
        must: [
          {
            match_phrase: {
              postId: postId,
            },
          },
        ],
      },
    },
  };

  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  try {
    const response = await axios.post(url, payload);
    return response?.data?.body[0]?._source?.topics || {};
  } catch (err) {
    ErrorToaster(err?.response?.data?.message || 'Something went wrong');
    return {};
  }
};

export const fetchAndFormatKbMessages = async (kbIds: string[]) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  let limitPerCall = 1024; // es query can at most match 1024 phrases at a time

  let kbFetchGroups = splitArrayAtNth(kbIds, limitPerCall);
  let shouldQuery = [];
  let payload = {};
  let messages = {};
  let promises = [];

  for (let i = 0; i < kbFetchGroups.length; i++) {
    shouldQuery = kbFetchGroups[i].map((kbId) => ({
      match_phrase: {
        postId: kbId,
      },
    }));

    payload = {
      index: 'knowledgebase',
      size: 10000,
      query: {
        bool: {
          should: shouldQuery,
        },
      },
    };
    promises.push(axios.post(url, payload));
  }

  try {
    let response: any = await Promise.allSettled(promises);
    if (response.length) {
      for (let i = 0; i < response.length; i++) {
        if (response[i].status !== 'fulfilled' || !response[i].value) {
          continue;
        }
        let res = response[i].value;
        res?.data?.body?.forEach((post) => {
          messages[post?._source?.postId] = {
            knowledgeBasePost: {
              knowledgeBasePostId: post?._source?.postId,
              knowledgeBasePostTopics: post?._source?.topics || {},
            },
          };
        });
      }
    }
  } catch (error) {
    console.log(error);
  }

  return messages;
};

export const SubmitKbPost = (panelId: string, props, tenant, postId, setDisable, setExpandedView) => {
  const payload = {
    userId: props.patientId,
    EventName: 'chat-categorizer',
    tenantId: tenant,
    senderId: props.sessions.user.id,
    ContextType: '@kb-posts',
    receivedTime: new Date().toISOString(),
    loginUserId: props.sessions.user.id,
    knowledgeBasePost: {
      knowledgeBasePostId: postId,
    },
  };
  PMS_S3.postData({
    ...payload,
    Locale: sessionStorage.getItem('locale'),
    url: `${import.meta.env.VITE_BASE_API_URL}/chatCategorizer`,
    token: props.sessions.id_token,
    method: 'POST',
    headers: {},
  })
    .then((response) => {
      setDisable(false);
      // setExpandedView(false);
    })
    .catch((err) => {
      ErrorToaster('Something went wrong', panelId, 'error');
    })
    .finally(() => {
      setDisable(false);
    });
};
