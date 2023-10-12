export interface AddIngredientsProps {
  setAction: Function;
  ingredientInfo: any;
  setIngredientInfo: any;
  alreadyAddedIngredients: any;
  setAlreadyAddedIngredients: Function;
  payload: {
    name: string;
    quantity: string;
    unit: string;
    totalIngredientInfo: any;
    ingredientInfo: any;
  };
}

export interface addIngredientsState {
  name: string;
  quantity: string;
}
export interface searchInputState {
  name: string;
  quantity: string;
  unit: string;
  ingredientData: any;
}

export interface IIngredientInfo {
  lov_name: string;
  lov_name_id: string;
  calories: string;
  scientificName: string;
  ingredientId: string;
  ingredientName: string;
  usdaName?: string;
  indianName?: string;
  caloriesUSDA?: string;
  caloriesInd?: string;
  measurements?: Array<string>;
  macroNutrients: Array<IIngredient>;
  microNutrients: Array<IIngredient>;
}

export interface IIngredient {
  nutrientId: string;
  nutrientName: string;
  nutrientUnit: string;
  hasUS: boolean;
  hasIND: boolean;
  nutrientUSDA?: string;
  nutrientUSDAUnit?: string;
  nutrientInd?: string;
  nutrientIndUnit?: string;
  nutrientIndValue?: string;
  nutrientValue: string;
  nutrientUSDAValue?: string;
}
