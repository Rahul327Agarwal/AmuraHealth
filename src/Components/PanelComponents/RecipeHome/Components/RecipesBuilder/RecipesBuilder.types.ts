import { ChildEventTriggerFn } from "../../../../../Utilities/WrapperFunctions";
import { IUserNameObj } from "../../RecipeHome.types";
import { IIngredientInfo } from "./Ingredients/Ingredients.types";

export interface IProps {
  setActionType?: Function;
  sessions: any;
  panel: any;
  childEventTrigger: ChildEventTriggerFn;
  selectedClient?: any;
  isEdit?: boolean;
  ClickedRecipesData?: any;
  contributorNames?: IUserNameObj;
  setContributorNames?: React.Dispatch<React.SetStateAction<IUserNameObj>>;
}

export interface actionType {
  screen?:
    | "BASIC_DETAILS"
    | "INGREDIENTS"
    | "PREPARATION"
    | "INPUT_TAGS"
    | "INPUT_INGREDIENTS"
    | "ADD_STEPS"
    | "SUCCES_SCREEN"
    | "ADD_INGREDIENTS"
    | "HOME";
  payload?: any;
}
export interface actions {
  id: string;
  payload?: any;
}
export interface SearchIngredientsProps {
  payload: any;
  setAction: Function;
  fields: any;
  setFields: any;
  sessions?: any;
  ingredientInfo: any;
  setIngredientInfo: any;
  panel: any;
  ingredientOptions: any;
  isLoading: boolean;
  setIsLoading: Function;
  setIngredientOptions: Function;
}

export interface RecentSearchesProps {
  searchHistories: Array<string>;
  customStyle?: string;
}

export interface IngredientsProps {
  fields: any;
  setFiels: Function;
  setAction: Function;
  setRecipesData: Function;
  recipeData: any;
  sessions?: any;
  ingredientInfo: any;
  setIngredientInfo: any;
}

export interface PreparationProps {
  fields: any;
  setFiels: Function;
  setAction: Function;
  setRecipesData: Function;
  recipeData: any;
  sessions?: any;
  ingredientInfo?: any;
  submitRecipe?: any;
  setShowConfirm?: Function;
  stepsScreen?: boolean;
  setStepsScreen?: Function;
  initialScreen: boolean;
  setInitialScreen: Function;
  isSubmitingRecipe: boolean;
}

export interface SearchResultProps {
  options: Array<string>;
  handleSelect: Function;
}

// OLD Props

export interface IPropsNutritionalTarget extends IProps {
  setRecipesData: Function;
  setDisplayScreen: Function;
  additionDetails: newIAdditional;
  setAdditionDetails: Function;
}

export interface IPropsAddIngredients extends IProps {
  setRecipesData: Function;
  setDisplayScreen: Function;
  ingredientsData: any;
  setIngredientsData: Function;
  setIngredientTitle: Function;
}

export interface IPropsSelectIngredients extends IProps {
  setDisplayScreen: Function;
  ingredientsData: any;
  setIngredientsData: Function;
  ingredientTitle: any;
}

export interface IPropsAddSteps extends IProps {
  setRecipesData: Function;
  setDisplayScreen: Function;
  steps: Array<any>;
  setSteps: Function;
}

export interface IPropsPreviewScreen extends IProps {
  setDisplayScreen?: Function;
  setRecipesData?: Function;
  recipesData?: any;
  showFooter?: boolean;
  setActionType?: Function;
  action?: any;
  handleViewAll?: Function;
}

export type Screens =
  | "FIRST_SCREEN"
  | "SET_NUTRITIONAL_SCREEN"
  | "ADD_INGREDIENTS_SCREEN"
  | "SELECT_INDREDIENTS_SCREEN"
  | "ADD_STEPS_SCREEN"
  | "PREVIEW_SCREEN"
  | "SUCCESS_SCREEN";
export interface newIRecipe {
  title: string;
  description: string;
  cuisine: string;
  preparationTime: string;
  preparationTimeUnit?: string;
  cookingTime: string;
  cookingTimeUnit?: string;
  totalTime: string;
  totalTimeUnit?: string;
  numberOfServings: string;
  preparationLink: string;
  foodType: string;
  dietType: string;
  cookware: Array<any>;
  files: Array<any>;
  contributorId: string;
}

export interface newIAdditional {
  calorieTarget: string;
  calorieTargetUnit: string;
  carbsTarget: string;
  carbsTargetUnit: string;
  proteinTarget: string;
  proteinTargetUnit: string;
  fatTarget: string;
  fatTargetUnit: string;
  goodFor: Array<any>;
  moreNutrients: Array<any>;
}
