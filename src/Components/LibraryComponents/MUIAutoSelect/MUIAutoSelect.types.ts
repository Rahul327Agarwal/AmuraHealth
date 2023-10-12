import { AutocompleteProps, AutocompleteRenderOptionState } from '@mui/material';
import { IProps as InputFieldProps } from '../InputField/InputField.types';

export interface IProps extends Partial<AutocompleteProps<any, boolean, boolean, boolean>> {
  options: Array<optionsType>;
  InputProps?: InputFieldProps;
  OptionMenuProps?: IOptionMenuProps;
  noDeletableToken?: boolean;
  reRenderOptions?: boolean;
  error?: boolean;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: optionsType,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
}
export interface optionsType {
  label: string;
  value: string;
  subLabel?: string;
}

export interface IOptionMenuProps {
  reverseCheckbox?: boolean;
  inlineLabel?: boolean;
  variant?: 'checkbox' | 'label';
  customStyle?: string;
  endAdornmentNotFlex?: boolean;
}

export interface ICustomMenuProps extends IOptionMenuProps {
  label: string;
  subLabel?: string;
  selected?: boolean;
}
