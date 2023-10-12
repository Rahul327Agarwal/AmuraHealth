import { MouseEventHandler } from 'react';
import { ChildEventTriggerFn } from '../../../Utilities/WrapperFunctions';

export interface IProps {
  selectedClient?: any;
  sessions: any;
  childEventTrigger: ChildEventTriggerFn;
  panel: any;
}

export interface IRecipeProps extends IProps {
  imageUrl: string;
  foodType: string;
  recipeName: string;
  calories: string;
  isDisplayInLine?: boolean;
  isButton?: boolean;
  handleButton?: MouseEventHandler<HTMLSpanElement>;
  buttonText?: string;
  onClick: any;
  dietType?: any;
  time?: any;
  cookingTime?: String;
  easyToCook?: boolean;
}

export interface ISelectedRecipeProps {
  actionType?: Actions;
  category?: string;
  setActionType?: Function;
  setNavigatedFrom?: Function;
  selectedClient?: any;
  sessions: any;
  childEventTrigger: ChildEventTriggerFn;
  panel: any;
  handleFilter?: Function;
  selectedRecipes?: any;
  setSelectedRecipes?: Function;
  handlePreviewRecipe?: any;
  navigatedFrom?: string;
  initialNavigatedFrom?: string;
}

export type Actions =
  | 'FAVOURITE'
  | 'VIEW_ALL'
  | 'NEWLY_ADDED'
  | 'COOK_UNDER_30'
  | 'RECIPE_BY_USER'
  | 'FILTER'
  | 'FILTER_OPTION'
  | 'HOME'
  | 'ADD_RECIPE'
  | 'PREVIEW_RECIPE'
  | 'PREPARE_STEPS';

export const HEADER = {
  VIEW_ALL: 'Recipes',
  NEWLY_ADDED: 'Newly added',
  COOK_UNDER_30: 'Cook under 30min',
  FILTER: 'Recipes',
  FILTER_OPTION: 'Filters',
};

export interface IUserNameObj {
  [data: string]: string;
}

export interface ISearchAndShowRecipeParams {
  setIsLoading: Function;
  initialNavigatedFrom: string;
  search: string;
  props: ISelectedRecipeProps;
  setTempSearchRecipes: Function;
  setIsSearchApplied: Function;
  handleclear?: Function;
}

export interface ITempFilter {
  sliderValue: number;
  diet: string[];

  // TODO: not sure about the filters type thus any temporarily
  filters: any[];
}
