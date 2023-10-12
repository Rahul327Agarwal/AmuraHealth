import { atom, useAtom } from "jotai";

//
//
type RecipeFiles = {
  originalRecipeFilesURLs: string[];
  editedOrignalFileURLs: string[];
  recipeFiles: File[];
  sourceRecipeFiles?: File[];
  //   preparation
  originalPreparationFilesURLs: Record<string, string>;
  editedOrignalPreparationFileURLs: Record<string, string>;
  preparationFiles: Record<string, File>;
  sourcePreparationFiles?: Record<string, File>;
};

const recipeFilesState = atom<RecipeFiles>({
  originalRecipeFilesURLs: [],
  editedOrignalFileURLs: [],
  recipeFiles: [],
  sourceRecipeFiles: [],
  //
  originalPreparationFilesURLs: {},
  editedOrignalPreparationFileURLs: {},
  preparationFiles: {},
  sourcePreparationFiles: {},
});
export const useRecipeFiles = () => useAtom(recipeFilesState);
