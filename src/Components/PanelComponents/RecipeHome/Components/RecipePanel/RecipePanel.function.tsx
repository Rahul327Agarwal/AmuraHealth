import { FoodIcon, HeartIcon } from '../RecipesSelected.svg';
import { IIngredient, IIngredientInfo } from '../RecipesBuilder/Ingredients/Ingredients.types';

export const foodProperties = [
  { label: 'Weight loss', icon: <FoodIcon /> },
  { label: 'Good fat', icon: <FoodIcon /> },
  { label: 'Gluten free', icon: <FoodIcon /> },
  { label: 'Nut free', icon: <FoodIcon /> },
];

export const foodDetails = [
  { label: '12.3k', icon: <HeartIcon /> },
  { label: '1200 kcal', icon: <HeartIcon /> },
  { label: '30 min', icon: <HeartIcon /> },
  { label: 'Non veg', icon: <HeartIcon /> },
];

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

export const ingredientsData = [
  { label: 'Aubergine', quantity: '1 pc', icon: <FoodIcon /> },
  { label: 'Flour', quantity: '2 tbsp', icon: <FoodIcon /> },
];
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

export const getHAndMinString = (min: string | number) => {
  var num = Number(min);
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return `${rhours ? rhours : ''}${rhours ? 'h ' : ''}${rminutes ? rminutes : ''}${rminutes ? ' mins' : ''}`;
};

export const getIngredientName = (db: string, ingredient: IIngredientInfo) => {
  if (db === 'US Database') {
    return ingredient.usdaName ? ingredient.usdaName : ingredient.ingredientName;
  }
  if (db === 'IND Database') {
    return ingredient.indianName ? ingredient.indianName : ingredient.ingredientName;
  }
  return ingredient.ingredientName;
};

export const getNameValue = (db: string, nutrient: IIngredient) => {
  if (db === 'US Database') {
    return nutrient.nutrientUSDA || nutrient.nutrientName;
  }
  if (db === 'IND Database') {
    return nutrient.nutrientInd || nutrient.nutrientName;
  }
  return nutrient.nutrientName;
};

export const getUnitValue = (db: string, nutrient: IIngredient) => {
  if (db === 'US Database') {
    return nutrient.nutrientUSDAUnit || nutrient.nutrientUnit;
  }
  if (db === 'IND Database') {
    return nutrient.nutrientIndUnit || nutrient.nutrientUnit;
  }
  return nutrient.nutrientUnit;
};

export const getNutrientValue = (db: string, nutrient: IIngredient) => {
  if (db === 'US Database') {
    return Number(nutrient.nutrientUSDAValue) || Number(nutrient.nutrientValue);
  }
  if (db === 'IND Database') {
    return Number(nutrient.nutrientIndValue) || Number(nutrient.nutrientValue);
  }
  return Number(nutrient.nutrientValue);
};

export const getCalorieCount = (db: string, nutrient: IIngredientInfo) => {
  if (db === 'US Database') {
    return Number(nutrient.caloriesUSDA) || Number(nutrient.calories) || 0;
  }
  if (db === 'IND Database') {
    return Number(nutrient.caloriesInd) || Number(nutrient.calories);
  }
  return Number(nutrient.calories);
};
