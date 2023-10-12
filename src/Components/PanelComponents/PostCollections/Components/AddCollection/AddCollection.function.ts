import axios from 'axios';
import { PMS_S3 } from '../../../../../Utils';
import ErrorToaster from './../../../../../Common/ErrorToaster';
import {
  ICollectionsList,
  IEsPosts,
  IOptions,
  ISelectedCollection,
  ISelectedPosts,
  TMasterCriteria,
  TOptionObj,
} from './AddCollection.types';
import { IEditFilter } from '../FilterCollection/FilterCollection.types';
import { getCriteriaValue } from '../FilterCollection/FilterCollection.function';

export const getPostCollectionData = async (panelId: string, props: any) => {
  try {
    const response = await PMS_S3.getObject(
      `pms-ql-collections/${props?.collectionType}/${props?.tenantId}/${props?.collectionId}/myCollection.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );
    return response;
  } catch (error) {
    ErrorToaster((error as Error).message, panelId, 'error');
  }
};

export const getPostCollectionListData = async (panelId: string, sessions: any) => {
  try {
    const collectionType = 'PCM';
    const tenant = 'amura';
    const response = await PMS_S3.getObject(
      `pms-ql-collections/${collectionType}/${tenant}/collectionList.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: sessions.id_token,
      }
    );

    if (!response.Error) {
      response.collections.sort((a, b) => {
        const fa = a?.collectionName?.toLowerCase();
        const fb = b?.collectionName?.toLowerCase();
        if (fa < fb) return -1;
        if (fa > fb) return 1;
        return 0;
      });
      return response.collections;
    }
  } catch (error) {
    ErrorToaster(error.message, panelId, 'error');
  }
};

export const makeESCall = async (session: any, payload: any) => {
  try {
    const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${session.id_token}` },
    });
    return response?.data?.body || [];
  } catch (error) {
    return [];
  }
};

export const getAllPostsFromES = async (session: any): Promise<IEsPosts[]> => {
  const payload = {
    index: 'posts',
    size: 10000,
    sort: [{ createdOn: { order: 'desc' } }],
  };
  const response = await makeESCall(session, payload);
  const posts: IEsPosts[] = response.map((v) => ({ ...v?._source, postId: v._id }));
  posts.sort((a: any, b: any) => {
    const fa = a?.topics?.heading?.snippet?.toLowerCase();
    const fb = b?.topics?.heading?.snippet?.toLowerCase();
    if (fa < fb) return -1;
    if (fa > fb) return 1;
    return 0;
  });

  return posts;
};

export const createQueryFromCriteria = (criteria: TMasterCriteria | '', matchCriteria: string) => {
  switch (criteria) {
    case 'gender':
      return { match: { gender: matchCriteria } };
    case 'conditionsApplicable':
      return { match_phrase: { conditionsApplicable: matchCriteria } };
    case 'significance':
      return { term: { significance: matchCriteria } };
    // case 'keyword':
    //   return { match: { 'topics.heading.snippet': matchCriteria } };
    // case 'answerSet':
    //   return { match: { response: matchCriteria } };
    case 'sexualMaturity':
      return { match: { sexualMaturity: matchCriteria } };
    case 'system':
      return { match_phrase: { system: matchCriteria } };
    default:
      return { match_phrase: { [criteria]: matchCriteria } };
  }
};

function buildESQuery2(criterias: IEditFilter['criteria']) {
  if (criterias.length === 0) {
    return null;
  }

  const condition = criterias[0];
  const { criteria, matchCriteria, clause } = condition;
  const queryCondition = createQueryFromCriteria(criteria, matchCriteria.toString());

  if (criterias.length === 1) {
    return queryCondition; // Last condition, return it directly
  }

  const remainingConditions = criterias.slice(1); // Remove the processed condition
  const newQueryCondition = buildESQuery2(remainingConditions);

  const query: any = {};
  if (clause === 'and') {
    query.bool = { must: [queryCondition, newQueryCondition] };
  }
  if (clause === 'or') {
    query.bool = { should: [queryCondition, newQueryCondition] };
  }

  return query;
}

function buildESQuery(filters: IEditFilter) {
  const queryBool: any = {};

  filters?.criteria?.forEach((c, i) => {
    const { criteria, clause } = c;
    const criteriaValue = getCriteriaValue(c);
    const query = createQueryFromCriteria(criteria, criteriaValue.toString());
    if (clause === 'and') {
      if (!queryBool['must']) queryBool['must'] = [];
      if (i === 0 && filters.domainType) queryBool['must'].push({ match: { domain: filters.domainType } });
      queryBool['must'].push(query);
    }
    if (clause === 'or') {
      if (!queryBool['should']) queryBool['should'] = [];
      queryBool['should'].push(query);
    }
  });

  if (queryBool?.should?.length > 1) {
    queryBool['minimum_should_match'] = 1;
  }

  return { bool: queryBool };
}

export const getFilteredPostsFromES = async (session: any, filters: IEditFilter): Promise<IEsPosts[]> => {
  const query = buildESQuery(filters);
  console.log('!!query', query);

  const payload = {
    index: 'posts',
    size: 10000,
    sort: [{ createdOn: { order: 'desc' } }],
    query,
  };
  const response = await makeESCall(session, payload);
  const posts: IEsPosts[] = response.map((v) => ({ ...v?._source, postId: v._id }));
  posts.sort((a: any, b: any) => {
    const fa = a?.topics?.heading?.snippet?.toLowerCase();
    const fb = b?.topics?.heading?.snippet?.toLowerCase();
    if (fa < fb) return -1;
    if (fa > fb) return 1;
    return 0;
  });

  return posts;
};

export const getCriteriaFromMaster = async (sessions: any, key: string): Promise<IOptions[]> => {
  try {
    const payload = {
      payLoad: { partKey: 'lov_name', partKeyValue: `~${key}~masters~`, tableName: 'platform-lov-master' },
    };
    if (key === 'conditionsApplicable') {
      payload.payLoad.partKey = 'condition_name_stage_name_association';
      payload.payLoad.partKeyValue = '~condition~stage~master~';
      payload.payLoad.tableName = 'diagnostic-condition-association';
    }
    const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${sessions.id_token}` },
    });
    if (key === 'conditionsApplicable') {
      const options = [];
      const addedCondition = {};
      response?.data?.forEach((v) => {
        if (!addedCondition[v.association_id]) {
          options.push({ label: `${v.condition}${v.stage ? `, ${v.stage}` : ''}`, value: v.association_id });
        }
        addedCondition[v.association_id] = true;
      });

      return options;
    }
    return response?.data?.[0]?.criterias || [];
  } catch (error) {
    return [];
  }
};

export const getCriteriaOptionFromCriteria = async (sessions: any, criteria: IOptions[]): Promise<TOptionObj> => {
  const criteriaBaseOpt = {} as TOptionObj;
  try {
    const apis = criteria?.map(async (v) => await getCriteriaFromMaster(sessions, v.value));

    const response = await Promise.all(apis);

    criteria?.forEach((v, i) => {
      criteriaBaseOpt[v.value] = { option: response[i] || [], label: v.label };
    });

    return criteriaBaseOpt;
  } catch (error) {
    return criteriaBaseOpt;
  }
};

export const createPostPayload = (post: IEsPosts, elementOrder: number): ISelectedPosts => {
  return {
    elementOrder,
    elementToAdd: 'POST',
    hasResponse: post?.hasResponse,
    heading: post?.topics?.heading?.snippet,
    postId: post?.postId,
    postType: post?.postType,
    invisibleKeys: post?.invisibleKeys || [],
  };
};

export const createCollectionPayload = (collection: ICollectionsList, elementOrder: number): ISelectedCollection => {
  return {
    elementOrder,
    elementToAdd: 'SC',
    collectionName: collection?.collectionName,
    hasBranching: collection?.hasBranching,
    invisibleKeys: collection?.invisibleKeys || [],
    numberOfPosts: collection?.numberOfPosts,
    subCollectionId: collection?.collectionId,
    posts: [],
    subCollections: [],
    tenantId: collection?.tenantId,
    collectionType: collection?.collectionType,
  };
};

export const addPostOrCollection = async (
  sessions: any,
  elementsToAdd: any[],
  payload: { collectionId: string; collectionType: string }
) => {
  try {
    const params: any = {
      EventName: 'manage-collections',
      action: 'ADD',
      userId: sessions.user.id,
      tenantId: 'amura',
      elementsToAdd,
      ...payload,
    };
    const response = await PMS_S3.postData({
      ...params,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_EVENT_API,
      token: sessions.id_token,
      method: 'POST',
      headers: {},
    });

    if (!response.Error) {
      return true;
    }
  } catch (error) {}
};

export const getCollectionsDetails = async (sessions: any, collection: ISelectedCollection): Promise<ISelectedCollection> => {
  try {
    const response = await PMS_S3.getObject(
      `pms-ql-collections/${collection.collectionType}/${collection.tenantId}/${collection.subCollectionId}/myCollection.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: sessions.id_token,
      }
    );
    const posts = response?.posts?.length ? response.posts.map((post: any) => ({ ...post, invisibleKeys: [] })) : [];
    const subCollections = response?.subCollections?.length
      ? response.subCollections.map((data: any) => ({
          ...data,
          invisibleKeys: [],
          posts: data?.posts?.length ? data.posts.map((post: any) => ({ ...post, invisibleKeys: [] })) : [],
        }))
      : [];

    return {
      ...collection,
      posts,
      subCollections,
      numberOfPosts: response?.numberOfPosts,
      collectionName: response?.topics?.collectionName?.snippet,
    };
  } catch (error) {
    return collection;
  }
};

export const createCollectionsPayload = async (
  sessions: any,
  collection: ISelectedCollection[]
): Promise<ISelectedCollection[]> => {
  try {
    const apis = collection?.map(async (v) => await getCollectionsDetails(sessions, v));
    const response = await Promise.all(apis);

    return response || [];
  } catch (error) {
    return [];
  }
};
