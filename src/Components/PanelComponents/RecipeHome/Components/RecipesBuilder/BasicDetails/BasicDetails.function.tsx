import { isValidNumber } from '../../../../../../Common/Common.functions';
import {
  Eggetarian,
  EggetarianSmall,
  Fruitarian,
  FruitarianSmall,
  NonVegetarian,
  NonVegetarianSmall,
  Pescatarian,
  PescatarianSmall,
  Vegan,
  VeganSmall,
  VegetarianSmall,
} from '../../RecipesSelected.svg';
import { basicDetailsState } from './BasicDetails.types';

export const FOOD_RESTRICTIONS_OPTIONS = [
  { label: 'Vegan', value: 'Vegan', icon: <Vegan /> },
  { label: 'Vegetarian', value: 'Vegetarian', icon: <VegetarianSmall /> },
  { label: 'Omnivore', value: 'Omnivore', icon: <NonVegetarian /> },
  { label: 'Eggetarian', value: 'Eggetarian', icon: <Eggetarian /> },
  { label: 'Pescatarian', value: 'Pescatarian', icon: <Pescatarian /> },
  { label: 'Fruitarian', value: 'Fruitarian', icon: <Fruitarian /> },
];
export const FOOD_RESTRICTIONS_OPTIONS_SMALL = [
  { label: 'Vegan', value: 'Vegan', icon: <VeganSmall /> },
  { label: 'Vegetarian', value: 'Vegetarian', icon: <VegetarianSmall /> },
  { label: 'Omnivore', value: 'Omnivore', icon: <NonVegetarianSmall /> },
  { label: 'Eggetarian', value: 'Eggetarian', icon: <EggetarianSmall /> },
  { label: 'Pescatarian', value: 'Pescatarian', icon: <PescatarianSmall /> },
  { label: 'Fruitarian', value: 'Fruitarian', icon: <FruitarianSmall /> },
];

export const getDietTypeIcon = (dietType: string): JSX.Element => {
  return (FOOD_RESTRICTIONS_OPTIONS.find((each) => each.value === dietType)?.icon || null) as any;
};
export const getDietTypeSmallIcons = (dietType: string): JSX.Element => {
  return FOOD_RESTRICTIONS_OPTIONS_SMALL.find((each) => each.value === dietType)?.icon || null;
};

export const VIEWING_DB = [
  { label: 'US Database', value: 'US Database' },
  { label: 'IND Database', value: 'IND Database' },
];

export const easyToCookOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const defaultBasicDetailsState: basicDetailsState = {
  name: '',
  description: '',
  tags: [],
  foodRestriction: '',
  cuisine: '',
  noOfServing: '',
  cookingTime: '',
  easyToCook: '',
  image: '',
  exist: '',
  contributorId: '',
};

export const validateBasicDetails = (params: basicDetailsState, recipeData: any) => {
  let errorMessages = JSON.parse(JSON.stringify(defaultBasicDetailsState));
  let isValid = true;

  if (!params?.name?.trim()) {
    errorMessages.name = 'Please enter a valid input.';
    isValid = false;
  }
  if (!params?.description) {
    errorMessages.description = 'Please enter a valid input.';
    isValid = false;
  }
  // if (!params?.tags?.length) {
  //   errorMessages.tags[0] = "The field is empty/invalid.";
  //   isValid = false;
  // }
  if (!params?.foodRestriction) {
    errorMessages.foodRestriction = 'Please enter a valid input.';
    isValid = false;
  }
  if (!params?.cuisine) {
    errorMessages.cuisine = 'Please enter a valid input.';
    isValid = false;
  }
  if (!isValidNumber(params?.noOfServing)) {
    errorMessages.noOfServing = 'Please enter a valid input.';
    isValid = false;
  }
  // if (!isValidNumber(params?.cookingTime)) {
  //   errorMessages.cookingTime = "The number field is empty/invalid.";
  //   isValid = false;
  // }
  if (!params?.easyToCook) {
    errorMessages.easyToCook = 'Please enter a valid input.';
    isValid = false;
  }

  if (!params?.contributorId) {
    errorMessages.contributorId = 'Please enter a valid input.';
    isValid = false;
  }

  // if (recipeData.files.length == 0) {
  //   errorMessages.image = 'Image should be uploaded';
  //   isValid = false;
  // }

  return { errorMessages, isValid };
};
