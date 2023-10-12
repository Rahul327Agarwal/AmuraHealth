export interface IProps {
  message: string;
  variant: Variant;
}

export type Variant = 'success' | 'error' | 'warning' | 'info';
