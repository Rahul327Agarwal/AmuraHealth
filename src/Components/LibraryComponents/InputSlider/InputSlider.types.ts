export interface IProps {
  variant?: 'slider' | 'rangeSlider';
  value: number | Array<number>;
  min?: number;
  max?: number;
  handleChange: Function;
}
