export interface BasicDetailsProps {
  setShowConfirm?: Function;
  fields: any;
  setFiels: Function;
  setAction: Function;
  payload?: any;
  setActionType?: Function;
  recipeData?: any;
  setRecipesData: Function;
  sessions?: any;
  errorState?: any;
  cuisineOptions?: any;
  setErrorState: Function;
  errorRef?: any;
  isEdit?: boolean;
}
export interface basicDetailsState {
  name: string;
  description: string;
  tags: Array<string>;
  foodRestriction: string;
  cuisine: string;
  noOfServing: string;
  cookingTime: string;
  easyToCook: string;
  image: string;
  exist: string;
  contributorId: string;
}

export interface SearchTagsProps {
  setAction: Function;
}
