import { Eggetarian, Fruitarian, NonVegetarian, Pescatarian, Vegan, VegetarianSmall } from '../ProfileManagement.svg';
import { FoodAndHealthType } from '../ProfileManagement.types';
export const foodAndHealth: FoodAndHealthType = {
  FoodRestriction: '',
  Cuisine: [],
  Objective: '',
};

export const FOOD_RESTRICTIONS_OPTIONS = [
  { label: 'Vegan', value: 'Vegan', icon: <Vegan /> },
  { label: 'Vegetarian', value: 'Vegetarian', icon: <VegetarianSmall /> },
  { label: 'Omnivore', value: 'Omnivore', icon: <NonVegetarian /> },
  { label: 'Eggetarian', value: 'Eggetarian', icon: <Eggetarian /> },
  { label: 'Pescatarian', value: 'Pescatarian', icon: <Pescatarian /> },
  { label: 'Fruitarian', value: 'Fruitarian', icon: <Fruitarian /> },
];

export const CUISIN_OPTIONS = [
  { label: 'Caribbean', value: 'Caribbean' },
  { label: 'Vietnamese', value: 'Vietnamese' },
  { label: 'Indian', value: 'Indian' },
  { label: 'Mexican', value: 'Mexican' },
  { label: 'Thai', value: 'Thai' },
];
