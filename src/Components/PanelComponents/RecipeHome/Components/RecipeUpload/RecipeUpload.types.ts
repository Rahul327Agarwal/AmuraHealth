export interface IProps {
  label?: string | React.ReactElement;
  variant?: "primary" | "secondary" | "tertiary" | "custome";
  disabled?: boolean | undefined | null;
  handleClick?: Function;
  title?: string;
  borderFill?: string;
  labelFill?: string;
  size?: "large" | "medium" | "small";
  withIcon?: boolean;
  icon?: React.ReactElement;
  maxFileSizeMb?: number;
  multiple?: boolean;
  acceptedFiles?: Array<string>;
  setImageupload?: Function;
  uploadFiles?: Function;
  recipeId?: String;
  sessions?: any;
  setRecipesData?: Function;
  setPreparationData?: Function;
  preparationData?: any;
  recipeData?: any;
  imageUrl?: any;
  noView?: boolean;
  preparationStepNo?: number;
}
