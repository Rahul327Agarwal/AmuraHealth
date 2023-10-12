export interface ThreeDotActionMenuProps {
  options: Array<ThreeDotActionMenuOption>;
  handleOnClick: Function;
  checkedKeys: Array<string>;
}

export type menuTypes = 'label' | 'checkbox' | 'radio';

export interface ThreeDotActionMenuOption {
  title: string;
  value: string;
  type: menuTypes;
  disable?: boolean;
  subMenu: Array<ThreeDotActionMenuOption>;
}
