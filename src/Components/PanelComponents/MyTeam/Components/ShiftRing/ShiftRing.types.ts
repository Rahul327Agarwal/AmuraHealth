import { Shift } from '../../MyTeam.types';

export interface ShiftRingProps {
  image: string;
  shifts: Array<Shift>;
  size: number;
  ringWidth: number;
  name: string;
  onClick?: () => void;
  id?: string;
}
