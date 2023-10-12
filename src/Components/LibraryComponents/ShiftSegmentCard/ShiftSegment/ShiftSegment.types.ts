import { IShiftSegment } from '../RoleCard/RoleCard.types';

export interface IProps {
  shift: IShiftSegment;
  roleId: string;
  handleEdit?: (roleId: string) => void;

  isEditable: boolean;
  handleDelete?: (segmentId: string) => void;
  handleReset?: (segmentId: string) => void;
  handleChange?: (segmentId: string, key: string, value: string | Date | Array<number>) => void;
}
