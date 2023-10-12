export interface IProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  userId: string;
  updatedBy: string;
  updatedOn: Date | string;
}
