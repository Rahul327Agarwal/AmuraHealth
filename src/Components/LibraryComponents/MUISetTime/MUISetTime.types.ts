export interface IProps {
  headerTitle?: string;
  onTimeChange: (data: {
    hours: string;
    minutes: string;
    seconds: string;
    totalMinutes: number;
    totalSeconds: number;
  }) => void;
  inputLabel: string;
  suggestedOptions?: Array<{ label: string; value: string }>;
  isSuggestion?: boolean;
  helperText?: any;
  inputValue?: string;
  validMinutes?: boolean;
  allowSeconds?: boolean;
}
