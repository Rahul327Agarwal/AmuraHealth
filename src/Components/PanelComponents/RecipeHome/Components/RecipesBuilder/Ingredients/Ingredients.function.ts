import axios from 'axios';
import { isValidNumber } from '../../../../../../Common/Common.functions';
import ErrorToaster from '../../../../../../Common/ErrorToaster';
import { getCalorieCount, getNutrientValue } from '../../RecipePanel/RecipePanel.function';
import { checkNegligible } from '../RecipesBuilder.function';
import { addIngredientsState, IIngredientInfo, searchInputState } from './Ingredients.types';

export const nutritionProperty = [
  {
    nutritionTitle: 'Carbs',
    progressBarColor: '#40916C',
    borderColor: '#F1F1F1',
    borderThickness: 4,
    thickness: 4,
    size: 50,
    value: 45,
    variant: 'static',
    nutritionValue: '32.4 g',
  },
  {
    nutritionTitle: 'Fibre',
    progressBarColor: '#52B788',
    borderColor: '#F1F1F1',
    borderThickness: 4,
    thickness: 4,
    size: 50,
    value: 5,
    variant: 'static',
    nutritionValue: '13.4 g',
  },
  {
    nutritionTitle: 'Fat',
    progressBarColor: '#F3BB2B',
    borderColor: '#F1F1F1',
    borderThickness: 4,
    thickness: 4,
    size: 50,
    value: 50,
    variant: 'static',
    nutritionValue: '32.4 g',
  },
  {
    nutritionTitle: 'Protein',
    progressBarColor: '#E991C1',
    borderColor: '#F1F1F1',
    borderThickness: 4,
    thickness: 4,
    size: 50,
    value: 79,
    variant: 'static',
    nutritionValue: '32.4 g',
  },
  {
    nutritionTitle: 'Vitamin D',
    progressBarColor: '#F1F1F1',
    borderColor: '#F1F1F1',
    borderThickness: 4,
    thickness: 4,
    size: 50,
    value: 0,
    variant: 'static',
    nutritionValue: '32.4 g',
  },
];

export const addIngredientsDeafult: any = {
  name: '',
  quantity: '',
  unit: '',
  ingredientInfo: {},
};

export const validateAddIngredients = (params: addIngredientsState) => {
  let errorMessages = JSON.parse(JSON.stringify(addIngredientsDeafult));
  let isValid = true;

  if (!params?.name) {
    errorMessages.name = 'Please enter a valid input.';
    isValid = false;
  }
  if (params?.quantity) {
    errorMessages.quantity = 'Please enter a valid input.';
    isValid = false;
  }

  return { errorMessages, isValid };
};

export const searchInputDefault: searchInputState = {
  name: '',
  quantity: '',
  unit: 'grams',
  ingredientData: {},
};

export const validatesearchInput = (params: searchInputState) => {
  let errorMessages = JSON.parse(JSON.stringify(searchInputDefault));
  let isValid = true;
  if (!params?.name) {
    errorMessages.name = 'The field is empty/invalid.';
    isValid = false;
  }
  if (params?.unit && checkNegligible(params.unit)) {
    return { errorMessages, isValid };
  }
  if (!isValidNumber(params?.quantity)) {
    errorMessages.quantity = 'The number field is empty/invalid.';
    isValid = false;
  }
  if (params?.quantity?.toString() && !isNaN(Number(params.quantity)) && Number(params.quantity) == 0) {
    errorMessages.quantity = 'The number field is empty/invalid.';
    isValid = false;
  }

  return { errorMessages, isValid };
};

export const nutritionalValues = [
  { id: '1', name: 'Calcium', quantity: 7.5, unit: 'mg', percentage: 27 },
  { id: '2', name: 'Sodium', quantity: 12, unit: 'mg', percentage: 30 },
  { id: '3', name: 'Iron', quantity: 127, unit: 'mg', percentage: 50 },
  { id: '4', name: 'Vitamin A', quantity: 3.5, unit: 'mg', percentage: 10 },
  { id: '5', name: 'Vitamin B6', quantity: 57, unit: 'mg', percentage: 40 },
];

export const chartValues = [
  ['Name', 'Amount given'],
  ['Carbs (32.4 g)', 25],
  ['Fat (34.8 g)', 25],
  ['Protein (13.4 g)', 50],
];

export const getIngredients = async (panelId: string, props: any) => {
  const payload: any = {
    payLoad: {
      partKey: 'lov_name',
      partKeyValue: '~ingredients~master~',
      tableName: 'platform-lov-master',
    } as any,
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    });
    return response;
  } catch (error) {
    console.error(error);

    ErrorToaster(error.message, panelId, 'error');
  }
};

export const searchIngredients = async (panelId: string, props: any) => {
  const payload: any = {
    index: 'ingredients_master',
    query: {
      bool: {
        filter: [
          {
            bool: {
              must: [
                {
                  bool: {
                    must: [
                      {
                        match_phrase_prefix: {
                          ingredientName: `${props.searchedString}`,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    size: 1000,
  };

  const url = `${import.meta.env.VITE_BASE_API_URL}/searchInES`;
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    });
    return response;
  } catch (error) {
    console.error(error);

    ErrorToaster(error.message, panelId, 'error');
  }
};

export const getGraphValues = (
  alreadyAddedIngredient: IIngredientInfo,
  currentIngredient: IIngredientInfo,
  quantity: number,
  inredientsData: Array<any>
) => {
  let absoluteValue = quantity;
  let resultTotal: any;
  let ingredientAlreadyAdded = inredientsData.find((ing) => ing.name === currentIngredient.ingredientName);
  if (ingredientAlreadyAdded) {
    absoluteValue = Number(quantity) - Number(ingredientAlreadyAdded.quantity);
  }
  if (Object.keys(alreadyAddedIngredient).length > 0) {
    resultTotal = calculateTwoIngredients(
      alreadyAddedIngredient,
      getIngredientsValuePerGrams(currentIngredient, absoluteValue),
      ingredientAlreadyAdded ? '-' : '+'
    );
  } else {
    resultTotal = getIngredientsValuePerGrams(currentIngredient, quantity);
  }
  console.log('Computing already Added Value', resultTotal, alreadyAddedIngredient);

  return resultTotal;
};

export const calculateTwoIngredients = (ingredientOne: IIngredientInfo, ingredientTwo: IIngredientInfo, operation: '+' | '-') => {
  let calories =
    operation === '+'
      ? String(Number(Number(getCalorieCount('', ingredientOne)) || 0) + Number(Number(getCalorieCount('', ingredientTwo)) || 0))
      : String(Number(Number(getCalorieCount('', ingredientOne)) || 0) - Number(Number(getCalorieCount('', ingredientTwo)) || 0));
  let caloriesUSDA =
    operation === '+'
      ? String(
          Number(Number(getCalorieCount('US Database', ingredientOne)) || 0) +
            Number(Number(getCalorieCount('US Database', ingredientTwo)) || 0)
        )
      : String(
          Number(Number(getCalorieCount('US Database', ingredientOne)) || 0) -
            Number(Number(getCalorieCount('US Database', ingredientTwo)) || 0) <
            0
            ? 0
            : Number(Number(getCalorieCount('US Database', ingredientOne)) || 0) -
                Number(Number(getCalorieCount('US Database', ingredientTwo)) || 0)
        );
  let caloriesInd =
    operation === '+'
      ? String(
          Number(Number(getCalorieCount('IND Database', ingredientOne)) || 0) +
            Number(Number(getCalorieCount('IND Database', ingredientTwo)) || 0)
        )
      : String(
          Number(Number(getCalorieCount('IND Database', ingredientOne)) || 0) -
            Number(Number(getCalorieCount('IND Database', ingredientTwo)) || 0) <
            0
            ? 0
            : Number(Number(getCalorieCount('IND Database', ingredientOne)) || 0) -
                Number(Number(getCalorieCount('IND Database', ingredientTwo)) || 0)
        );
  let mergedMacro = [...ingredientOne.macroNutrients, ...ingredientTwo.macroNutrients];
  let mergedMicro = [...ingredientOne.microNutrients, ...ingredientTwo.microNutrients];
  var macroNutrientsObj: any = {};
  var microNutrientsObj: any = {};
  mergedMacro.forEach(function (d) {
    if (macroNutrientsObj.hasOwnProperty(d.nutrientId)) {
      macroNutrientsObj[d.nutrientId] = {
        ...d,
        nutrientValue:
          operation === '+'
            ? String(Number(getNutrientValue('', macroNutrientsObj[d.nutrientId]) || 0) + Number(getNutrientValue('', d)) || 0)
            : String(Number(getNutrientValue('', macroNutrientsObj[d.nutrientId]) || 0) - Number(getNutrientValue('', d)) || 0),
        nutrientIndValue:
          operation === '+'
            ? String(
                Number(getNutrientValue('IND Database', macroNutrientsObj[d.nutrientId]) || 0) +
                  getNutrientValue('IND Database', d) || 0
              )
            : String(
                (Number(getNutrientValue('IND Database', macroNutrientsObj[d.nutrientId]) || 0) -
                  getNutrientValue('IND Database', d) || 0) < 0
                  ? 0
                  : Number(getNutrientValue('IND Database', macroNutrientsObj[d.nutrientId]) || 0) -
                      getNutrientValue('IND Database', d) || 0
              ),
        nutrientUSDAValue:
          operation === '+'
            ? String(
                Number(getNutrientValue('US Database', macroNutrientsObj[d.nutrientId]) || 0) +
                  getNutrientValue('US Database', d) || 0
              )
            : String(
                (Number(getNutrientValue('US Database', macroNutrientsObj[d.nutrientId]) || 0) -
                  getNutrientValue('US Database', d) || 0) < 0
                  ? 0
                  : Number(getNutrientValue('US Database', macroNutrientsObj[d.nutrientId]) || 0) -
                      getNutrientValue('US Database', d) || 0
              ),
      };
    } else {
      macroNutrientsObj[d.nutrientId] = {
        ...d,
        nutrientIndValue: String(getNutrientValue('IND Database', d) || 0),
        nutrientUSDAValue: String(getNutrientValue('US Database', d) || 0),
      };
    }
  });
  mergedMicro.forEach(function (d) {
    if (microNutrientsObj.hasOwnProperty(d.nutrientId)) {
      microNutrientsObj[d.nutrientId] = {
        ...d,
        nutrientValue:
          operation === '+'
            ? String(Number(getNutrientValue('', microNutrientsObj[d.nutrientId]) || 0) + getNutrientValue('', d) || 0)
            : String(Number(getNutrientValue('', microNutrientsObj[d.nutrientId]) || 0) - getNutrientValue('', d) || 0),
        nutrientIndValue:
          operation === '+'
            ? String(
                (getNutrientValue('IND Database', microNutrientsObj[d.nutrientId]) || 0) + getNutrientValue('IND Database', d) ||
                  0
              )
            : String(
                (Number(getNutrientValue('IND Database', microNutrientsObj[d.nutrientId]) || 0) -
                  getNutrientValue('IND Database', d) || 0) < 0
                  ? 0
                  : Number(getNutrientValue('IND Database', microNutrientsObj[d.nutrientId]) || 0) -
                      getNutrientValue('IND Database', d) || 0
              ),
        nutrientUSDAValue:
          operation === '+'
            ? String(
                Number(getNutrientValue('US Database', microNutrientsObj[d.nutrientId]) || 0) +
                  getNutrientValue('US Database', d) || 0
              )
            : String(
                (Number(getNutrientValue('US Database', microNutrientsObj[d.nutrientId]) || 0) -
                  getNutrientValue('US Database', d) || 0) < 0
                  ? 0
                  : Number(getNutrientValue('US Database', microNutrientsObj[d.nutrientId]) || 0) -
                      getNutrientValue('US Database', microNutrientsObj[d.nutrientId]) || 0
              ),
      };
    } else {
      microNutrientsObj[d.nutrientId] = {
        ...d,
        nutrientIndValue: String(getNutrientValue('IND Database', d) || 0),
        nutrientUSDAValue: String(getNutrientValue('US Database', d) || 0),
      };
    }
  });
  let macroNutrientsArray = Object.keys(macroNutrientsObj).map((key) => macroNutrientsObj[key]);
  let microNutrientsArray = Object.keys(microNutrientsObj).map((key) => microNutrientsObj[key]);
  macroNutrientsArray = macroNutrientsArray.sort((a, b) =>
    `${getNutrientValue('US Database', a)}`.localeCompare(`${getNutrientValue('US Database', b)}`)
  );
  microNutrientsArray = microNutrientsArray.sort((a, b) =>
    `${getNutrientValue('US Database', a)}`.localeCompare(`${getNutrientValue('US Database', b)}`)
  );
  return {
    lov_name: '',
    lov_name_id: '',
    microNutrients: microNutrientsArray,
    calories,
    caloriesUSDA,
    caloriesInd,
    macroNutrients: macroNutrientsArray,
  };
};

export const getIngredientsValuePerGrams = (currentIngredient: IIngredientInfo, quantity: number) => {
  let calories = String(Number(currentIngredient.calories || 0) * quantity * 0.01);
  let caloriesInd = String((Number(getCalorieCount('IND Database', currentIngredient)) || 0) * quantity * 0.01);
  let caloriesUSDA = String((Number(getCalorieCount('US Database', currentIngredient)) || 0) * quantity * 0.01);
  let macroNutrients = currentIngredient.macroNutrients.map((ingredient) => {
    return {
      ...ingredient,
      nutrientValue: String(Number(ingredient.nutrientValue) * quantity * 0.01),
      nutrientIndValue: String((getNutrientValue('IND Database', ingredient) || 0) * quantity * 0.01),
      nutrientUSDAValue: String((getNutrientValue('US Database', ingredient) || 0) * quantity * 0.01),
    };
  });
  let microNutrients = currentIngredient.microNutrients.map((ingredient) => {
    return {
      ...ingredient,
      nutrientValue: String(Number(ingredient.nutrientValue) * quantity * 0.01),
      nutrientIndValue: String((getNutrientValue('IND Database', ingredient) || 0) * quantity * 0.01),
      nutrientUSDAValue: String((getNutrientValue('US Database', ingredient) || 0) * quantity * 0.01),
    };
  });

  macroNutrients = macroNutrients.sort((a, b) =>
    `${getNutrientValue('US Database', a)}`.localeCompare(`${getNutrientValue('US Database', b)}`)
  );
  microNutrients = microNutrients.sort((a, b) =>
    `${getNutrientValue('US Database', a)}`.localeCompare(`${getNutrientValue('US Database', b)}`)
  );
  let response = {
    ...currentIngredient,
    calories,
    microNutrients,
    macroNutrients,
    caloriesUSDA,
    caloriesInd,
  };
  console.log('getIngredientsValueGrams,', quantity, currentIngredient, response);
  return response;
};
