export interface IProps {
  open: boolean;
  onClose: () => void;
  onSubmitModal: ({ reason, status }: ISubmitData) => void;
  headerTitle: string;
  existingStatus: string;
}
export interface ISubmitData {
  reason: string;
  status: string;
}
