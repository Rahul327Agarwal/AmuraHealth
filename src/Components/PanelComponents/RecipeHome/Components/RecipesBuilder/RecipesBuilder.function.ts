import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { getUserNameFromES, isValidNumber } from '../../../../../Common/Common.functions';
import { PMS_S3 } from '../../../../../Utils';
import { IUserNameObj } from '../../RecipeHome.types';

export const BUILDER_TABS = [
  { id: 'BASIC_DETAILS', title: 'Basic details', showError: false },
  { id: 'INGREDIENTS', title: 'Ingredients', showError: false },
  { id: 'PREPARATION', title: 'Preparation', showError: false },
];

export const SEARCH_HISTORY = ['Good Food', 'Nut Food', 'Weight Loss', 'Salty', 'Nutritious'];

export const initBasic = () => ({
  name: '',
  description: '',
  tags: [],
  foodRestriction: '',
  cuisine: '',
  noOfServing: '',
  cookingTime: '',
  easyToCook: '',
  contributorId: { value: '', label: '', subLabel: '' },
  recipeId: uuidv4(),
  // files:[],
});
export const initIngredients = {};
export const initPreparation = [];

export const ingredientsUnit = [
  { label: 'Millilitres', value: 'ml', abbreviation: 'ml', conversion: 1 },
  { label: 'Grams', value: 'grams', abbreviation: 'g', conversion: 1 },
  {
    label: 'Teaspoon',
    value: 'teaSpoon',
    abbreviation: 'tsp',
    conversion: 4.928921615,
  },
  {
    label: 'Tablespoon',
    value: 'tableSpoon',
    abbreviation: 'tbsp',
    conversion: 14.78676484,
  },
  { label: 'Pinch', value: 'pinch', conversion: 0 },
  { label: 'Dash', value: 'dash', conversion: 0.62 },
  { label: 'As needed', value: 'asPerTaste', conversion: 0 },
  // { label: "Number", value: "number" },
];

export const addRecipeAPI = async (props: any, payload: any) => {
  const url = `${import.meta.env.VITE_BASE_RECIPES_API}/addRecipe`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${props.sessions.id_token}` },
  });
  return response?.data;
};

export const deleteRecipeAPI = async (sessions: any, payload: any) => {
  const url = `${import.meta.env.VITE_BASE_RECIPES_API}/deleterecipe`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${sessions.id_token}` },
  });
  return response?.data;
};

export const updateRecipeAPI = async (sessions: any, payload: any) => {
  console.log('payload while updating', payload);

  const url = `${import.meta.env.VITE_BASE_RECIPES_API}/updateRecipe`;
  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${sessions.sessions.id_token}` },
  });
  return response?.data;
};

export const convertIngredientInfoToString = (ingredient: any) => {
  let result = JSON.parse(JSON.stringify(ingredient));
  if ('calories' in result) {
    result.calories = result.calories.toString();
  }
  if ('caloriesInd' in result) {
    result.caloriesInd = result.caloriesInd.toString();
  }
  if ('caloriesUSDA' in result) {
    result.caloriesUSDA = result.caloriesUSDA.toString();
  }
  if ('ingredientId' in result) {
    result.ingredientId = result.ingredientId.toString();
  }
  if ('macroNutrients' in result) {
    result.macroNutrients = result.macroNutrients.map((nutrient) => {
      if ('nutrientId' in nutrient) {
        nutrient.nutrientId = nutrient.nutrientId.toString();
      }

      if ('nutrientIndValue' in nutrient) {
        nutrient.nutrientIndValue = nutrient.nutrientIndValue.toString();
      }

      if ('nutrientUSDAValue' in nutrient) {
        nutrient.nutrientUSDAValue = nutrient.nutrientUSDAValue.toString();
      }
      if ('nutrientValue' in nutrient) {
        nutrient.nutrientValue = nutrient.nutrientValue.toString();
      }
      return nutrient;
    });
  }
  if ('microNutrients' in result) {
    result.microNutrients = result.microNutrients.map((nutrient) => {
      if ('nutrientId' in nutrient) {
        nutrient.nutrientId = nutrient.nutrientId.toString();
      }

      if ('nutrientIndValue' in nutrient) {
        nutrient.nutrientIndValue = nutrient.nutrientIndValue.toString();
      }

      if ('nutrientUSDAValue' in nutrient) {
        nutrient.nutrientUSDAValue = nutrient.nutrientUSDAValue.toString();
      }
      if ('nutrientValue' in nutrient) {
        nutrient.nutrientValue = nutrient.nutrientValue.toString();
      }
      return nutrient;
    });
  }
  return result;
};

export const checkNegligible = (unit: string): boolean => {
  if (unit === 'asPerTaste') return true;
  if (unit === 'pinch') return true;
  return false;
};

export const fractionalDigits = (unit: string): number => {
  if (unit == 'teaSpoon' || unit == 'tableSpoon') return 1;
  return 2;
};

export const getContributorName = async (
  contributorId: string,
  contributorNames: IUserNameObj,
  setContributorNames: React.Dispatch<React.SetStateAction<IUserNameObj>>,
  fetchUserName?: Function
) => {
  try {
    if (!contributorId) return '';
    const existingName = contributorNames && contributorNames[contributorId];
    if (existingName) return existingName;
    const userName = await fetchUserName(contributorId);
    if (userName) {
      setContributorNames && setContributorNames((pre) => ({ ...pre, [contributorId]: userName }));
      return userName;
    }
    return contributorId;
  } catch (error) {
    return contributorId;
  }
};

export const uploadFiles = async (file: File, recipeId, sessions) => {
  const token = sessions.id_token; //props.sessions.id_token;
  let url = `${import.meta.env.VITE_RECIPE_PIC_UPLOAD}`;
  /********Upload File Api Call*********/
  const headers = {
    Authorization: `Bearer ${token}`,
    'file-name': file.name,
    'user-id': sessions.user.id, //props.sessions.user.id,
    'patient-id': sessions.user.id,
    'recipe-id': recipeId, //`${recipeId}\step1`,
    'recipe-file': true,
    recipes: true,
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

export const getImage = async (imageURL: string, props: any) => {
  const filename = imageURL?.split('/')?.pop();
  let reqBody = {
    isDownloadRequired: false,
    url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=${imageURL}&bucket=${import.meta.env.VITE_IMAGES}`,
    token: props.sessions.id_token,
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

const dataUrlToFile = async (dataUrl: string, fileName: string): Promise<File> => {
  try {
    const ext = fileName?.split('.')?.pop();
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: `image/${ext}` });
  } catch (error) {
    console.error(error);
  }
};

export const ingredientsItem = [
  { id: 'maida', value: 'Maida' },
  { id: 'flour', value: 'Flour' },
  { id: 'beans', value: 'Beans' },
  { id: 'oats', value: 'Oats' },
  { id: 'rice', value: 'Rice' },
];
export const ingredientsUnitItem = ['grams', 'cup', 'kg'];
export const nutritionalData = [
  { head: 'cabs', weight: '200', kcal: 1000, percentage: '5' },
  { head: 'protein', weight: '20', kcal: 200, percentage: '9' },
  { head: 'fat', weight: '50', kcal: 300, percentage: '20' },
];
export const validateIngredientsFields = (recipes: any, initState: any) => {
  let ingredientsError = JSON.parse(JSON.stringify(initState));
  let isValid = true;

  if (!isValidNumber(recipes.quantity)) {
    ingredientsError.quantity = 'The number field is empty/invalid.';
    isValid = false;
  }
  return { ingredientsError, isValid };
};
