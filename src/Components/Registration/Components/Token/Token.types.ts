export interface IProps {
  variant: "primary" | "chip";
  value: number | string | Date;
  label: string;
  checked?: boolean | undefined | null;
  onSelect?: Function;
  onDeSelect?: Function;
  disabled?: boolean | undefined | null;
}
