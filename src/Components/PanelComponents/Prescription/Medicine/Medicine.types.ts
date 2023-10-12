import { z } from 'zod';

export interface IRampingUP {
  fraction: string;
  is_differential_ramping: boolean;
  is_ramp_up: boolean;
  length_in_days: string;
  ramp_id: string;
}

export interface IRampingDown {
  fraction: string;
  is_differential_ramping: boolean;
  is_ramp_down: boolean;
  length_in_days: string;
  ramp_id: string;
}

export const IPartOfDayENUM = z.enum(['M', 'A', 'E', 'N']);
export type IPartOfDay = z.infer<typeof IPartOfDayENUM>;

export interface IDose {
  part_of_the_day: IPartOfDay;
  dosage: number;
  start_date: string; //yyyy-mm-dd
  end_date: string; //yyyy-mm-dd
  start_day: number;
  end_day: number;
  is_ramping_protocol: boolean;
  ramping: (IRampingUP | IRampingDown)[];
}

export interface ISource {
  country: string;
  vendor_region: string;
  shopifyId: string;
  vendor: string;
  price: string;
  currency: string;
  isAmbro: boolean;
  url: string;
}
export interface IProduct {
  name: string;
  unit: string;
  type: string;
  instructions: string;
  productWithFood: string;
  startDate: string;
  endDate: string;
  startDay: number;
  endDay: number;
  quantityPerUnit: string;
  measurement: string;
  productDose: string;
  dose: IDose[];
  sources: ISource[];
  productPrice: string;
  currency: string | null;
  isAmbro: boolean;
  shopifyId: string | null;
  quantity: string;
  preStartDate: string;
  preEndDate: string;
  prescriptionStartDate: number;
  selectedTime: string;
  disabled: boolean;
  nthDay: number;
  prescriptionStarted: boolean;
}
