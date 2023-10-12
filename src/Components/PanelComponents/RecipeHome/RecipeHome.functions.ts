import axios from 'axios';
import ErrorToaster from '../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../Utils';
import { ISearchAndShowRecipeParams } from './RecipeHome.types';

export const getAction = (actionType) => {
  const action = {
    isFavourite: false,
    isViewAll: false,
    isFilter: false,
    isFilterOption: false,
  };
  switch (actionType) {
    case 'FAVOURITE':
      return { ...action, isFavourite: true };
    case 'VIEW_ALL':
      return { ...action, isViewAll: true };
    case 'FILTER':
      return { ...action, isFilter: true };
    case 'FILTER_OPTION':
      return { ...action, isFilterOption: true };
    default:
      return action;
  }
};

export const changeCharsInFiles = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const getRecipesList = async (props: any, payload: any) => {
  const url = `${import.meta.env.VITE_BASE_RECIPES_API}/searchInES`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${props.sessions.id_token}` },
  });
  return response?.data?.body?.map((recipe) => recipe._source) || [];
};

export const getNewlyAddedRecipes = async (props: any, limit?: number, searchText?: string) => {
  const payload = {
    index: 'recipe',
    _source: [
      'title',
      'recipeId',
      'description',
      'files',
      'dietType',
      'easyToCook',
      'totalTime',
      'totalCookingTime',
      'dietType',
      'ingredientInfo.calories',
    ],
    sort: [{ createdOn: { order: 'desc' } }],
    ...{ size: limit ? limit : 50 },
    ...(searchText && {
      query: {
        query_string: {
          fields: ['title', 'description'],
          query: `*${searchText}*`,
        },
      },
    }),
    //   ...{
    //     query: {
    //         match_all: {}
    //     },size:10
    // }
  };
  return await getRecipesList(props, payload);
};

export const getMostViewedRecipes = async (props: any, limit?: number, searchText?: string) => {
  const payload = {
    index: 'recipe',
    _source: [
      'title',
      'recipeId',
      'description',
      'files',
      'dietType',
      'easyToCook',
      'totalTime',
      'totalCookingTime',
      'dietType',
      'ingredientInfo.calories',
    ],
    sort: [{ view_count: { order: 'desc' } }],
    ...{ size: limit ? 10 : limit },
    ...(searchText && {
      query: {
        query_string: {
          fields: ['title', 'description'],
          query: `*${searchText}*`,
        },
      },
    }),
  };
  return await getRecipesList(props, payload);
};

export const getRecipeByTitle = async (props: any, searchText?: string) => {
  const payload = {
    index: 'recipe',
    ...{ size: 10000 },
    _source: [
      'title',
      'recipeId',
      'description',
      'files',
      'dietType',
      'easyToCook',
      'totalTime',
      'totalCookingTime',
      'dietType',
      'ingredientInfo.calories',
    ],
    ...(searchText && {
      // query: { query_string: { fields: ['title'], query: `*${searchText}` } },
      query: { match_phrase_prefix: { title: `${searchText}` } },
    }),
  };
  return await getRecipesList(props, payload);
};
export const getRecipeCheckByTitle = async (props: any, searchText?: string) => {
  const payload = {
    index: 'recipe',
    _source: [
      'title',
      'recipeId',
      'description',
      'files',
      'dietType',
      'easyToCook',
      'totalTime',
      'totalCookingTime',
      'dietType',
      'ingredientInfo.calories',
    ],
    ...(searchText && {
      query: {
        constant_score: {
          filter: {
            term: {
              recipeName: `${searchText}`,
            },
          },
        },
      },
    }),
  };
  return await getRecipesList(props, payload);
};

export const getFavouriteRecipe = async (props: any) => {
  const payload = {
    index: 'recipe',
    query: { match_all: {} },
    size: 50,
  };
  return await getRecipesList(props, payload);
};

export const fetchRecipeById = async (panelId: string, props, recipeId: string) => {
  if (!recipeId) return;
  const payload = {
    index: 'recipe',
    query: {
      bool: {
        must: [
          {
            match_phrase: {
              _id: recipeId,
            },
          },
        ],
      },
    },
  };
  try {
    let recipeData = await getRecipesList(props, payload);
    if (recipeData.length < 0) ErrorToaster(`Couldn't find recipe`, panelId, 'error');
    return recipeData.length ? recipeData[0] : null;
  } catch (error) {
    console.log(error);
    ErrorToaster(`Couldn't find recipe`, panelId, 'error');
  }
};

export const getCookIn30Recipes = async (props: any, limit?: number, searchText?: string) => {
  const searchQuery = searchText ? [{ match_phrase_prefix: { title: `${searchText}` } }] : [];
  const payload = {
    index: 'recipe',
    sort: [{ createdOn: { order: 'desc' } }],
    _source: [
      'title',
      'recipeId',
      'description',
      'files',
      'dietType',
      'easyToCook',
      'totalTime',
      'totalCookingTime',
      'dietType',
      'ingredientInfo.calories',
    ],
    ...{ size: limit ? limit : 100000 },
    ...(searchText
      ? {
          query: {
            bool: {
              must: [
                { range: { totalCookingTime: { lte: 30 * 60 } } },
                // {
                //   query_string: {
                //     fields: ["title", "description"],
                //     query: `*${searchText}*`,
                //   },
                // },
                ...searchQuery,
              ],
            },
          },
        }
      : { query: { range: { totalCookingTime: { lte: 30 * 60 } } } }),
  };
  return await getRecipesList(props, payload);
};

export const getRecipesByUser = async (props: any, contributorId: any, searchText?: string) => {
  const payload = {
    index: 'recipe',
    query: {
      query_string: {
        query: contributorId,
        default_field: 'contributorId',
      },
    },
  };
  return await getRecipesList(props, payload);
};

export const getFilteredRecipes = async (props, query) => {
  const payload = {
    index: 'recipe',
    _source: [
      'title',
      'recipeId',
      'description',
      'files',
      'dietType',
      'easyToCook',
      'totalTime',
      'totalCookingTime',
      'dietType',
      'ingredientInfo.calories',
    ],
    ...query,
  };
  return await getRecipesList(props, payload);
};

export const removeFavoriteRecipes = async (panelId: string, props: any) => {
  let reqBody = {
    eventName: 'updateRecipe',
    userId: props?.selectedClient?.client_id,
    recipeId: props?.recipeId,
    action: 'remove',
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_FAVORITE_API,
    token: props.sessions.id_token,
    method: 'POST',
    headers: {},
  };
  const response = await PMS_S3.postData(reqBody);
  if (response?.Error) return ErrorToaster(response?.Error.data, panelId, 'error');
  return response;
};

export const getFavoriteRecipes = async (props: any) => {
  const payload = {
    index: 'recipe',
    _source: [
      'title',
      'recipeId',
      'description',
      'files',
      'dietType',
      'easyToCook',
      'totalTime',
      'totalCookingTime',
      'dietType',
      'ingredientInfo.calories',
    ],
  };
  return await getRecipesList(props, payload);
};
export const FOOD_RESTRICTIONS_OPTIONS = [
  { label: 'Vegan', value: 'Vegan' },
  { label: 'Vegetarian', value: 'Vegetarian' },
  { label: 'Omnivore', value: 'Omnivore' },
  { label: 'Eggetarian', value: 'Eggetarian' },
  { label: 'Pescatarian', value: 'Pescatarian' },
  { label: 'Fruitarian', value: 'Fruitarian' },
];

export const searchAndShowRecipe = async (
  panelId: string,
  {
    setIsLoading,
    initialNavigatedFrom,
    search,
    props,
    setTempSearchRecipes,
    setIsSearchApplied,
    handleclear,
  }: ISearchAndShowRecipeParams
) => {
  try {
    let searchResponse = [];
    if (search.length > 2) {
      setIsLoading(true);
      switch (initialNavigatedFrom) {
        case 'COOK_UNDER_30':
          searchResponse = await getCookIn30Recipes(props, 10000, search);
          break;
        case 'NEWLY_ADDED':
        case 'VIEW_ALL':
        case 'PREVIEW':
          searchResponse = await getRecipeByTitle(props, search);
          break;
        default:
          searchResponse = [];
          break;
      }
      setTempSearchRecipes(searchResponse);
      setIsSearchApplied(true);
    } else {
      handleclear && (await handleclear(true));
      setIsSearchApplied(false);
    }
  } catch (error) {
    ErrorToaster('Something went wrong!', panelId, 'error');
  } finally {
    setIsLoading(false);
  }
};
