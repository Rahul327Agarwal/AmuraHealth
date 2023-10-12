export interface IProps {
  name: string;
  unit: string;
  value: string;
  handleThreeDotAction: (data: 'DELETE' | 'EDIT') => void;
}
